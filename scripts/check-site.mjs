import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("_site");
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else files.push(target);
  }
}

await walk(output);
const html = files.filter((file) => file.endsWith(".html"));
const css = files.filter((file) => file.endsWith(".css"));
const js = files.filter((file) => file.endsWith(".js"));
const homepage = await readFile(path.join(output, "index.html"), "utf8");
const cssBytes = (await Promise.all(css.map(stat))).reduce((sum, item) => sum + item.size, 0);
const homepageBytes = (await stat(path.join(output, "index.html"))).size + cssBytes;
const markup = await Promise.all(html.map((file) => readFile(file, "utf8")));
const externalRequests = markup.join("\n").match(/<(?:script|img|iframe|link)\b[^>]+(?:src|href)=['"]https?:\/\//gi) || [];
const failures = [];

if (!homepage.includes('<main id="main-content">')) failures.push("homepage is missing the main landmark");
if (cssBytes > 20 * 1024) failures.push(`CSS is ${cssBytes} bytes; keep it under 20 KB`);
if (homepageBytes > 150 * 1024) failures.push(`homepage is ${homepageBytes} bytes; keep it under 150 KB`);
if (js.length) failures.push(`found ${js.length} JavaScript file(s)`);
if (externalRequests.length) failures.push(`found ${externalRequests.length} external request(s)`);
for (const [index, page] of markup.entries()) {
  if (!/<html[^>]+lang="[^"]+"/.test(page)) failures.push(`${path.basename(html[index])} is missing lang`);
  if (!/<title>[^<]+<\/title>/.test(page)) failures.push(`${path.basename(html[index])} is missing a title`);
  if ((page.match(/<h1\b/g) || []).length !== 1) failures.push(`${path.basename(html[index])} should have exactly one h1`);
}

console.log(`Audited ${html.length} HTML pages.`);
console.log(`Homepage plus CSS: ${homepageBytes} bytes.`);
console.log(`JavaScript payload: ${js.length ? "present" : "0 bytes"}.`);
if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS low-carbon and accessibility checks.");
}
