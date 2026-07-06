import "server-only";

import { pricingData } from "@/config/subscriptions";
import { prisma } from "@/lib/db";

export const FREE_RESUME_OPTIMIZATIONS_PER_MONTH = 3;

export function currentMonthStart(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export function hasUnlimitedResumeOptimizations(user: {
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: Date | null;
}) {
  const paidPlanIds = pricingData
    .filter((plan) => plan.title === "Pro" || plan.title === "Business")
    .flatMap((plan) => [plan.stripeIds.monthly, plan.stripeIds.yearly])
    .filter((id): id is string => Boolean(id));

  return Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd &&
      user.stripeCurrentPeriodEnd.getTime() > Date.now() &&
      paidPlanIds.includes(user.stripePriceId),
  );
}

export async function getResumeOptimizationAllowance(userId: string) {
  const [user, usage] = await Promise.all([
    prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { stripePriceId: true, stripeCurrentPeriodEnd: true },
    }),
    prisma.resumeMonthlyUsage.findUnique({
      where: { userId_monthStart: { userId, monthStart: currentMonthStart() } },
      select: { optimizationCount: true },
    }),
  ]);

  const unlimited = hasUnlimitedResumeOptimizations(user);
  const used = usage?.optimizationCount ?? 0;

  return {
    unlimited,
    used,
    limit: FREE_RESUME_OPTIMIZATIONS_PER_MONTH,
    remaining: unlimited
      ? null
      : Math.max(FREE_RESUME_OPTIMIZATIONS_PER_MONTH - used, 0),
  };
}

export async function reserveResumeOptimization(userId: string) {
  const allowance = await getResumeOptimizationAllowance(userId);
  if (allowance.unlimited) return allowance;

  const monthStart = currentMonthStart();
  const updated = await prisma.resumeMonthlyUsage.updateMany({
    where: {
      userId,
      monthStart,
      optimizationCount: { lt: FREE_RESUME_OPTIMIZATIONS_PER_MONTH },
    },
    data: { optimizationCount: { increment: 1 } },
  });

  if (updated.count === 0) {
    try {
      await prisma.resumeMonthlyUsage.create({
        data: { userId, monthStart, optimizationCount: 1 },
      });
    } catch {
      const retried = await prisma.resumeMonthlyUsage.updateMany({
        where: {
          userId,
          monthStart,
          optimizationCount: { lt: FREE_RESUME_OPTIMIZATIONS_PER_MONTH },
        },
        data: { optimizationCount: { increment: 1 } },
      });

      if (retried.count === 0) {
        throw new Error(
          "Your three free AI optimizations for this month have been used. Upgrade to Pro for unlimited optimizations.",
        );
      }
    }
  }

  return { ...allowance, used: allowance.used + 1, remaining: allowance.remaining! - 1 };
}

export async function releaseResumeOptimization(userId: string) {
  await prisma.resumeMonthlyUsage.updateMany({
    where: {
      userId,
      monthStart: currentMonthStart(),
      optimizationCount: { gt: 0 },
    },
    data: { optimizationCount: { decrement: 1 } },
  });
}
