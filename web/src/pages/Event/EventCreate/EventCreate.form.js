const requiredText = (message) => ({
  validate: (value) => value.trim().length > 0 || message,
});

const formConfig = {
  defaultValues: {
    type: "",
    date: "",
    startTime: "",
    duration: "",
    location: "",
    description: "",
    clientId: "",
    className: "",
  },
  rules: {
    type: { required: "Le type d'événement est obligatoire." },
    date: { required: "La date est obligatoire." },
    startTime: { required: "L'heure de début est obligatoire." },
    duration: {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      required: "La durée est obligatoire.",
      min: {
        value: 1,
        message: "La durée doit être supérieure ou égale à 1 minute.",
      },
      validate: (value) => Number.isInteger(value) || "La durée doit être un nombre entier.",
    },
    location: requiredText("Le lieu est obligatoire."),
    description: requiredText("La description est obligatoire."),
    clientId: { required: "Le client est obligatoire." },
    className: requiredText("Le nom du cours est obligatoire."),
  },
};

export default formConfig;
