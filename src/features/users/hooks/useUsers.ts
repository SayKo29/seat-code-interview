import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, CreateUserPayload, UpdateUserPayload } from "../types";
import { UserService } from "../api";
import { useUserStore } from "../store";
import { useEffect, useRef } from "react";

/**
 * Hook for managing CRUD operations on users
 * Integrates React Query for communication with API and Zustand for local state
 * @returns Operations and state for user management
 */
export const useUsers = () => {
  const queryClient = useQueryClient();
  const isInitialMount = useRef(true);
  
  // Global Zustand state
  const { 
    users: storeUsers,
    setUsers,
    addUser,
    updateUser: updateStoreUser,
    removeUser,
    setLoading,
    setError
  } = useUserStore();

  // Query to get all users
  const { 
    data = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: UserService.fetchUsers,
  });
  
  // Syncs API data with the store when loaded
  useEffect(() => {
    // Avoid syncing loading on each render,
    // only do it on the initial mount and when it really changes
    if (isInitialMount.current) {
      setLoading(isLoading);
      isInitialMount.current = false;
      return;
    }
    
    // Syncs users when new data is loaded
    if (data && data.length > 0 && !isLoading) {
      setUsers(data);
    }
    
    // Only update the loading state if there is a real change
    if (useUserStore.getState().isLoading !== isLoading) {
      setLoading(isLoading);
    }
    
    // Only update the error state if there is a real change
    if (error && useUserStore.getState().error !== error) {
      setError(error);
    }
  }, [data, isLoading, error, setUsers, setLoading, setError]);

  // Mutation to create a user
  const createMutation = useMutation<User, Error, CreateUserPayload>({
    mutationFn: UserService.createUser,
    onSuccess: (newUser) => {
      // Update the Zustand store immediately
      addUser(newUser);
      
      // Notify React Query to refresh data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Mutation to update a user
  const updateMutation = useMutation<
    User, 
    Error, 
    { id: number; user: UpdateUserPayload }
  >({
    mutationFn: ({ id, user }) => UserService.updateUser(id, user),
    onSuccess: (updatedUser, { id, user }) => {
      // Update the Zustand store immediately
      updateStoreUser(id, user);
      
      // Notify React Query to refresh data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  // Mutation to delete a user
  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: UserService.deleteUser,
    onSuccess: (deletedId) => {
      // Update the Zustand store immediately
      removeUser(deletedId);
      
      // Notify React Query to refresh data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { 
    // Return the users from the store instead of the query
    users: storeUsers, 
    isLoading, 
    error, 
    refetch, 
    createMutation, 
    updateMutation, 
    deleteMutation 
  };
}; 