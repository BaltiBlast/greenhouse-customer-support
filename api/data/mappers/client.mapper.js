import CoreMapper from "./core.mapper.js";
import clientSchema from "../schemas/client.schema.js";

class Client extends CoreMapper {
  constructor(mongoose) {
    super(mongoose);

    this.model =
      this.mongoose.models.Client ||
      this.mongoose.model("Client", clientSchema, "clients");
  }

  createClient(clientData) {
    return this.model.create(clientData);
  }
}

export default Client;
