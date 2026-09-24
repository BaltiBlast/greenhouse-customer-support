import { createClient } from "./clients.service.js";
import { createClientValidationSchema } from "./clients.validation.js";

export async function createClientController(req, res, next) {
  const validationResult = createClientValidationSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Les données du client sont invalides.",
      errors: validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const client = await createClient(validationResult.data);
    return res.status(201).json({ id: client.id });
  } catch (error) {
    return next(error);
  }
}
