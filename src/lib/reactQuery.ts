import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes before considering data "old"
      gcTime: 10 * 60 * 1000, // 10 minutes of cache
      refetchOnWindowFocus: false, // Don´t reload when return to window
    },
  },
});
