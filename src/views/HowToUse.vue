<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <main>
    <h1>使い方</h1>
    <div>
      <ol>
        <li>選考追加ページへ移動します。</li>
        <li>会社名の入力と選考方法を選択をして追加ボタンを押します。</li>
        <li>{作成中}</li>
      </ol>
    </div>

    <button @click="goBack" class="border p-1 rounded-xl">戻る</button>
  </main>
</template>
