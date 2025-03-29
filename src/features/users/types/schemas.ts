import { z } from "zod";

/**
 * Schema for user validation
 */
export const UserSchema = z.object({
  id: z.union([
    z.number(),
    z.string().transform(val => Number(val))
  ]),
  email: z.string().email({
    message: "El correo electrónico no es válido",
  }),
  first_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  last_name: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres",
  }),
  avatar: z.string().url({
    message: "La URL del avatar no es válida",
  }),
});

/**
 * Schema for creating a user
 */
export const CreateUserSchema = UserSchema.omit({ id: true, avatar: true });

/**
 * Schema for updating a user (all optional fields)
 */
export const UpdateUserSchema = CreateUserSchema.partial();

/**
 * Schema for the users API response
 */
export const UsersResponseSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  data: z.array(UserSchema),
});

// Inferred types from the schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>; 