<script setup lang="ts">
import { ROUTES } from "@/constants";
import { ref } from "vue";
import { loadTranslator } from "@/utils";

const t = loadTranslator();

const routes = [
  {
    name: t("navbar.home"),
    path: ROUTES.HOME.path,
    icon: "mdi-home",
  },
  {
    name: t("navbar.calendar"),
    path: ROUTES.CALENDAR.path,
    icon: "mdi-calendar",
  },
  {
    name: t("navbar.time_log"),
    path: ROUTES.TIME_LOG.path,
    icon: "mdi-clock",
  },
  {
    name: t("navbar.projects"),
    path: ROUTES.PROJECTS.path,
    icon: "mdi-folder",
  },
];

const drawer = ref(true);
const rail = ref(true);

import { auth } from "@/firebase";
import { useUserStore } from "@/stores/user";

const user = useUserStore().getUser;
const logout = () => {
  useUserStore().clearUser();
  auth.signOut();
  window.location.reload();
};
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      :prepend-avatar="user.profilePicture"
      :title="user.username"
      :subtitle="user.email"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        :prepend-icon="route.icon"
        :title="route.name"
        :to="route.path"
      />
      <v-list-item
        prepend-icon="mdi-logout"
        :title="t('navbar.logout')"
        @click="logout"
      >
      </v-list-item>
    </v-list>
    <template v-slot:append v-if="isNavbarOpen">
      <v-btn @click="isNavbarOpen = false" block>{{ t("navbar.close") }}</v-btn>
    </template>
  </v-navigation-drawer>
</template>
