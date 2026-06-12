<script lang="ts">
  import { onMount } from "svelte";

  let token = "";
  let isSaved = false;
  let statusMessage = "";

  // 画面がブラウザで読み込まれた時にlocalStorageから復元
  onMount(() => {
    const savedToken = localStorage.getItem("we_blog_pat");
    if (savedToken) {
      token = savedToken;
      isSaved = true;
    }
  });

  // 保存ボタンが押された時の処理
  function handleSave() {
    if (token.trim() === "") {
      alert("トークンが空です");
      return;
    }
    localStorage.setItem("we_blog_pat", token);
    isSaved = true;
    alert("GitHubトークンを保存しました！");
  }

  // リセット（削除）ボタンの処理
  function handleReset() {
    localStorage.removeItem("we_blog_pat");
    token = "";
    isSaved = false;
    alert("保存されているトークンを削除しました");
  }

  // 【追加】日本語を安全にBase64エンコードする関数
  function encodeToBase64(text: string): string {
    const bytes = new TextEncoder().encode(text);
    const binaryString = Array.from(bytes, (byte) =>
      String.fromCharCode(byte),
    ).join("");
    return btoa(binaryString);
  }

  // GitHubにファイルを送信（作成・更新）するテスト関数
  async function handleCreateFile() {
    if (!token) {
      alert("先にGitHubトークンを保存してください");
      return;
    }

    statusMessage = "GitHubにファイルを送信中...";

    // リポジトリの情報やパス
    const owner = "Ank-red";
    const repo = "we-blog_template";
    const path = "content/article/test-post.md";

    // 日本語を含む文字列を安全にエンコードする
    const rawContent = `---
title: "テスト投稿"
date: "2026-06-12"
---
これはCMSからAPI経由で作成したテスト記事です。（日本語対応版）`;

    const content = encodeToBase64(rawContent);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "CMSから記事を追加",
            content: content,
          }),
        },
      );

      if (response.ok) {
        statusMessage = "ファイルの作成に成功しました！";
      } else {
        const errorData = await response.json();
        statusMessage = `エラー: ${errorData.message}`;
      }
    } catch (error: any) {
      statusMessage = `通信エラーが発生しました: ${error.message}`;
    }
  }
</script>

<div class="admin-container">
  <h2>ANKRED CMS (Svelte)</h2>

  <div class="panel">
    <h3>GitHub認証設定</h3>
    <p class="status-text">
      状態:
      {#if isSaved}
        <span style="color: green;">トークンが保存されています</span>
      {:else}
        <span style="color: gray;">未設定</span>
      {/if}
    </p>

    <input
      type="password"
      bind:value={token}
      placeholder="Fine-grained PAT を入力"
    />

    <div class="button-group">
      <button on:click={handleSave}>保存</button>
      <button on:click={handleReset} style="background-color: #ffcccc;"
        >クリア</button
      >
    </div>
  </div>
  <div class="panel" style="margin-top: 15px;">
    <h3>記事の送信テスト</h3>
    <button on:click={handleCreateFile}>テスト記事を送信</button>
    <p>{statusMessage}</p>
  </div>
</div>

<style>
  .admin-container {
    padding: 20px;
    font-family: sans-serif;
  }
  .panel {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
  }
  .status-text {
    font-size: 0.9em;
    margin-bottom: 8px;
  }
  input {
    padding: 8px;
    width: 300px;
    margin-right: 8px;
  }
  .button-group {
    margin-top: 10px;
  }
  button {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 6px;
  }
</style>
