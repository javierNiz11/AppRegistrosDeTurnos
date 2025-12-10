import "./App.css";
import Router from "./Router";
import NavBar from "../components/NavBar/NavBar";
import { useEffect } from "react";
import { supabase } from "../auth/supabase.auth";
import { useUserStorage } from "../stores/useUserStorage";

const App = () => {
  const setUser = useUserStorage((state) => state.setUser);
  const reset = useUserStorage((state) => state.reset);

  useEffect(() => {
    // Función para recuperar la sesión si el usuario recarga la página
    const cargarSesionActual = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user;
      if (sessionUser) {
        // Si hay sesión activa, guardamos el usuario en el estado global
        setUser(sessionUser);
      }
    };

    // Listener de Supabase que detecta cambios en la autenticación en tiempo real
    // (ej. inicio de sesión, cierre de sesión, expiración de token)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Si el usuario inicia sesión
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        }

        // Si el usuario cierra sesión
        if (event === "SIGNED_OUT") {
          reset(); // Limpiamos todo el estado
        }
      }
    );

    // Ejecutamos la carga inicial
    cargarSesionActual();

    // Limpiamos el listener cuando el componente se desmonta
    return () => listener?.subscription?.unsubscribe();
  }, [setUser, reset]);


  return (
    <div className="bg-[#fdf6e3] min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Router />
      </div>
    </div>
  );
};

export default App;

