import { supabase } from "../../../auth/supabase.auth";

// Insertar turno con userId y datos personales en la tabla turnos
// Recibe un objeto con todos los datos del formulario y el ID del usuario.
export async function crearTurno({ fecha, hora, nombre, apellido, telefono, email, userId, area }) {
  // Insertamos una nueva fila en la tabla 'turnos'
  const { data, error } = await supabase.from("turnos").insert([
    { fecha, hora, nombre, apellido, telefono, email, user_id: userId, area }
  ]);
  return { data, error };
}

// Obtener turnos por email
// Filtra los turnos donde la columna 'email' coincida con el email del usuario logueado.
export async function obtenerTurnosUsuario(email) {
  const { data, error } = await supabase
    .from("turnos")
    .select("*") // Seleccionamos todas las columnas
    .eq("email", email) // Filtro: email igual al email del usuario
    .order("fecha", { ascending: true }); // Ordenamos por fecha ascendente

  if (error) {
    console.error("Error al obtener turnos del usuario:", error.message);
    return [];
  }
  return data;
}

// Verificar si un turno ya está ocupado
// Consulta si existe algún registro con la misma fecha y hora.
export async function turnoOcupado(fecha, hora) {
  const { data, error } = await supabase
    .from("turnos")
    .select("id")
    .eq("fecha", fecha)
    .eq("hora", hora)
    .maybeSingle(); // Devuelve un solo registro o null si no existe

  if (error) {
    console.error("Error al verificar turno ocupado:", error.message);
    return false;
  }
  return !!data; // Retorna true si encontró un turno, false si no.
}

// Obtener horas ocupadas para una fecha
// Sirve para deshabilitar horarios en el formulario.
export async function obtenerHorasOcupadas(fecha) {
  const { data, error } = await supabase
    .from("turnos")
    .select("hora") // Solo necesitamos la columna 'hora'
    .eq("fecha", fecha);

  if (error) {
    console.error("Error al obtener horas ocupadas:", error.message);
    return [];
  }
  // Mapeamos el resultado para devolver solo un array de strings (ej: ["10:00", "11:00"])
  return data.map((t) => t.hora);
}

// Cancelar turno por id
// Elimina la fila correspondiente al ID del turno.
export async function cancelarTurno(turnoId) {
  const { data, error } = await supabase
    .from("turnos")
    .delete()
    .eq("id", turnoId);
  if (error) console.error("Supabase error en cancelarTurno:", error.message);
  return { data, error };
}







