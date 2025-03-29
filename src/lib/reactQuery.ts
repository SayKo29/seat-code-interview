import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos antes de considerar datos "viejos"
      cacheTime: 10 * 60 * 1000, // 10 minutos en caché
      refetchOnWindowFocus: false, // No recargar datos al volver a la ventana
    },
  },
});
