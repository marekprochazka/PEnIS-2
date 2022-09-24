<script setup lang="ts">
import { ROUTES } from "@/constants";
import { computed } from "vue";
const routes = [
  {
    name: "Home",
    path: ROUTES.HOME,
    icon: "mdi-home",
  },
  {
    name: "Calendar",
    path: ROUTES.CALENDAR,
    icon: "mdi-calendar",
  },
];

const allowExpand = computed(() => {
  return window.innerWidth > 600;
});

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
  <v-navigation-drawer :expand-on-hover="allowExpand" rail permanent>
    <v-list>
      <v-list-item
        :prepend-avatar="user.profilePicture"
        :title="user.username"
        :subtitle="user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        :prepend-icon="route.icon"
        :title="route.name"
        :to="route.path"
      />
      <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
