<script lang="ts" setup>
import { ICalendarService } from "@/views/Calendar/interfaces";
import { loadTranslator } from "@/utils";

const t = loadTranslator();

const services: [ICalendarService] = [
  {
    name: t("p.calendar.services.dishes.name"),
    icon: "mdi-food",
    color: "red",
    description: t("p.calendar.services.dishes.description"),
  },
];
</script>

<template>
  <div class="text-h4 text-md-h2">{{ t("p.calendar.title") }}</div>
</template>
