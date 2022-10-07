<script lang="ts" setup>
import DatePicker from "vue3-datepicker";
import { ref, watch } from "vue";
import { cs } from "date-fns/locale";

const props = defineProps({
  modelValue: { type: Date, required: true },
  disabled: { type: Boolean, required: false, default: true }
});
const innerDate = ref(props.modelValue);
console.log(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

const updateValue = (value: Date): void => {
  emit("update:modelValue", value);
};

watch(innerDate, () => {
  console.log("change", innerDate.value);
  updateValue(innerDate.value);
});
</script>

<template>
  <DatePicker
    v-model="innerDate"
    :locale="cs"
    :disabled="props.disabled"
    input-format="dd. MM. yyyy"
    class=""
  />
</template>
