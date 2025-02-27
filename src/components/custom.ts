import type { App } from "vue";

import Vue3Lottie from "vue3-lottie";
import Loader from "./common/loader.vue";
import Toast from "./common/toast.vue";
import Card from "./common/card.vue";
import Default from "./layouts/default.vue";

import { MagicAnimeScroll } from "magic-anime-scroll";
import "magic-anime-scroll/dist/style.css";

export function setCustom(app: App): void {
  app.component("Default", Default);
  app.component("Toast", Toast);
  app.component("Loader", Loader);
  app.component("Card", Card);
  app.component("MagicAnimeScroll", MagicAnimeScroll);
  app.use(Vue3Lottie, { name: "LottieAnimation" });
}
