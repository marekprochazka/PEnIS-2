<script lang="ts" setup>
import Navbar from "@/components/Navbar/App.vue";
import { onMounted, provide } from "vue";
import { auth } from "@/firebase";
import { useI18n } from "vue-i18n";
import { TRANSLATOR } from "@/injections";
const { t } = useI18n();
import { useUserStore } from "@/stores/user";
import { getUserCredentials } from "@/utils";

import router from "@/router";
import { ROUTES } from "@/constants";

provide(TRANSLATOR, t);
const userStore = useUserStore();

onMounted(() => {
  if (auth.currentUser && userStore.isUserEmpty()) {
    userStore.setUser(getUserCredentials());
  }
});
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
