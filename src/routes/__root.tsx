import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import amdInspiredCss from "../amd-inspired.css?url";
import amdHomeCss from "../amd-home.css?url";
import adminCss from "../admin.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--site-bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-normal text-[var(--purple)]">404</h1>
        <h2 className="mt-4 text-xl font-normal text-[var(--text-main)]">Page not found</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--purple)] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[var(--purple-light)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--site-bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-normal tracking-tight text-[var(--text-main)]">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--purple)] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[var(--purple-light)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-6 py-2.5 text-sm font-normal text-[var(--text-main)] transition-colors hover:bg-[var(--purple-soft)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const previewImage = "https://www.zaintheanalyst.com/og-image.png";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zain The Analyst — Data Analyst & Power BI Specialist" },
      {
        name: "description",
        content:
          "Zain Haidar is a Data Analyst and Power BI Specialist based in Vienna, helping businesses transform data into dashboards, insights, and smarter decisions.",
      },
      { name: "author", content: "Zain Haidar" },
      { property: "og:title", content: "Zain The Analyst — Data Analyst & Power BI Specialist" },
      {
        property: "og:description",
        content:
          "Dashboards, data analysis, ETL pipelines, and analytics solutions by Zain Haidar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#F8F7FF" },
      { name: "facebook-domain-verification", content: "5birgdgrl0melauac9n2x01iyjazu0" },
      { name: "twitter:title", content: "Zain The Analyst — Data Analyst & Power BI Specialist" },
      {
        name: "twitter:description",
        content:
          "Zain Haidar is a Data Analyst and Power BI Specialist based in Vienna, helping businesses transform data into dashboards, insights, and smarter decisions.",
      },
      { property: "og:image", content: previewImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Zain The Analyst — dashboards, data analysis, and automation" },
      { name: "twitter:image", content: previewImage },
      { name: "twitter:image:alt", content: "Zain The Analyst — dashboards, data analysis, and automation" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/zain-the-analyst-favicon.svg" },
      { rel: "apple-touch-icon", href: "/zain-the-analyst-apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: amdInspiredCss },
      { rel: "stylesheet", href: amdHomeCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap",
      },
      { rel: "stylesheet", href: adminCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
