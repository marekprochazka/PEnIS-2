import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/views/Homepage/App.vue";
import Calendar from "@/views/Calendar/App.vue";
import Login from "@/views/Login/App.vue";
import TimeLog from "@/views/TimeLog/App.vue";
import TeamProjects from "@/views/TeamProjects/App.vue";
import { ROUTES } from "@/constants";
import { auth } from "@/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: ROUTES.HOME.name,
      path: ROUTES.HOME.path,
      component: Homepage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: ROUTES.CALENDAR.name,
      path: ROUTES.CALENDAR.path,
      component: Calendar,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: ROUTES.TIME_LOG.name,
      path: ROUTES.TIME_LOG.path,
      component: TimeLog,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: ROUTES.PROJECTS.name,
      path: ROUTES.PROJECTS.path,
      component: TeamProjects,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: ROUTES.LOGIN.name,
      path: ROUTES.LOGIN.path,
      component: Login,
      props: true,
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
    next({
      name: ROUTES.LOGIN.name,
      params: { nextUrl: to.fullPath },
      query: { nextUrl: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
