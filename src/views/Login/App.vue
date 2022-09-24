<script setup lang="ts">
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ROUTES } from "@/constants";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { getUserCredentials } from "@/utils";

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  const user = useUserStore();
  try {
    await signInWithPopup(auth, provider);
    user.setUser(getUserCredentials());
    await router.push(ROUTES.HOME);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>You need to login first lol</div>
  <v-btn @click="signIn">Sign in with Google</v-btn>
</template>
