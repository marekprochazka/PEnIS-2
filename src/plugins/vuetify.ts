// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#141824",
    surface: "#FFB600",
    primary: "#FFB600",
    secondary: "#0049FF",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "theme",
    themes: {
      theme,
    },
  },
});
