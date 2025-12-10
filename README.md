# Lawyer App - Gestión de Turnos

Aplicación web para solicitar y gestionar turnos para un estudio jurídico. Incluye autenticación de usuarios, historial de turnos, validación de disponibilidad, y una interfaz moderna con React + TailwindCSS + Supabase.

---

## 👥 Desarrollador

* **Javier Niz**

---

## 🚀 Requisitos

* Node.js (v18 o superior)
* npm o yarn

---

## 🔮 Tecnologías

* **React + Vite**
* **TailwindCSS**
* **Supabase** (Auth + DB)
* **Zustand** (manejo de usuario local)
* **Netlify** (despliegue)

---

## 🚪 Levantar el entorno local

1. **Clonar el repositorio:**

```bash
git clone https://github.com/javierNiz11/AppRegistrosDeTurnos.git
cd AppRegistrosDeTurnos
```

2. **Instalar dependencias:**

```bash
npm install
# o
yarn install
```

3. **Crear el archivo `.env` en la raíz del proyecto:**

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJOi...
```

4. **Levantar la app localmente:**

```bash
npm run dev
```

> La aplicación estará disponible en `http://localhost:5173`

---

## 🌐 Despliegue

La app se encuentra desplegada en **Netlify**.

---

## ✅ Funcionalidades principales

* **Registro e inicio de sesión** (Supabase Auth)
* **Solicitud de turnos** con validación de disponibilidad
* **Selección de Área** (Civil, Penal, Laboral, etc.)
* **Cancelación de turnos**
* **Historial de turnos** por usuario
* **Protección de rutas**
* **Animaciones y diseño responsive**
* **PWA**: sugerencia de instalación

---

## 📊 Base de datos (Supabase)

### Tabla: `turnos`

| Campo    | Tipo |
| -------- | ---- |
| id       | UUID |
| fecha    | date |
| hora     | text |
| nombre   | text |
| apellido | text |
| telefono | text |
| email    | text |
| user_id  | uuid |
| area     | text |

### Políticas:

* Usuarios solo pueden ver sus propios turnos
* Usuarios pueden cancelar sus turnos
* Cualquier usuario puede insertar un nuevo turno

---


