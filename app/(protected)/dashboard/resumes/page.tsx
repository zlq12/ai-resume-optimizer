import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { getResumeOptimizationAllowance } from "@/lib/resume";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { ResumeWorkspace } from "@/components/resumes/resume-workspace";

export const metadata = constructMetadata({
  title: "My Resumes",
  description: "Create, edit, and optimize resumes with AI.",
});

export default async function ResumesPage() {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) return null;

  const [resumes, allowance] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        targetRole: true,
        content: true,
        optimizedContent: true,
        updatedAt: true,
      },
    }),
    getResumeOptimizationAllowance(userId),
  ]);

  return (
    <>
      <DashboardHeader
        heading="My Resumes"
        text="Write, tailor, and optimize every version for the job you want."
      />
      <ResumeWorkspace resumes={resumes} allowance={allowance} />
    </>
  );
}
