"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";

import { stripe } from "@/lib/stripe";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

function getBillingUrl() {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";

  if (host) {
    return `${protocol}://${host}/dashboard/billing`;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/^["']|["']$/g, "");

  if (appUrl) {
    try {
      return `${new URL(appUrl).origin}/dashboard/billing`;
    } catch {
      // Fall through to local default for development.
    }
  }

  return "http://localhost:3000/dashboard/billing";
}

export async function openCustomerPortal(
  userStripeId: string,
): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const session = await auth();

    if (!session?.user || !session?.user.email) {
      throw new Error("Unauthorized");
    }

    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: getBillingUrl(),
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    throw new Error("Failed to generate user stripe session");
  }

  redirect(redirectUrl);
}
