<script lang="ts" setup>
import { useWebSocketStore } from "@/stores/socket";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const storeSocket = useWebSocketStore;
const UUID = "1d4d2e23-5bb5-421f-9e25-f419c78d43ac";
const route = useRoute();
const router = useRouter();
const currentIndex = ref(0);
const loading = ref(false);
let intervalId: ReturnType<typeof setInterval> | null = null;

const currentMessage = computed(() => {
  return storeSocket.messages.length > 0
    ? storeSocket.messages[currentIndex.value]
    : null;
});

function startInterval(): void {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (
      storeSocket.messages.length > 0 &&
      currentIndex.value < storeSocket.messages.length - 1
    ) {
      currentIndex.value++;
    } else {
      clearInterval(intervalId!);
      intervalId = null;
    }
  }, 10000);
}

watch(currentMessage, () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 500);
});

watch(
  () => storeSocket.messages.length,
  (newLength, oldLength) => {
    if (newLength > oldLength && !intervalId) startInterval();
  }
);

onMounted(() => {
  if (route.params.key !== UUID) {
    router.push({ name: "NotFound" });
    return;
  }

  storeSocket.connect();
  startInterval();
});

onUnmounted(() => {
  storeSocket.close();
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <Card v-if="!loading && currentMessage">
    <v-row>
      <v-col cols="12">
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-between gap-5">
            <v-avatar color="primary" size="65">
              <v-icon size="35">mdi-account-clock</v-icon>
            </v-avatar>
            <div class="font-bold max-w-fit">
              <p
                class="text-xl xl:text-3xl w-[300px] lg:w-[400px] text-primary truncate"
              >
                {{ currentMessage?.nome }}
              </p>
              <p
                class="text-sm xl:text-2xl text-gray-600 font-light w-[300px] lg:w-[400px] truncate"
              >
                {{ "Para: " + currentMessage?.para }}
              </p>
            </div>
          </div>
          <p class="text-sm xl:text-lg max-w-lg break-words">
            {{ currentMessage?.mensagem }}
          </p>
        </div>
      </v-col>
    </v-row>
  </Card>

  <div v-if="!currentMessage">
    <img
      src="@/assets/QR.jpeg"
      alt="QR_CODE"
      :class="[currentMessage ? 'w-32 h-32' : 'w-64 h-64']"
    />
  </div>
</template>
