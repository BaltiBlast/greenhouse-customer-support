const utils = {
  getFormValues: (client) => {
    const latestMeasurement = client.measurements.at(-1);

    return {
      firstName: client.firstName,
      lastName: client.lastName,
      birthDate: client.birthDate.slice(0, 10),
      height: latestMeasurement.height,
      weight: latestMeasurement.weight,
      bodyFat: latestMeasurement.bodyFat ?? "",
      muscleMass: latestMeasurement.muscleMass ?? "",
      objectives: client.objectives ?? "",
      pathologies: client.pathologies.length
        ? client.pathologies.map((value) => ({ value }))
        : [{ value: "" }],
      limitations: client.limitations ?? "",
      hasEatingDisorder: client.hasEatingDisorder,
      emergencyContactName: client.emergencyContact?.name ?? "",
      emergencyContactRelationship: client.emergencyContact?.relationship ?? "",
      emergencyContactPhone: client.emergencyContact?.phone ?? "",
    };
  },

  getUpdatedClient: (client, data) => {
    const emergencyContactValues = [
      data.emergencyContactName,
      data.emergencyContactRelationship,
      data.emergencyContactPhone,
    ];
    const hasEmergencyContact = emergencyContactValues.some((value) => value.trim());

    return {
      ...client,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      birthDate: data.birthDate,
      objectives: data.objectives.trim() || undefined,
      pathologies: data.pathologies.map(({ value }) => value.trim()).filter(Boolean),
      limitations: data.limitations.trim() || undefined,
      hasEatingDisorder: data.hasEatingDisorder,
      emergencyContact: hasEmergencyContact
        ? {
            name: data.emergencyContactName.trim(),
            relationship: data.emergencyContactRelationship.trim(),
            phone: data.emergencyContactPhone.trim(),
          }
        : undefined,
      measurements: client.measurements.map((measurement, index) =>
        index === client.measurements.length - 1
          ? {
              ...measurement,
              height: data.height,
              weight: data.weight,
              bodyFat: data.bodyFat,
              muscleMass: data.muscleMass,
            }
          : measurement,
      ),
    };
  },

  formatMeasurementDate: (date) =>
    new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(date)),
};

export default utils;
