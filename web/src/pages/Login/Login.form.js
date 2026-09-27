const formConfig = {
  defaultValues: {
    email: "",
    password: "",
  },
  rules: {
    email: {
      required: "L'adresse email est obligatoire.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Saisissez une adresse email valide.",
      },
    },
    password: {
      required: "Le mot de passe est obligatoire.",
    },
  },
};

export default formConfig;
