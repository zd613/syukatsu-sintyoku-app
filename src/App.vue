<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useHead } from "@vueuse/head";
useHead({
  title: "就活進捗アプリ",
  meta: [
    {
      name: "description",
      content: "就活の進捗を登録しておくアプリです。",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-800 text-gray-200">
    <TheHeader class="h-12 z-50" />
    <RouterView class="pt-12" />
    <div id="modal" class="pt-12"></div>
  </div>
</template>
