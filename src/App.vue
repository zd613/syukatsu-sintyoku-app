<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-800 text-gray-200">
    <TheHeader class="h-12 z-50" />
    <RouterView class="pt-12" />
  </div>
</template>
