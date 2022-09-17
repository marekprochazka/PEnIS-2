import type { InjectionKey } from "vue";

export const TRANSLATOR: InjectionKey<(value: string) => string> = Symbol("t");
