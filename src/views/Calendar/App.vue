<script lang="ts" setup>
import { ICalendarService } from "@/views/Calendar/interfaces";
import { loadTranslator } from "@/utils";
import GoogleCalendar from "@/components/GoogleCalendar/App.vue";

const t = loadTranslator();

const services: ICalendarService[] = [
  {
    name: t("calendar.services.dishes.name"),
    icon: "mdi-silverware-clean",
    description: t("calendar.services.dishes.description"),
  },
  {
    name: t("calendar.services.floor.name"),
    icon: "mdi-broom",
    description: t("calendar.services.floor.description"),
  },
  {
    name: t("calendar.services.hygiene_places.name"),
    icon: "mdi-toilet",
    description: t("calendar.services.hygiene_places.description"),
  },
  {
    name: t("calendar.services.vacuuming.name"),
    icon: "mdi-axe",
    description: t("calendar.services.vacuuming.description"),
  },
];
</script>

<template>
  <div class="text-h4 text-md-h2">{{ t("calendar.title") }}</div>
  <v-expansion-panels class="mt-5">
    <v-expansion-panel class="google_calendar_panel">
      <v-expansion-panel-title>
        <v-icon>mdi-calendar</v-icon>
        <span class="ml-3 font-weight-bold text-md-h5">{{
          t("calendar.calendar.title")
        }}</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <GoogleCalendar />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="service in services"
      :key="service.name"
      class="mt-8"
    >
      <v-expansion-panel-title>
        <v-icon>{{ service.icon }}</v-icon>
        <span class="ml-3 font-weight-bold text-md-h5">{{ service.name }}</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        {{ service.description }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
