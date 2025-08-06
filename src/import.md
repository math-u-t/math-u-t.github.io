# `import.js` の使い方

`import.js` を使うと、HTMLの中で

```html
<import src="path"></import>
```

というタグを書くだけで、指定したパスのコンテンツを簡単に読み込めます。

### ポイント

* `<import>` タグの `src` 属性に読み込みたいファイルのパスを指定してください。
* どんな時でも **`style.css`** が自動で読み込まれます。スタイルは常に適用されるので安心です。

### 例

```html
<import src="components/header.html"></import>
```

これで `components/header.html` の内容が読み込まれ、ページに反映されます。