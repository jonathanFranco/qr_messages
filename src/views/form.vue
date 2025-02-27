<script lang="ts" setup>
import SuccessJSON from "@/assets/lottie/success.json";
import { useWebSocketStore, type IPayload } from "@/stores/socket";
import { getError } from "@/utils/generics";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { onMounted, onUnmounted, ref } from "vue";

const storeSocket = useWebSocketStore;
const loader = ref(false);
const state = ref("FORM" as "FORM" | "SUCCESS");
const form = ref({} as IPayload);
const rules = {
  nome: {
    required: helpers.withMessage("Campo obrigatório", required),
    maxLength: helpers.withMessage("Limite Ultrapassado", maxLength(25)),
  },
  para: {
    required: helpers.withMessage("Campo obrigatório", required),
    maxLength: helpers.withMessage("Limite Ultrapassado", maxLength(25)),
  },
  mensagem: {
    required: helpers.withMessage("Campo obrigatório", required),
    maxLength: helpers.withMessage("Limite Ultrapassado", maxLength(100)),
  },
};

const v$ = useVuelidate<IPayload>(rules, form);

const submit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;
  loader.value = true;
  setTimeout(() => {
    storeSocket
      .send(form.value)
      .then(() => {
        state.value = "SUCCESS";
      })
      .finally(() => {
        loader.value = false;
      });
  }, 800);
};

onMounted(() => storeSocket.connect());
onUnmounted(() => storeSocket.close());
</script>

<template>
  <Card>
    <form
      v-if="state === 'FORM'"
      @submit.prevent="submit"
      class="flex flex-col gap-5"
    >
      <h1 class="text-lg md:text-xl text-primary">
        <v-icon class="mr-2">mdi-message-reply-text</v-icon>
        {{ "Escreva sua mensagem" }}
      </h1>
      <div class="flex flex-col gap-4">
        <v-text-field
          id="nome"
          v-model="form.nome"
          label="De:"
          :error-messages="getError(v$, 'nome')"
          counter="25"
        />
        <v-text-field
          id="para"
          v-model="form.para"
          label="Para:"
          :error-messages="getError(v$, 'para')"
          counter="25"
        />
        <v-textarea
          id="mensagem"
          v-model="form.mensagem"
          label="Digite sua mensagem aqui..."
          :error-messages="getError(v$, 'mensagem')"
          counter="100"
          no-resize
        />
      </div>
      <div class="flex justify-end">
        <v-btn
          color="primary"
          type="submit"
          class="w-full xl:w-fit"
          size="x-large"
          :loading="loader"
        >
          {{ "Enviar" }}
        </v-btn>
      </div>
    </form>

    <div
      id="success"
      class="flex flex-col items-center justify-center text-3xl md:text-4xl text-success"
      v-else
    >
      <LottieAnimation
        :animationData="SuccessJSON"
        :height="300"
        :width="300"
      />

      <h1 class="font-bold">
        {{ "Mensagem enviada!" }}
      </h1>
    </div>
  </Card>
</template>
