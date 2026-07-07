import { SidebarNavItem, SiteConfig } from "types";

function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/^["']|["']$/g, "");

  if (!url) return "http://localhost:3000";

  try {
    return new URL(url).origin;
  } catch {
    return "http://localhost:3000";
  }
}

const site_url = getSiteUrl();

export const siteConfig: SiteConfig = {
  name: "ResumePilot",
  description:
    "AI-powered resume optimization and career development tools for serious job seekers.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@resumepilot.ai",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
