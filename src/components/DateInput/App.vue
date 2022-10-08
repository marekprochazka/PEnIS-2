<script lang="ts" setup>
import DatePicker from "vue3-datepicker";
import { ref, watch } from "vue";
import { cs } from "date-fns/locale";

const props = defineProps({
  modelValue: { type: Date, required: false, default: null },
  disabled: { type: Boolean, required: false, default: false },
  label: { type: String, required: false, default: "Date" },
});
const innerDate = ref<Date | null>(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

const updateValue = (value: Date | null): void => {
  emit("update:modelValue", value);
};

const clearDate = (): void => {
  innerDate.value = null;
  updateValue(null);
};

watch(innerDate, () => {
  updateValue(innerDate.value);
});
</script>

<template>
  <v-row>
    <v-col>
      <div>
        {{ props.label }}
      </div>
    </v-col>
  </v-row>
  <v-row class="datepicker">
    <v-col md="10" cols="12">
      <DatePicker
        v-model="innerDate"
        :locale="cs"
        :disabled="props.disabled"
        input-format="dd. MM. yyyy"
        class=""
      />
    </v-col>
    <v-col md="2" cols="12">
      <v-btn
        v-if="innerDate && !props.disabled"
        icon
        @click="clearDate"
        :disabled="props.disabled"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
