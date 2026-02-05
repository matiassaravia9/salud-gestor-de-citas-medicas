# Salud+ Medical Institute - Gestor de Citas

Este proyecto es un sistema integral de gestión de citas médicas con análisis de síntomas impulsado por inteligencia artificial.

## Instrucciones para comenzar

### 1. Instalar dependencias
Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las librerías necesarias:
```bash
npm install
```

### 2. Configurar la Clave de API
Crea un archivo llamado `.env.local` en la raíz del proyecto y añade tu clave de API de Gemini:
```env
API_KEY=tu_clave_de_api_aqui
```
*Nota: El sistema utiliza la variable `API_KEY` por defecto para las peticiones de Inteligencia Artificial.*

### 3. Ejecutar la aplicación
Inicia el servidor de desarrollo con el siguiente comando:
```bash
npm run dev
```

## Estructura de Usuarios (Simulada)
- **Paciente**: Usuario: `paciente` | Contraseña: `paciente123`
- **Administrador**: Usuario: `admin` | Contraseña: `admin123`

## Características principales
- **Asistente IA**: Recomendación de especialidades basada en síntomas.
- **Reserva Inteligente**: Selección de fechas según disponibilidad real por especialidad.
- **Gestión de Citas**: Sistema completo de edición y cancelación con advertencias de seguridad.
- **Panel Administrativo**: Visualización de métricas y gestión de base de datos de citas.
