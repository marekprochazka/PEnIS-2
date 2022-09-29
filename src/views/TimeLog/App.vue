<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ILogGroup } from "@/database/TimeLog/interfaces";
import { getAllGroups, createGroup } from "@/database/TimeLog";

const groups = ref<ILogGroup[]>([]);

const groupNameForm = ref("");
const newGroup = async (name: string) => {
  await createGroup(name);
  groups.value = await getAllGroups();
};

onMounted(async () => {
  groups.value = await getAllGroups();
});
</script>

<template>
  <div>TIME LOG</div>
  <v-text-field v-model="groupNameForm" label="Group name" />
  <v-btn @click="newGroup(groupNameForm)">Create group</v-btn>
  <p v-for="group in groups" :key="group.id">
    {{ group.name }}
  </p>
</template>
