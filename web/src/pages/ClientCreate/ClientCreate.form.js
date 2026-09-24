const optionalNumber = {
  setValueAs: (value) => (value === "" ? undefined : Number(value)),
};

const formConfig = {
  defaultValues: {
    firstName: "",
    lastName: "",
    birthDate: "",
    height: "",
    weight: "",
    bodyFat: "",
    muscleMass: "",
    objectives: "",
    pathologies: [{ value: "" }],
    limitations: "",
    hasEatingDisorder: false,
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
  },

  rules: {
    firstName: {
      validate: (value) => value.trim().length > 0 || "Le prénom est obligatoire.",
    },
    lastName: {
      validate: (value) => value.trim().length > 0 || "Le nom est obligatoire.",
    },
    birthDate: {
      required: "La date de naissance est obligatoire.",
    },
    height: {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      required: "La taille est obligatoire.",
      min: {
        value: 1,
        message: "La taille doit être supérieure ou égale à 1 cm.",
      },
      validate: (value) => Number.isInteger(value) || "La taille doit être un nombre entier.",
    },
    weight: {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      required: "Le poids est obligatoire.",
      min: {
        value: 1,
        message: "Le poids doit être supérieur ou égal à 1 kg.",
      },
    },
    bodyFat: {
      ...optionalNumber,
      min: {
        value: 0,
        message: "La masse grasse ne peut pas être négative.",
      },
      max: {
        value: 100,
        message: "La masse grasse ne peut pas dépasser 100 %.",
      },
    },
    muscleMass: {
      ...optionalNumber,
      min: {
        value: 0,
        message: "La masse musculaire ne peut pas être négative.",
      },
    },
  },
};

export default formConfig;
