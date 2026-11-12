import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ejsPages from "./build/vite-plugin-ejs-pages.js";

const root = resolve(import.meta.dirname, "src");

// Same data json-server serves in LR4 — one source of truth for the static pages.
function loadData() {
  const db = JSON.parse(readFileSync(resolve(import.meta.dirname, "api/db.json"), "utf8"));
  const companies = db.t9_companies;
  const jobs = db.t9_jobs.map((job) => ({
    ...job,
    company: companies.find((c) => c.id === job.companyId)
  }));
  const currency = { USD: "$", EUR: "€", GBP: "£" };
  const salary = (job) =>
    `${currency[job.currency]}${job.salaryMin.toLocaleString("en-US")}–${currency[job.currency]}${job.salaryMax.toLocaleString("en-US")}`;
  const date = (iso) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return { jobs, companies, salary, date };
}

export default defineConfig({
  root,
  // Relative base so the build works under https://<user>.github.io/<repo>/
  base: "./",
  plugins: [ejsPages(loadData)],
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  build: {
    outDir: resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        list: resolve(root, "list.html"),
        details: resolve(root, "details.html"),
        form: resolve(root, "form.html")
      }
    }
  }
});
