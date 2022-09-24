import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/views/Homepage/App.vue";
import Calendar from "@/views/Calendar/App.vue";
import Login from "@/views/Login/App.vue";
import { ROUTES } from "@/constants";
import { auth } from "@/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME,
      name: "home",
      component: Homepage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: ROUTES.CALENDAR,
      name: "calendar",
      component: Calendar,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: ROUTES.LOGIN,
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check if user is logged in
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
