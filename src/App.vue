<script lang="ts" setup>
import { onMounted, ref } from "vue";

const hasSideBar = ref(true);
const loader = ref(true);

onMounted(() => {
  setTimeout(() => (loader.value = false), 3000);
});
</script>

<template>
  <Loader v-if="loader" />

  <Default v-else-if="hasSideBar">
    <router-view />
  </Default>

  <router-view v-else />

  <Toast />
</template>
