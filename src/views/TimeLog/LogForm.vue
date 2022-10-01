<script setup lang="ts">
import type { ILog } from "@/database/TimeLog/interfaces";
import { computed, ref, watch } from "vue";

const props = defineProps<{ modelValue: ILog; locked: boolean }>();

const innerLog = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    return emit("update:modelValue", value);
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="innerLog.time"
            label="Time"
            :disabled="props.locked"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="innerLog.date"
            label="Date"
            :disabled="props.locked"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="innerLog.note"
            label="Note"
            :disabled="props.locked"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
