<script lang="ts">
  // PATを一時的に保持する変数
  let token = "";

  // 保存ボタンが押された時の処理（localStorageに保存するなど）
  function handleSave() {
    // ここに処理を書いていくよ
  }

  console.log("管理画面のモジュールが正常に読み込まれました");
</script>

<div class="admin-container">
  <h2>WeBlogCMS</h2>

  <div class="panel">
    <h3>GitHub認証設定</h3>
    <input
      type="password"
      bind:value={token}
      placeholder="Fine-grained PAT を入力"
    />
    <button on:click={handleSave}>保存</button>
  </div>
</div>

<style>
  /* Svelteのスタイルはこのコンポーネント内にだけカプセル化されるよ */
  .admin-container {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    font-family: sans-serif;
  }
  .panel {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 6px;
  }
  input {
    padding: 8px;
    width: 300px;
    margin-right: 8px;
  }
  button {
    padding: 8px 16px;
  }
</style>
