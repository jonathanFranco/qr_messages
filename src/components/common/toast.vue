<script lang="ts" setup>
import { useToastStore, type Toast } from "@/stores/toast";
import { onUnmounted, type Ref, ref, watch } from "vue";

const data: Ref<Toast> = ref({} as Toast);

function whatTheType(): { icon: string; border: string } {
  const typeMap: Record<string, { icon: string; border: string }> = {
    error: { icon: "mdi-information", border: "border-[#EA0008]" },
    warning: { icon: "mdi-alert", border: "border-[#FECA30]" },
    success: { icon: "mdi-check-circle", border: "border-[#14C850]" },
  };
  return typeMap[data.value.color] || { icon: "", border: "" };
}

watch(useToastStore, (val) => (data.value = val.getToast!));

onUnmounted(() => useToastStore.$reset());
</script>

<template>
  <v-snackbar
    v-model="data.visible"
    color="white"
    height="80"
    :content-class="`!max-w-lg !shadow border-b-4 cursor-pointer hover:opacity-75 ${
      whatTheType()?.border
    } rounded`"
    elevation="0"
    location="right"
    :timeout="3000"
    @click.prevent="data.visible = false"
  >
    <div :class="[`text-neutral-800 font-[500]`, 'flex items-center gap-2']">
      <v-icon :class="['min-w-10', `text-${data.color}`]">
        {{ whatTheType()?.icon }}
      </v-icon>
      <p class="text-[16px] text-neutral-600">{{ data.message }}</p>
    </div>
  </v-snackbar>
</template>
