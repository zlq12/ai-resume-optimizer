"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import {
  releaseResumeOptimization,
  reserveResumeOptimization,
} from "@/lib/resume";

type ResumeInput = {
  title: string;
  targetRole?: string;
  content: string;
};

export type ResumeActionResult = { success: true } | { success: false; error: string };

async function currentUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function validateInput(input: ResumeInput) {
  const title = input.title.trim();
  const content = input.content.trim();
  if (!title || !content) throw new Error("A title and resume content are required.");
  if (title.length > 120) throw new Error("Resume titles must be 120 characters or fewer.");
  if (content.length > 30_000) throw new Error("Resume content must be 30,000 characters or fewer.");
  return { title, content, targetRole: input.targetRole?.trim() || null };
}

export async function createResume(input: ResumeInput): Promise<ResumeActionResult> {
  try {
    const [userId, data] = await Promise.all([currentUserId(), Promise.resolve(validateInput(input))]);
    await prisma.resume.create({ data: { ...data, userId } });
    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to create resume." };
  }
}

export async function updateResume(id: string, input: ResumeInput): Promise<ResumeActionResult> {
  try {
    const [userId, data] = await Promise.all([currentUserId(), Promise.resolve(validateInput(input))]);
    const updated = await prisma.resume.updateMany({ where: { id, userId }, data });
    if (!updated.count) throw new Error("Resume not found.");
    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to update resume." };
  }
}

export async function deleteResume(id: string): Promise<ResumeActionResult> {
  try {
    const userId = await currentUserId();
    const deleted = await prisma.resume.deleteMany({ where: { id, userId } });
    if (!deleted.count) throw new Error("Resume not found.");
    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to delete resume." };
  }
}

async function optimizeWithOpenAI(content: string, targetRole: string | null) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("Set OPENAI_API_KEY in .env.local before using AI optimization.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL ?? "gpt-4.1-mini",
      instructions:
        "You are an expert resume editor. Improve clarity, impact, ATS keyword relevance, and grammar without inventing achievements, employers, dates, skills, or numbers. Preserve the resume's language and structure. Return only the complete optimized resume in plain text.",
      input: `Target role: ${targetRole || "Not specified"}\n\nResume:\n${content}`,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("The AI service could not optimize this resume. Please try again.");
  }

  const data = (await response.json()) as {
    output_text?: string;
    output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  };
  const output =
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .filter((item) => item.type === "output_text")
      .map((item) => item.text || "")
      .join("\n");

  if (!output?.trim()) throw new Error("The AI service returned an empty optimization.");
  return output.trim();
}

export async function optimizeResume(id: string): Promise<ResumeActionResult> {
  let userId: string | undefined;
  let reserved = false;

  try {
    userId = await currentUserId();
    const resume = await prisma.resume.findFirst({ where: { id, userId } });
    if (!resume) throw new Error("Resume not found.");

    const allowance = await reserveResumeOptimization(userId);
    reserved = !allowance.unlimited;
    const output = await optimizeWithOpenAI(resume.content, resume.targetRole);

    await prisma.$transaction([
      prisma.resume.update({ where: { id }, data: { optimizedContent: output } }),
      prisma.resumeOptimization.create({
        data: {
          userId,
          resumeId: id,
          input: resume.content,
          output,
          model: env.OPENAI_MODEL ?? "gpt-4.1-mini",
        },
      }),
    ]);

    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    if (reserved && userId) await releaseResumeOptimization(userId);
    return { success: false, error: error instanceof Error ? error.message : "Unable to optimize resume." };
  }
}
