import { createRouter, createWebHistory } from "vue-router";

import Form from "@/views/form.vue";
import Index from "@/views/index.vue";
import NotFound from "@/views/not-found.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:key",
      name: "messages",
      component: Index,
      meta: { requiresAuth: true },
    },
    {
      path: "/mandar-mensagem",
      name: "add-message",
      component: Form,
      meta: { requiresGuest: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
