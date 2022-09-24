<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const user = useUserStore().getUser;
</script>

<template>
  <div>HOMEPAGE</div>
  <div>{{ user.username }}</div>
</template>
