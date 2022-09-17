import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/entry.scss";
import cs_messages from "./locale/cs.json";
import { createI18n } from "vue-i18n";

loadFonts();

const i18n = createI18n({
  legacy: false,
  locale: "cs",
  messages: {
    cs: cs_messages,
  },
});

const app = createApp(App).use(router).use(vuetify).use(i18n);

app.mount("#app");
