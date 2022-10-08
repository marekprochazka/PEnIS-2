<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import type { ILogGroup, ILog } from "@/database/TimeLog/interfaces";
import {
  getAllGroups,
  createGroup,
  getLogs,
  createLog,
} from "@/database/TimeLog";
import { generateQueryFilters } from "@/utils";
import type { TQueryFilter } from "@/types";

import LogForm from "./LogForm.vue";
import DateInput from "@/components/DateInput/App.vue";
import { useUserStore } from "@/stores/user";
import { loadTranslator } from "@/utils";

const t = loadTranslator();
// constants
const USER = useUserStore().getUser;
const USER_EMAIL = USER.email;

// switches
const showAllLogs = ref(false);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

// Groups
const groups = ref<ILogGroup[]>([]);
const selectedGroup = ref<ILogGroup | null>(null);

const groupNameForm = ref("");
const newGroup = async (name: string) => {
  groupNameForm.value = "";
  await createGroup(name);
  groups.value = await getAllGroups();
  selectedGroup.value = groups.value.find((g) => g.name === name) || null;
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
  if (selectedGroup.value) {
    logs.value = await getLogs(generateQueryFilters(generateLogFilter()));
  }
});
watch(selectedGroup, (value) => {
  newLog.value.groupId = value?.id || "";
});

const totalTimeSpend = computed(() => {
  return logs.value.reduce((acc, log) => acc + log.time, 0);
});

onMounted(async () => {
  groups.value = await getAllGroups();
});
</script>

<template>
  <div class="text-h3 mb-5">{{ t("time_log.time_log") }}</div>
  <v-select
    :items="groups"
    item-title="name"
    item-value="id"
    :label="t('time_log.select_group')"
    persistent-hint
    return-object
    single-line
    class="mb-5"
    @update:modelValue="(value) => (selectedGroup = value)"
  />
  <v-expansion-panels class="mb-5" multiple>
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ t("time_log.create_new_group") }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="10">
            <v-text-field
              v-model="groupNameForm"
              :label="t('time_log.group_name')"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn block color="secondary" @click="newGroup(groupNameForm)">
              {{ t("time_log.create_group") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ t("time_log.create_new_log") }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="10">
            <LogForm v-model="newLog" :locked="!selectedGroup" />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn @click="saveLog" block color="secondary">
              {{ t("time_log.save_log") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ t("time_log.filters") }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="4">
            <DateInput v-model="startDate" />
          </v-col>
          <v-col cols="12" md="4">
            <DateInput v-model="endDate" />
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox
              v-model="showAllLogs"
              :label="t('time_log.show_all_logs')"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ t("time_log.stats") }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="4">
            {{ t("time_log.group_name") }}: {{ selectedGroup?.name }}
          </v-col>
          <v-col cols="12" md="4">
            {{ t("time_log.total_time") }}: {{ totalTimeSpend }} min
          </v-col>
          <v-col cols="12" md="4">
            {{ t("time_log.user") }}:
            {{ showAllLogs ? t("time_log.all") : USER_EMAIL }}
          </v-col>
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
