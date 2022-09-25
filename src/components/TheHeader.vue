<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import IconQuestion from "./icons/IconQuestion.vue";
import IconChevronLeft from "./icons/IconChevronLeft.vue";
import { computed } from "vue";

const router = useRouter();
const onBackButtonclick = () => {
  router.back();
};

const route = useRoute();
const isHome = computed(() => {
  console.log(route.path);
  return route.path === "/";
});
</script>

<template>
  <header
    class="w-full bg-purple-800 fixed top-0 left-0 shadow-sm flex items-center justify-between"
  >
    <div>
      <button @click="onBackButtonclick" class="ml-2" v-if="!isHome">
        <IconChevronLeft />
      </button>
    </div>

    <RouterLink to="/how-to-use" class="mr-2">
      <IconQuestion class="w-8 h-8" />
    </RouterLink>
  </header>
</template>
