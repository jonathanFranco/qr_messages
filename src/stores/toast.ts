import { defineStore } from "pinia";
import { instance } from "./index";

export interface Toast {
  visible?: boolean;
  color: "error" | "success" | "warning";
  message: string;
}

const store = defineStore({
  id: "toast",
  state: () => ({
    data: { color: "error", message: "" } as Toast | null,
  }),
  getters: { getToast: (state) => state.data },
  actions: {
    setToast(value: Toast | null) {
      value!.visible = true;
      this.data = value;
    },
  },
});

export const useToastStore = store(instance);
