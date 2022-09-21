<script setup lang="ts">
import IconQuestion from "./icons/IconQuestion.vue";
</script>

<template>
  <header
    class="w-full bg-purple-800 fixed top-0 left-0 shadow-sm flex items-center justify-end"
  >
    <RouterLink to="/how-to-use" class="mr-2">
      <IconQuestion class="w-8 h-8" />
    </RouterLink>
  </header>
</template>
