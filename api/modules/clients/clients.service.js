import { ClientMapper } from "../../data/mappers/index.mapper.js";

export function createClient(clientData) {
  const {
    height,
    weight,
    bodyFat,
    muscleMass,
    emergencyContactName,
    emergencyContactRelationship,
    emergencyContactPhone,
    ...clientInformation
  } = clientData;
  const hasEmergencyContact =
    emergencyContactName ||
    emergencyContactRelationship ||
    emergencyContactPhone;
  const clientToCreate = {
    ...clientInformation,
    birthDate: new Date(clientData.birthDate),
    measurements: [
      {
        height,
        weight,
        bodyFat,
        muscleMass,
      },
    ],
    ...(hasEmergencyContact
      ? {
          emergencyContact: {
            name: emergencyContactName,
            relationship: emergencyContactRelationship,
            phone: emergencyContactPhone,
          },
        }
      : {}),
  };

  return ClientMapper.createClient(clientToCreate);
}
