import { 
  User, 
  CreateUserPayload, 
  UpdateUserPayload, 
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UsersResponseSchema 
} from "../types";

const API_URL = "https://reqres.in/api/users";

// Counter for local user IDs (since the test API doesn't actually maintain data)
let nextUserId = 100; // Starting with IDs different from the API

/**
 * Service for managing operations related to users
 */
export class UserService {
  /**
   * Gets the list of users from the API
   * @returns Promise with user data
   */
  static async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener los usuarios");
      const rawData = await response.json();
      
      // Validate data with Zod
      const result = UsersResponseSchema.safeParse(rawData);
      if (!result.success) {
        console.error("Validation error:", result.error);
        throw new Error("Invalid response format");
      }
      
      return result.data.data;
    } catch (error) {
      console.error("Error en el servicio fetchUsers:", error);
      throw error;
    }
  }

  /**
   * Creates a new user in the API
   * @param userInput User data to create
   * @returns Promise with the created user
   */
  static async createUser(userInput: CreateUserPayload): Promise<User> {
    try {
      // Validate input data
      const result = CreateUserSchema.safeParse(userInput);
      if (!result.success) {
        throw new Error(`Invalid data: ${result.error.message}`);
      }
      
      const validatedData = result.data;
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) throw new Error("Error al crear el usuario");
      
      try {
        const responseData = await response.json();
        
        // Assign a default avatar if the API doesn't return one
        if (!responseData.avatar) {
          responseData.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${responseData.first_name} ${responseData.last_name}`
          )}&background=random`;
        }
        
        // Generate a persistent local ID or convert the existing one to a number
        if (!responseData.id) {
          responseData.id = nextUserId++;
        } else if (typeof responseData.id === 'string') {
          // Explicitly convert the ID to a number if it comes as a string
          responseData.id = Number(responseData.id);
        }
        
        // Validate with the schema
        return UserSchema.parse(responseData);
      } catch (validationError) {
        console.error("Error al validar datos del usuario creado:", validationError);
        
        // If validation fails, create a user object with a local ID
        const fallbackUser = {
          ...userInput,
          id: nextUserId++,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${userInput.first_name} ${userInput.last_name}`
          )}&background=random`
        };
        
        return fallbackUser as User;
      }
    } catch (error) {
      console.error("Error en el servicio createUser:", error);
      throw error;
    }
  }

  /**
   * Updates an existing user
   * @param id ID of the user to update
   * @param userInput Partial user data to update
   * @returns Promise with the updated user
   */
  static async updateUser(id: number, userInput: UpdateUserPayload): Promise<User> {
    try {
      // Validate input data
      const result = UpdateUserSchema.safeParse(userInput);
      if (!result.success) {
        throw new Error(`Invalid data: ${result.error.message}`);
      }
      
      const validatedData = result.data;
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) throw new Error("Error al actualizar el usuario");
      
      const responseData = await response.json();
      
      // Ensure the ID is correct (the test API may return another one)
      responseData.id = id;
      
      // Assign an avatar if it doesn't have one
      if (!responseData.avatar && userInput.first_name && userInput.last_name) {
        responseData.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${userInput.first_name} ${userInput.last_name}`
        )}&background=random`;
      }
      
      return UserSchema.parse(responseData);
    } catch (error) {
      console.error("Error en el servicio updateUser:", error);
      throw error;
    }
  }

  /**
   * Deletes an existing user
   * @param id ID of the user to delete
   * @returns Promise with the ID of the deleted user
   */
  static async deleteUser(id: number): Promise<number> {
    try {
      // Validate that the ID is a number
      if (typeof id !== 'number' || isNaN(id) || id <= 0) {
        throw new Error("Invalid user ID");
      }
      
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el usuario");
      return id;
    } catch (error) {
      console.error("Error en el servicio deleteUser:", error);
      throw error;
    }
  }
} 