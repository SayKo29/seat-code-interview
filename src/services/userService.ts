const API_URL = "https://reqres.in/api/users";

export class UserService {
  static async fetchUsers() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    const data = await response.json();
    return data.data;
  }

  static async createUser(user: { first_name: string; last_name: string; email: string }) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Error al crear el usuario");
    return response.json();
  }

  static async updateUser(id: number, user: { first_name: string; last_name: string; email: string }) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Error al actualizar el usuario");
    return response.json();
  }

  static async deleteUser(id: number) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
    return id;
  }
}