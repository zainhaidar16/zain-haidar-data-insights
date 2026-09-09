export const siteOrigin = "https://www.zaintheanalyst.com";
export function safeUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value, siteOrigin);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function pageHead(title: string, description: string, path: string, image?: string | null) {
  const imageUrl = safeUrl(image || "/og-image.png");
  return {
    meta: [
      { title: title + " — Zain Haidar" },
      { name: "description", content: description },
      { property: "og:title", content: title + " — Zain Haidar" },
      { property: "og:description", content: description },
      { property: "og:url", content: siteOrigin + path },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: title },
      { name: "twitter:title", content: title + " — Zain Haidar" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: siteOrigin + path }],
  };
}
