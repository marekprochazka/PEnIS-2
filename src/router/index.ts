import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/views/Homepage/App.vue";
import Calendar from "@/views/Calendar/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
    },
  ],
});

export default router;
