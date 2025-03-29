# Seat Code Challenge

Aplicación de gestión de usuarios creada con React, TypeScript y Vite.

## 🚀 Características

- ✅ Listado de usuarios con paginación
- ✅ Vista detallada de usuario
- ✅ Creación de usuarios
- ✅ Edición de usuarios
- ✅ Eliminación de usuarios
- ✅ Soporte para múltiples idiomas (ES/EN)
- ✅ Modo oscuro/claro

## 🛠️ Tecnologías

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.ski/)

## 📁 Estructura del proyecto

```
src/
├── assets/              # Recursos estáticos (imágenes, fuentes)
├── components/          # Componentes compartidos
│   └── ui/              # Componentes de UI reutilizables
├── contexts/            # Contextos de React
├── features/            # Características organizadas por dominio
│   └── users/           # Todo lo relacionado con usuarios
│       ├── api/         # Servicios API específicos de usuarios
│       ├── components/  # Componentes específicos de usuarios
│       ├── hooks/       # Hooks específicos de usuarios
│       └── types/       # Tipos y esquemas de validación
├── hooks/               # Hooks compartidos
├── lib/                 # Utilidades y configuraciones
├── pages/               # Páginas/rutas de la aplicación
├── services/            # Servicios compartidos
├── types/               # Tipos globales
└── utils/               # Utilidades generales
```

## 🧩 Patrones implementados

- **Arquitectura orientada a características (FOA)**: Organización por dominio
- **Custom hooks**: Lógica de negocio encapsulada
- **Context API**: Gestión de estado global
- **Suspense/Error boundaries**: Gestión robusta de carga/errores

## 🏗️ Escalabilidad

- **Estructuración clara**: Organización por dominio para facilitar búsqueda
- **Tipado estricto**: Todo está tipado para reducir errores
- **Validación en tiempo de ejecución**: Zod para validar datos
- **Separación de responsabilidades**: Cada módulo tiene un propósito claro
- **Inversión de dependencias**: Dependencias parametrizadas para facilitar testing

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SayKo29/seat-code-interview

# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev

# Compilar para producción
bun run build
```
