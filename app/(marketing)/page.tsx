import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  FileSearch,
  Gauge,
  LineChart,
  Lock,
  Radar,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";

import { pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const dashboardMetrics = [
  { label: "Resume score", value: "86", suffix: "/100", tone: "text-emerald-300" },
  { label: "ATS compatibility", value: "94", suffix: "%", tone: "text-cyan-300" },
  { label: "Keyword match", value: "72", suffix: "%", tone: "text-violet-300" },
];

const suggestions = [
  "Quantify firmware debugging impact in the project section",
  "Add RTOS, UART, SPI and hardware validation keywords",
  "Move target-role skills above general coursework",
  "Rewrite objective into a concise professional summary",
];

const features = [
  {
    icon: Gauge,
    title: "Resume scoring",
    description:
      "Evaluate structure, clarity, impact, seniority signal, and recruiter readability in one pass.",
  },
  {
    icon: FileSearch,
    title: "ATS compatibility",
    description:
      "Detect formatting, keyword, section and parsing issues before your resume enters an ATS.",
  },
  {
    icon: Target,
    title: "Job keyword matching",
    description:
      "Compare your resume against target roles and surface missing high-intent keywords.",
  },
  {
    icon: Radar,
    title: "Skill gap analysis",
    description:
      "Identify missing skills, weak evidence, and experience gaps for the positions you want.",
  },
  {
    icon: Wand2,
    title: "AI rewriting assistant",
    description:
      "Improve bullet points without inventing experience, dates, employers, or achievements.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description:
      "Your resume workspace is account-scoped, with server-side access checks and secure storage.",
  },
];

const stats = [
  { value: "3x", label: "free monthly AI optimizations" },
  { value: "90s", label: "average time to first improved draft" },
  { value: "24/7", label: "role-specific resume review" },
  { value: "∞", label: "Pro optimizations" },
];

const stories = [
  {
    name: "Embedded engineer",
    result: "Clarified project impact and matched hardware-testing roles.",
  },
  {
    name: "Product manager",
    result: "Turned broad responsibilities into measurable launch outcomes.",
  },
  {
    name: "Data analyst",
    result: "Reframed SQL, dashboarding, and stakeholder work for BI roles.",
  },
];

const partnerLogos = ["TalentOps", "Northstar HR", "CareerLab", "HireSignal"];

function ResumeDashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-cyan-400/20 via-violet-500/25 to-fuchsia-500/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/80 shadow-2xl shadow-violet-950/40 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-300" />
            <span className="size-3 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            AI Resume Intelligence Dashboard
          </div>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Target role</p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  Senior Product Designer
                </h3>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Ready to submit
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {dashboardMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <p className="text-xs text-slate-400">{metric.label}</p>
                  <p className={cn("mt-2 text-3xl font-semibold", metric.tone)}>
                    {metric.value}
                    <span className="text-base text-slate-500">
                      {metric.suffix}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-white">
                  Keyword coverage
                </p>
                <p className="text-xs text-slate-400">18 matched / 25 desired</p>
              </div>
              <div className="space-y-3">
                {["Figma systems", "User research", "Conversion UX", "A/B testing"].map(
                  (item, index) => (
                    <div key={item}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-slate-300">{item}</span>
                        <span className="text-slate-500">{82 - index * 9}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                          style={{ width: `${82 - index * 9}%` }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 flex items-center gap-2 text-white">
                <Sparkles className="size-5 text-violet-300" />
                <h3 className="font-semibold">Optimization suggestions</h3>
              </div>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-300"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Skill gap</p>
                <p className="mt-2 text-2xl font-semibold text-white">3 key gaps</p>
                <p className="mt-2 text-sm text-slate-400">
                  Add measurable product outcomes, accessibility, and data-backed
                  design decisions.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Next best roles</p>
                <p className="mt-2 text-2xl font-semibold text-white">12 matches</p>
                <p className="mt-2 text-sm text-slate-400">
                  Ranked by keyword alignment, seniority, and capability evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <main className="overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate min-h-[920px] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.35),transparent_35%),linear-gradient(135deg,#07111f_0%,#11163a_48%,#35155c_100%)] px-4 pb-24 pt-20">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute left-1/2 top-20 h-px w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-20 left-16 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
        </div>

        <MaxWidthWrapper className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <Sparkles className="mr-2 size-4 text-cyan-300" />
            AI-powered career growth platform
          </div>

          <h1 className="max-w-5xl text-balance font-urban text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[78px] lg:leading-[0.98]">
            Build a sharper resume for the roles you actually want.
          </h1>

          <p className="mt-6 max-w-3xl text-balance text-lg leading-8 text-slate-300 sm:text-xl">
            ResumePilot analyzes your resume against ATS rules, target-role
            keywords, skill gaps, and hiring signals—then helps you rewrite with
            precision, not generic AI fluff.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg", rounded: "full" }),
                "bg-white px-7 text-slate-950 hover:bg-slate-200",
              )}
            >
              Start optimizing
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="#demo"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg", rounded: "full" }),
                "border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              View product demo
            </Link>
          </div>

          <div id="demo" className="mt-16 w-full">
            <ResumeDashboardMockup />
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-white py-24 text-slate-950">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">
              Product workflow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              From raw resume to role-ready narrative.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Upload or paste your resume, select a target position, review
              evidence-based analysis, then produce a stronger version built for
              recruiters and ATS systems.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {[
              ["01", "Add resume", "Create versions for different roles and industries."],
              ["02", "Analyze fit", "Score clarity, ATS readiness, keywords, and evidence."],
              ["03", "Improve bullets", "Rewrite weak points while preserving truthfulness."],
              ["04", "Apply smarter", "Track the role fit signals that matter most."],
            ].map(([step, title, description]) => (
              <div
                key={step}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-semibold text-violet-600">{step}</p>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="features" className="bg-slate-50 py-24 text-slate-950">
        <MaxWidthWrapper>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">
                Core features
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Built for serious job search execution.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              The product focuses on practical hiring signals: scanability,
              proof, keyword coverage, role alignment, and targeted improvements.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="results" className="bg-slate-950 py-24 text-white">
        <MaxWidthWrapper>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Data advantage
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Make every application more intentional.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                ResumePilot turns vague resume advice into measurable signals
                you can improve before applying.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                >
                  <p className="text-4xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-3 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-white py-24 text-slate-950">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">
              Customer stories
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              One career story, many sharper versions.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.name}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <LineChart className="size-8 text-violet-600" />
                <h3 className="mt-6 text-xl font-semibold">{story.name}</h3>
                <p className="mt-4 leading-7 text-slate-600">{story.result}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-50 py-20 text-slate-950">
        <MaxWidthWrapper>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Building2 className="size-5" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                  Partner with career teams and hiring ecosystems.
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Built for universities, bootcamps, career coaches, and talent
                  communities that need repeatable resume quality at scale.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {partnerLogos.map((partner) => (
                  <div
                    key={partner}
                    className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-500"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="pricing" className="bg-white py-24 text-slate-950">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">
              Pricing
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Start free. Upgrade when applications get serious.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {pricingData.map((plan) => (
              <div
                key={plan.title}
                className={cn(
                  "rounded-3xl border bg-white p-7 shadow-sm",
                  plan.title === "Pro"
                    ? "border-violet-400 shadow-violet-100"
                    : "border-slate-200",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  {plan.title === "Pro" && (
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
                <p className="mt-6 text-4xl font-semibold">
                  ${plan.prices.monthly}
                  <span className="text-base font-normal text-slate-500">
                    /month
                  </span>
                </p>
                <ul className="mt-7 space-y-3">
                  {plan.benefits.slice(0, 4).map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({
                      variant: plan.title === "Pro" ? "default" : "outline",
                      rounded: "full",
                    }),
                    "mt-8 w-full",
                  )}
                >
                  View plan
                </Link>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white">
        <MaxWidthWrapper>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-violet-500/10 to-fuchsia-500/10 p-8 text-center md:p-14">
            <BriefcaseBusiness className="mx-auto size-10 text-cyan-300" />
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Give your next application a stronger first impression.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Create a resume workspace, analyze fit, and generate a better
              draft before sending another application.
            </p>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg", rounded: "full" }),
                "mt-8 bg-white px-7 text-slate-950 hover:bg-slate-200",
              )}
            >
              Start free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 text-slate-400">
        <MaxWidthWrapper className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-white">
            <BarChart3 className="size-5 text-cyan-300" />
            <span className="font-semibold">ResumePilot</span>
          </div>
          <p>© 2026 ResumePilot. AI career tools for modern job seekers.</p>
          <div className="flex gap-5">
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          </div>
        </MaxWidthWrapper>
      </footer>
    </main>
  );
}
