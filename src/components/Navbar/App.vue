<script setup lang="ts">
import { ROUTES } from "@/constants";
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
</script>

<template>
  <v-navigation-drawer expand-on-hover rail permanent>
    <v-list>
      <v-list-item
        prepend-avatar="https://avatars.githubusercontent.com/u/50014167?v=4"
        title="Mark Walker"
        subtitle="mark@walker.lol"
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
    </v-list>
  </v-navigation-drawer>
</template>
