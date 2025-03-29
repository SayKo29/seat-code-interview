import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/userService";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: UserService.fetchUsers,
  });

  const createMutation = useMutation({
    mutationFn: UserService.createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: { first_name: string; last_name: string; email: string } }) =>
      UserService.updateUser(id, user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return { users, isLoading, error, createMutation, updateMutation, deleteMutation };
};
