<script setup lang="ts">
import RounedButton from "../components/RounedButton.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const onAddNewCompanyButtonClick = () => {
  router.push("/add-new-company");
};
</script>

<template>
  <div>
    <main></main>

    <div class="fixed w-400 bottom-0 right-0 mr-4 mb-4">
      <RounedButton
        class="rounded-button w-12 h-12 shadow-lg"
        @click="onAddNewCompanyButtonClick"
      >
        <IconPlus />
      </RounedButton>
    </div>
  </div>
</template>

<style scoped>
.rounded-button:active {
  transform: translateY(2px);
}
</style>
