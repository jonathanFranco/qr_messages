import { helpers, required } from "@vuelidate/validators";

export class TemplateSchema {
  rules = {
    type: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    name: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    html: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
  };
}
