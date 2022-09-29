<script setup lang="ts">
import { loadTranslator } from "@/utils";

const t = loadTranslator();

interface IRole {
  name: string;
  description: string;
  assignee: string;
  icon: string;
}
const roles: IRole[] = [
  {
    name: t("team_projects.roles.devops.name"),
    description: t("team_projects.roles.devops.description"),
    assignee: "Mara",
    icon: "mdi-account-cog",
  },
  {
    name: t("team_projects.roles.docs_manager.name"),
    description: t("team_projects.roles.docs_manager.description"),
    assignee: "Adam",
    icon: "mdi-account-cog",
  },
  {
    name: t("team_projects.roles.lore_master.name"),
    description: t("team_projects.roles.lore_master.description"),
    assignee: "Luke",
    icon: "mdi-account-cog",
  },
  {
    name: t("team_projects.roles.tester.name"),
    description: t("team_projects.roles.tester.description"),
    assignee: "Skleny",
    icon: "mdi-account-cog",
  },
];
</script>

<template>
  <div class="text-h4 text-md-h2">{{ t("team_projects.title") }}</div>
  <div class="text-h6 mt-5">
    <span class="font-weight-bold">{{
      t("team_projects.current_project")
    }}</span>
    {{ t("team_projects.current_project_name") }}
  </div>

  <v-expansion-panels multiple>
    <v-expansion-panel v-for="role in roles" :key="role.name" class="mt-8">
      <v-expansion-panel-title>
        <v-icon>{{ role.icon }}</v-icon>
        <span class="ml-3 font-weight-bold text-md-h5">{{ role.name }}</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-html="role.description" />
        <div class="mt-3" v-if="role.assignee">
          <span class="font-weight-bold"
            >{{ t("team_projects.assignee") }}:</span
          >
          <span class="ml-2">{{ role.assignee }}</span>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
