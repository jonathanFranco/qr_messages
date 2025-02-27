<template>
  <section class="h-screen flex justify-center items-center bg-purple-800">
    <LottieAnimation :animationData="LoaderJSON" :height="200" :width="200" />
  </section>
</template>

<script lang="ts" setup>
import LoaderJSON from "@/assets/lottie/loader.json";
</script>
