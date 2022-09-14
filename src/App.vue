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
import { onMounted } from "vue";
import { auth } from "@/firebase";

onMounted(() => {
  console.log(auth.currentUser);
});
</script>
