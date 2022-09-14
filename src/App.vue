<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { auth } from "@/firebase";

onMounted(() => {
  console.log(import.meta.env.MODE);
  console.log(import.meta.env);
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  console.log(auth.currentUser);
});
</script>
