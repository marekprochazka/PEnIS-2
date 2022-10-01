<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { ILogGroup, ILog } from "@/database/TimeLog/interfaces";
import {
  getAllGroups,
  createGroup,
  getLogs,
  createLog,
} from "@/database/TimeLog";
import { generateQueryFilters, getUserCredentials } from "@/utils";
import type { TQueryFilter } from "@/types";

import LogForm from "./LogForm.vue";

// constants
const USER_EMAIL = getUserCredentials().email;

// switches
const showAllLogs = ref(false);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

// Groups
const groups = ref<ILogGroup[]>([]);
const selectedGroup = ref<ILogGroup | null>(null);

const groupNameForm = ref("");
const newGroup = async (name: string) => {
  await createGroup(name);
  groups.value = await getAllGroups();
  groupNameForm.value = "";
};

// Specific logs
const logs = ref<ILog[]>([]);
const newLog = ref<ILog>({
  date: "",
  time: 0,
  note: "",
  groupId: "",
  userEmail: USER_EMAIL,
});
const saveLog = async () => {
  // validate with zod
  await createLog(newLog.value);
  logs.value = await getLogs(generateQueryFilters(generateLogFilter()));
  newLog.value = {
    date: "",
    time: 0,
    note: "",
    groupId: "",
    userEmail: USER_EMAIL,
  };
};

// functionalities
const generateLogFilter = (): TQueryFilter[] => {
  const filters: TQueryFilter[] = [];
  if (!showAllLogs.value) {
    filters.push(["userEmail", "==", USER_EMAIL]);
  }
  if (startDate.value) {
    filters.push(["date", ">=", startDate.value]);
  }
  if (endDate.value) {
    filters.push(["date", "<=", endDate.value]);
  }
  if (selectedGroup.value) {
    filters.push(["groupId", "==", selectedGroup.value.id]);
  }
  return filters;
};

watch([selectedGroup, showAllLogs, startDate, endDate], async () => {
  logs.value = await getLogs(generateQueryFilters(generateLogFilter()));
});
watch(selectedGroup, (value) => {
  newLog.value.groupId = value?.id || "";
});

onMounted(async () => {
  groups.value = await getAllGroups();
});
</script>

<template>
  <div>TIME LOG</div>
  <v-row>
    <v-col cols="12" md="10">
      <v-text-field v-model="groupNameForm" label="Group name" />
    </v-col>
    <v-col cols="12" md="2">
      <v-btn block @click="newGroup(groupNameForm)">Create group</v-btn>
    </v-col>
  </v-row>
  <v-select
    :items="groups"
    item-title="name"
    item-value="id"
    label="Select"
    persistent-hint
    return-object
    single-line
    @update:modelValue="(value) => (selectedGroup = value)"
  />
  <v-row>
    <v-col cols="12" md="10">
      <LogForm v-model="newLog" :locked="!selectedGroup" />
    </v-col>
    <v-col cols="12" md="2">
      <v-btn @click="saveLog" block>Save log</v-btn>
    </v-col>
  </v-row>
  <LogForm
    v-for="(log, index) in logs"
    v-model="logs[index]"
    :locked="true"
    :key="log.id"
  />
</template>
