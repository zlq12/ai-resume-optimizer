"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
}

function getBillingUrl() {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";

  if (host) {
    return `${protocol}://${host}/pricing`;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/^["']|["']$/g, "");

  if (appUrl) {
    try {
      return `${new URL(appUrl).origin}/pricing`;
    } catch {
      // Fall through to local default for development.
    }
  }

  return "http://localhost:3000/pricing";
}

export async function generateUserStripe(priceId: string): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const session = await auth()
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    if (!priceId) {
      throw new Error("Missing Stripe price id. Check Vercel price ID environment variables.");
    }

    const billingUrl = getBillingUrl();

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      redirectUrl = stripeSession.url as string
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      })

      redirectUrl = stripeSession.url as string
    }
  } catch (error) {
    console.error("[stripe_checkout_error]", error);
    throw new Error(
      error instanceof Error
        ? `Failed to generate user stripe session: ${error.message}`
        : "Failed to generate user stripe session",
    );
  }

  // no revalidatePath because redirect
  redirect(redirectUrl)
}
