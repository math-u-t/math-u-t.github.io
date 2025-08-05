# math-u-t.github.io

math-u-tのページ用のリポジトリ。この下のコードは`explore.html`のカードの使い方をメモ。

```html
<article class="discovery-card">
  <div class="discovery-header">
    <span class="discovery-icon">🌐</span>
    <h2 class="discovery-title">Google Apps Scriptの隠れた機能</h2>
    <span class="discovery-date">2024.09</span>
  </div>
  <div class="discovery-content">
    <p>Google Apps Scriptでバックエンド開発をしていて、ドキュメントに載っていない便利な機能を発見しました。</p>
            
    <h3>Lock Service の活用</h3>
    <p>
      <span class="highlight">LockService.getScriptLock()</span>を使うことで、複数のユーザーが同時にスプレッドシートにアクセスしても、データの整合性を保てることがわかりました。
    </p>
            
    <div class="code-block">
function safeDataUpdate(data) {
  const lock = LockService.getScriptLock();
  
  try {
    // 10秒でタイムアウト
    lock.waitLock(10000);
    
    // 安全にデータを更新
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.appendRow(data);
    
  } catch (e) {
    console.log('Could not obtain lock');
  } finally {
    lock.releaseLock();
  }
}
    </div>
            
    <p>これにより、リアルタイムなデータ処理アプリケーションを作成できるようになりました。</p>
            
    <h3>応用例</h3>
    <ul>
      <li>リアルタイムチャットシステム</li>
      <li>在庫管理システム</li>
      <li>投票アプリケーション</li>
    </ul>
  </div>

  <div class="tags-container">
    <span class="tag">Google Apps Script</span>
    <span class="tag">並行処理</span>
    <span class="tag">データベース</span>
    <span class="tag">バックエンド</span>
    </div>
</article>
```