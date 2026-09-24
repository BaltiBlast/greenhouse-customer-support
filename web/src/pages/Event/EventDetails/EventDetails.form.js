import createEventFormConfig from "../EventCreate/EventCreate.form.js";

const formConfig = {
  defaultValues: { ...createEventFormConfig.defaultValues },
  rules: createEventFormConfig.rules,
};

export default formConfig;
