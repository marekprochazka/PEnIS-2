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
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

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
  date: new Date(),
  time: 0,
  note: "",
  groupId: selectedGroup.value ? selectedGroup.value.id : "",
  userEmail: USER_EMAIL,
});
const saveLog = async () => {
  // validate with zod
  await createLog(newLog.value);
  logs.value = await getLogs(generateQueryFilters(generateLogFilter()));
  newLog.value = {
    date: new Date(),
    time: 0,
    note: "",
    groupId: selectedGroup.value ? selectedGroup.value.id : "",
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
    filters.push(["date", ">=", startDate.value.toISOString()]);
  }
  if (endDate.value) {
    filters.push(["date", "<=", endDate.value.toISOString()]);
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
  <div class="text-h3 mb-5">TIME LOG</div>
  <v-select
    :items="groups"
    item-title="name"
    item-value="id"
    label="Select group"
    persistent-hint
    return-object
    single-line
    class="mb-5"
    @update:modelValue="(value) => (selectedGroup = value)"
  />
  <v-expansion-panels class="mb-5">
    <v-expansion-panel>
      <v-expansion-panel-title> Create new group</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="10">
            <v-text-field v-model="groupNameForm" label="Group name" />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn block color="secondary" @click="newGroup(groupNameForm)"
              >Create group
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        Create new log (select group first)
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="10">
            <LogForm v-model="newLog" :locked="!selectedGroup" />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn @click="saveLog" block color="secondary">Save log</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        Filters (select group first)
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="6"> </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <LogForm
    v-for="(log, index) in logs"
    v-model="logs[index]"
    :locked="true"
    :key="log.id"
  />
</template>
