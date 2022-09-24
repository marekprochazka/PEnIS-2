import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/entry.scss";
import cs_messages from "./locale/cs.json";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";

loadFonts();

const i18n = createI18n({
  legacy: false,
  locale: "cs",
  messages: {
    cs: cs_messages,
  },
});
const store = createPinia();
const app = createApp(App).use(router).use(vuetify).use(i18n).use(store);

import { useUserStore as userStorePostLoaded } from "@/stores/user";

app.mount("#app");

export { i18n, userStorePostLoaded };
