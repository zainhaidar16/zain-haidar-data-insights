import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL;
const integration = { skip: !base, timeout: 30000 };

for (const path of ["/blog", "/blog/old-article", "/insights/old-article", "/admin/posts"]) {
  test(`retired route ${path} is not available`, integration, async () => {
    const response = await fetch(new URL(path, base), { redirect: "manual" });
    assert.equal(response.status, 404);
    assert.match(await response.text(), /Page not found/);
  });
}

for (const path of ["/", "/about", "/projects", "/services", "/contact"]) {
  test(`${path} has no writing navigation or article section`, integration, async () => {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, /href=["'][^"']*\/(?:blog|insights)(?:[\/"'?#])/i);
    assert.doesNotMatch(html, />\s*Writing\s*</i);
    assert.doesNotMatch(html, />\s*Ideas worth/i);
  });
}

test("sitemap does not advertise retired article routes", integration, async () => {
  const response = await fetch(new URL("/sitemap.xml", base));
  if (response.status === 404) return; // This project does not currently expose a sitemap.
  assert.equal(response.status, 200);
  assert.doesNotMatch(await response.text(), /<loc>[^<]*\/(?:blog|insights)(?:[\/<])/i);
});
