
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStorage = create(
  // 'persist' es un middleware de Zustand que guarda el estado en localStorage automáticamente.
  // Esto permite que el usuario no pierda la sesión al recargar la página.
  persist(
    (set, get) => ({
      user: null, // Estado inicial del usuario (null = no logueado)

      // Acción para guardar el usuario en el estado global
      // Además, verifica si el email corresponde al administrador para asignar el rol 'isAdmin'.
      setUser: (user) =>
        set({
          user: {
            ...user,
            isAdmin: user.email === "jordii.s@hotmail.com",
          },
        }),

      // Acción simple para limpiar el usuario del estado
      removeUser: () => set({ user: null }),

      // Acción completa de reset (Logout forzado)
      // 1. Limpia el estado de Zustand.
      // 2. Borra manualmente la key 'user-storage' del localStorage.
      // 3. Redirige al login y recarga la página para asegurar limpieza total.
      reset: async () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
        window.location.href = "/signin";
      },

    }),
    {
      name: "user-storage", // Nombre de la key en localStorage
      partialize: (s) => ({ user: s.user }), // Solo persistimos la parte 'user' del estado
    }
  )
);

export { useUserStorage };


