<script lang="ts" setup>
import Navbar from "@/components/Navbar/App.vue";
import { provide } from "vue";
import { useI18n } from "vue-i18n";
import { TRANSLATOR } from "@/injections";
const { t } = useI18n();

import router from "@/router";
import { ROUTES } from "@/constants";

provide(TRANSLATOR, t);
</script>

<template>
  <v-app>
    <v-main>
      <Navbar v-if="router.currentRoute.value.path !== ROUTES.LOGIN" />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
