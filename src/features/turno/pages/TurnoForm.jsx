import React, { useEffect, useState } from "react";
import { useUserStorage } from "../../../stores/useUserStorage";
import {
  crearTurno,
  obtenerTurnosUsuario,
  obtenerHorasOcupadas,
  turnoOcupado,
  cancelarTurno,
} from "../services/TurnoService";
import { useNavigate } from "react-router-dom";

export default function TurnoForm() {
  const { user } = useUserStorage();
  const navigate = useNavigate();

  const [turnos, setTurnos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: user?.email || "",
  });

  const [mensaje, setMensaje] = useState("");
  const [step, setStep] = useState(1);
  const [area, setArea] = useState("");

  const AREAS = [
    { id: "civil", label: "Derecho Civil", desc: "Contratos, daños, sucesiones" },
    { id: "penal", label: "Derecho Penal", desc: "Defensas, denuncias, querellas" },
    { id: "laboral", label: "Derecho Laboral", desc: "Despidos, trabajo en negro, ART" },
    { id: "familia", label: "Derecho de Familia", desc: "Divorcios, alimentos, tenencia" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const cargarTurnos = async () => {
      const data = await obtenerTurnosUsuario(user.email);
      setTurnos(data);
    };

    cargarTurnos();
  }, [user, navigate]);

  const manejarCambioFecha = async (e) => {
    const nuevaFecha = e.target.value;
    setFecha(nuevaFecha);
    setHora("");

    const horasOcupadas = await obtenerHorasOcupadas(nuevaFecha);
    const todasLasHoras = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
    const disponibles = todasLasHoras.filter((h) => !horasOcupadas.includes(h));
    setHorasDisponibles(disponibles);
  };

  const manejarInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const pedirTurno = async (e) => {
    e.preventDefault();
    setMensaje("");

    const campos = [fecha, hora, formData.nombre, formData.apellido, formData.email, formData.telefono];
    if (campos.some((campo) => campo.trim() === "")) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    const ocupado = await turnoOcupado(fecha, hora);
    if (ocupado) {
      setMensaje("Ese turno ya fue reservado. Elegí otro.");
      return;
    }

    const { error } = await crearTurno({
      fecha,
      hora,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      userId: user.id,
      area,
    });

    if (error) {
      console.error("Error al pedir turno:", error.message);
      setMensaje("Hubo un error al guardar el turno.");
    } else {
      setMensaje("Turno reservado correctamente.");
      setFormData({ nombre: "", apellido: "", telefono: "", email: user.email });
      setFecha("");
      setHora("");
      setArea("");
      setStep(1);
      const nuevosTurnos = await obtenerTurnosUsuario(user.email);
      setTurnos(nuevosTurnos);
    }
  };


  const manejarCancelar = async (turnoId) => {
    console.log("Intentando borrar turno con id:", turnoId);
    setMensaje("");
    try {
      const { error } = await cancelarTurno(turnoId);
      if (error) {
        console.error("Error al cancelar turno:", error.message);
        setMensaje("Error al cancelar el turno.");
        return;
      }
      // Actualizar listado de turnos luego de borrar
      const nuevosTurnos = await obtenerTurnosUsuario(user.email);
      setTurnos(nuevosTurnos);
      setMensaje("Turno cancelado correctamente.");
    } catch (e) {
      console.error("Error inesperado al cancelar turno:", e);
      setMensaje("Error inesperado al cancelar turno.");
    }
  };


  const hoy = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Reservar turno</h2>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AREAS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setArea(a.label);
                setStep(2);
              }}
              className="border p-6 rounded-lg hover:bg-gray-50 transition text-left shadow-sm"
            >
              <h3 className="font-bold text-lg text-red-900">{a.label}</h3>
              <p className="text-sm text-gray-600">{a.desc}</p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={pedirTurno} className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Área: {area}</span>
            <button type="button" onClick={() => setStep(1)} className="text-sm text-blue-600 underline">Cambiar</button>
          </div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={manejarInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={manejarInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={manejarInput}
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={manejarInput}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="fecha"
            value={fecha}
            onChange={manejarCambioFecha}
            min={hoy}
            className="w-full border p-2 rounded"
          />

          <select
            name="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccioná una hora</option>
            {horasDisponibles.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
          >
            Confirmar turno
          </button>
        </form>
      )}

      {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}

      <hr className="my-6" />
      <h3 className="text-lg font-semibold mb-2">Mis turnos</h3>

      {turnos.length === 0 ? (
        <p>No tenés turnos reservados.</p>
      ) : (
        <ul className="space-y-2">
          {turnos.map((turno) => (
            <li
              key={turno.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <strong>{turno.fecha}</strong> - {turno.hora} hs
                <br />
                <span className="text-sm text-gray-600 font-medium">{turno.area || "Consulta General"}</span>
                <br />
                {turno.nombre} {turno.apellido} - {turno.telefono}
              </div>
              <button
                onClick={() => manejarCancelar(turno.id)}
                className="text-red-600 hover:underline"
              >
                Cancelar
              </button>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
}
