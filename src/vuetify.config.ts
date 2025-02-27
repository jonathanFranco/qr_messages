import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      rounded: "xl",
      elevation: "0",
    },
    VTextField: {
      elevation: "0",
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#720061",
          secondary: "#212121",
          "secondary-50": "#ffacac",
          neutral: "#B5B5B5",
          "neutral-800": "#000000",
          "neutral-700": "#454545",
          "neutral-600": "#4D4D4D",
          "neutral-500": "#808080",
          "neutral-300": "#EAEAEA",
          "neutral-200": "#F7F7F7",
          "neutral-100": "#FFFFFF",
        },
      },
      dark: {
        dark: false,
      },
    },
  },
});
