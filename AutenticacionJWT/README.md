# Autenticación JWT con Flask y React.js

Este proyecto del bootcamp de 4grrks implementa un sistema completo de **autenticación de usuarios** combinando **Flask (Python)** para el backend y **React.js** para el frontend.  
El flujo de autenticación se maneja con **JSON Web Tokens (JWT)** y el almacenamiento de sesión en el **SessionStorage API** del navegador.

---

## 🚀 Características principales

- **Registro de usuario**: creación de cuenta con email y contraseña.
- **Inicio de sesión**: autenticación contra la base de datos y generación de token JWT.
- **Protección de rutas**: las páginas privadas solo son accesibles si el token es válido.
- **Cierre de sesión**: eliminación del token del SessionStorage y redirección al login.
- **Validación automática**: verificación de sesión activa en cada carga de componente privado.

---

## 🛠️ Tecnologías utilizadas

### Backend (Flask)
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-Bcrypt
- Flask-JWT-Extended
- Flask-CORS
- Python Dotenv (manejo de variables de entorno)

### Frontend (React.js)
- React Router
- SessionStorage API
- Bootstrap 5
- Fetch API para comunicación con el backend

### Base de datos
- SQLite (por defecto)
- PostgreSQL (opcional, configurable vía `.env`)

---
