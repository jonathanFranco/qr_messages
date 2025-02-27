import "./assets/tailwind.css";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./assets/styles/main.scss";

import { createApp } from "vue";

import { vuetify } from "@/vuetify.config";
import App from "./App.vue";
import { setCustom } from "./components/custom";
import router from "./router";

const app = createApp(App);

setCustom(app);
app.use(vuetify);
app.use(router);
app.mount("#app");
