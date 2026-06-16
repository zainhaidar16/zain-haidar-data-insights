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
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-normal text-[#8B5CF6]">404</h1>
        <h2 className="mt-4 text-xl font-normal text-white">Page not found</h2>
        <p className="mt-2 text-sm text-[#8B8B98]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#8B5CF6] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#A779FF]"
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
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-normal tracking-tight text-white">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-[#8B8B98]">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#8B5CF6] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#A779FF]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(145,92,255,0.30)] bg-transparent px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[rgba(139,92,246,0.08)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const previewImage =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/291f6cc8-f7b5-4e7a-b49b-9757167b121d/id-preview-40d24f5e--79a7ca6f-6cc3-4da5-806e-e43a82d156bf.lovable.app-1780669171563.png";

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
      { name: "theme-color", content: "#050505" },
      { name: "facebook-domain-verification", content: "5birgdgrl0melauac9n2x01iyjazu0" },
      { name: "twitter:title", content: "Zain The Analyst — Data Analyst & Power BI Specialist" },
      {
        name: "twitter:description",
        content:
          "Zain Haidar is a Data Analyst and Power BI Specialist based in Vienna, helping businesses transform data into dashboards, insights, and smarter decisions.",
      },
      { property: "og:image", content: previewImage },
      { name: "twitter:image", content: previewImage },
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
