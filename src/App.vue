<template>
  <v-app>
    <v-main>
      <Navbar />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar/App.vue";
import { onMounted, provide } from "vue";
import { auth } from "@/firebase";
import { useI18n } from "vue-i18n";
import { TRANSLATOR } from "@/injections";
const { t } = useI18n();

provide(TRANSLATOR, t);

onMounted(() => {
  console.log(auth.currentUser);
});
</script>
