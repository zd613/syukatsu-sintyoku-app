import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-new-company",
      name: "add-new-company",
      // lazy-loaded
      component: () => import("../views/AddNewCompany.vue"),
    },
    {
      path: "/how-to-use",
      name: "how-to-use",
      component: () => import("../views/HowToUse.vue"),
    },
  ],
});

export default router;
