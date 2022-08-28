<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {auth} from '@/firebase';
  onMounted(() => {
    console.log(auth.currentUser)});
</script>
