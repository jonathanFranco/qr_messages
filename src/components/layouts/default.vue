<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";

const router = useRouter();
const routeName = ref("");

const theme = useTheme();

watch(router?.currentRoute, (val) => (routeName.value = String(val.name)));

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  theme.global.name.value = savedTheme;
  routeName.value = String(router.currentRoute?.value?.name) ?? "";
});
</script>
<template>
  <v-app>
    <v-main>
      <section
        class="custom-bg h-full xl:h-screen flex justify-center items-center p-3"
      >
        <slot />
      </section>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.custom-bg {
  background: url(../../assets/bg.jpg);
  background-size: cover;
  background-position: center;
}
</style>
