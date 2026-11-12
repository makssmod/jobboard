// Renders every HTML page through EJS before Vite processes it,
// so pages can share partials (header, footer, job card) via include().
import ejs from "ejs";

export default function ejsPages(getData) {
  return {
    name: "ejs-pages",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        return ejs.render(html, getData(), { filename: ctx.filename });
      }
    },
    handleHotUpdate({ file, server }) {
      // Partials and data are not part of Vite's module graph: reload the page on change.
      if (file.endsWith(".ejs") || file.endsWith("db.json") || file.endsWith(".json")) {
        server.ws.send({ type: "full-reload" });
      }
    }
  };
}
