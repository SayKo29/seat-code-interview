import { create } from 'zustand';
import { User, CreateUserPayload, UpdateUserPayload } from '../types';

interface UserState {
  // Estado
  users: User[];
  isLoading: boolean;
  error: Error | null;
  
  // Acciones
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: number, userData: UpdateUserPayload) => void;
  removeUser: (id: number) => void;
  
  // Estado de carga
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Estado inicial
  users: [],
  isLoading: false,
  error: null,
  
  // Setters
  setUsers: (users) => set({ users }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Acciones CRUD
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  
  updateUser: (id, userData) => set((state) => ({
    users: state.users.map((user) => 
      user.id === id 
        ? { ...user, ...userData }
        : user
    )
  })),
  
  removeUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id)
  })),
})); 