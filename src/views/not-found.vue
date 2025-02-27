<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <Card>
    <section
      :class="['flex flex-col justify-center items-center gap-2']"
    >
      <h1 id="title" class="text-8xl font-bold text-primary">{{ "404" }}</h1>

      <h1 id="subtitle" class="text-2xl font-bold text-primary">
        {{ "Página não encontrada" }}
      </h1>

      <p id="description" class="text-lg text-neutral-400">
        {{ "Desculpe, a página que você está procurando não existe." }}
      </p>

      <v-btn
        color="primary"
        class="mt-4"
        prepend-icon="mdi-arrow-left"
        :text="'Voltar'"
        @click="router.push({ name: 'messages' })"
      />
    </section>
  </Card>
</template>
