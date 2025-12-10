import { supabase } from "./supabase.auth";

// Iniciar sesión con correo y contraseña
// Esta función se comunica con Supabase para autenticar al usuario.
// Si las credenciales son correctas, devuelve los datos de la sesión.
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}


// Registrar un nuevo usuario
// Crea una nueva cuenta en Supabase Authentication.
// Por defecto, Supabase puede enviar un correo de confirmación.
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};

// Cerrar sesión
// Finaliza la sesión actual en Supabase y limpia el almacenamiento local del navegador.
export const signOut = async () => {
  await supabase.auth.signOut();
};
