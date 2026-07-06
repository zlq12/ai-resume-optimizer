"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Save, Sparkles, Trash2 } from "lucide-react";

import {
  createResume,
  deleteResume,
  optimizeResume,
  updateResume,
} from "@/actions/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Resume = {
  id: string;
  title: string;
  targetRole: string | null;
  content: string;
  optimizedContent: string | null;
  updatedAt: Date;
};

type ResumeWorkspaceProps = {
  resumes: Resume[];
  allowance: { unlimited: boolean; remaining: number | null; limit: number };
};

const emptyResume = { title: "", targetRole: "", content: "" };

export function ResumeWorkspace({ resumes, allowance }: ResumeWorkspaceProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(resumes[0]?.id ?? null);
  const [form, setForm] = useState(emptyResume);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const selected = useMemo(
    () => resumes.find((resume) => resume.id === selectedId) ?? null,
    [resumes, selectedId],
  );

  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title,
        targetRole: selected.targetRole ?? "",
        content: selected.content,
      });
      return;
    }
    setForm(emptyResume);
  }, [selected]);

  useEffect(() => {
    if (selectedId && !resumes.some((resume) => resume.id === selectedId)) {
      setSelectedId(resumes[0]?.id ?? null);
    }
  }, [resumes, selectedId]);

  function run(action: () => Promise<{ success: boolean; error?: string }>, success: string) {
    setMessage("");
    startTransition(async () => {
      const result = await action();
      setMessage(result.success ? success : result.error || "Something went wrong.");
      if (result.success) router.refresh();
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(
      () => (selected ? updateResume(selected.id, form) : createResume(form)),
      selected ? "Resume saved." : "Resume created.",
    );
  }

  function startNewResume() {
    setSelectedId(null);
    setForm(emptyResume);
    setMessage("");
  }

  return (
    <div className="grid min-h-[620px] gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Card className="h-fit">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Your resumes</CardTitle>
          <Button size="icon" variant="outline" onClick={startNewResume} aria-label="Create resume">
            <Plus className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {resumes.length ? (
            resumes.map((resume) => (
              <button
                key={resume.id}
                type="button"
                onClick={() => setSelectedId(resume.id)}
                className={`w-full rounded-md border p-3 text-left transition hover:bg-muted ${
                  selectedId === resume.id ? "border-primary bg-muted" : "border-transparent"
                }`}
              >
                <p className="truncate text-sm font-medium">{resume.title}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {resume.targetRole || "No target role"}
                </p>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto mb-2 size-6" />
              Create your first resume.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{selected ? "Edit resume" : "Create resume"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="Resume title, e.g. Product designer"
                  maxLength={120}
                  required
                />
                <Input
                  value={form.targetRole}
                  onChange={(event) => setForm({ ...form, targetRole: event.target.value })}
                  placeholder="Target role (optional)"
                />
              </div>
              <Textarea
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                placeholder="Paste your complete resume here…"
                className="min-h-[280px] font-mono leading-6"
                maxLength={30_000}
                required
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button type="submit" disabled={isPending}>
                  <Save className="mr-2 size-4" />
                  {selected ? "Save changes" : "Create resume"}
                </Button>
                {selected && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={isPending}
                      onClick={() => run(() => optimizeResume(selected.id), "AI optimization is ready below.")}
                    >
                      <Sparkles className="mr-2 size-4" />
                      Optimize with AI
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isPending}
                      onClick={() => {
                        if (window.confirm(`Delete “${selected.title}”? This cannot be undone.`)) {
                          run(() => deleteResume(selected.id), "Resume deleted.");
                        }
                      }}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </Button>
                  </>
                )}
                <span className="ml-auto text-sm text-muted-foreground">
                  {allowance.unlimited
                    ? "Unlimited AI optimizations"
                    : `${allowance.remaining} of ${allowance.limit} free AI optimizations left this month`}
                </span>
              </div>
              {message && <p className="text-sm text-muted-foreground" role="status">{message}</p>}
            </form>
          </CardContent>
        </Card>

        {selected?.optimizedContent && (
          <Card>
            <CardHeader>
              <CardTitle>Latest AI-optimized version</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={selected.optimizedContent} readOnly className="min-h-[280px] font-mono leading-6" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
