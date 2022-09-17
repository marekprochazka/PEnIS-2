import { inject } from "vue";
import { TRANSLATOR } from "@/injections";

export const loadTranslator = () => {
  return inject(TRANSLATOR) ?? ((value: string) => `ERROR: ${value}`);
};
