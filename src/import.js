// /src/import.js
document.addEventListener("DOMContentLoaded", async () => {
  const importTags = document.querySelectorAll("import[src]");

  const loadPromises = Array.from(importTags).map(async (tag) => {
    const src = tag.getAttribute("src");
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Failed to load: ${src}`);
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html.trim();
      tag.replaceWith(template.content);
    } catch (e) {
      console.error(e);
      tag.innerHTML = `<p style="color:red;">読み込み失敗: ${src}</p>`;
    }
  });

  await Promise.all(loadPromises);

  // 共通パーツ読み込み後に CSS を動的に読み込む
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "style.css"; // index.htmlから見た相対パスでOK
  document.head.appendChild(link);

  console.log("footer 読み込み完了 → CSS 適用");
});