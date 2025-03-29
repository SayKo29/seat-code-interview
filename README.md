# Gestión de Usuarios - Frontend Challenge

Aplicación de gestión de usuarios que permite visualizar, buscar, ordenar, crear, editar y eliminar usuarios, con soporte para múltiples idiomas.
Hecho para Seat Code con mucho :sparkling_heart:

## Tecnologías utilizadas

- **React** + **TypeScript** + **Vite** - Framework y herramientas base
- **TailwindCSS** - Framework CSS para estilos
- **Shadcn/UI** - Componentes estilizados basados en Radix UI
- **TanStack React Query** - Gestión de estado del servidor y caché
- **TanStack React Table** - Gestión avanzada de tablas
- **i18next** - Internacionalización
- **Bun** - Runtime y gestor de paquetes

## Requisitos del proyecto

✅ API pública ([reqres.in](https://reqres.in/))
✅ Cliente React con TypeScript
✅ Operaciones CRUD (Create, Read, Update, Delete)
✅ Gestor de estado (React Query)
✅ Tabla de datos con:
  - Búsqueda por cualquier campo
  - Ordenación por campos
  - Operaciones CRUD con UX/UI intuitiva
  - Vista detalle de elementos seleccionados
✅ Diseño responsivo
✅ Arquitectura CLEAN y principios SOLID
✅ Internacionalización (español e inglés)

## Instalación y despliegue

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd seat-code
   ```

2. **Instalar dependencias**
   ```bash
   bun install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   bun dev
   ```

4. **Generar versión de producción**
   ```bash
   bun run build
   ```

## Estructura del proyecto

```
src/
├── assets/        # Archivos estáticos
├── components/    # Componentes reutilizables
│   └── ui/        # Componentes UI genéricos
├── features/      # Organización por características
│   └── users/     # Módulo de usuarios
├── hooks/         # Hooks personalizados
├── lib/           # Configuraciones y utilidades
├── pages/         # Componentes de página
├── services/      # Servicios para APIs
└── utils/         # Funciones utilitarias
```

## Características implementadas

- **Gestión completa de usuarios**: Listar, buscar, crear, editar y eliminar
- **Tabla de datos avanzada**: Ordenación, paginación y búsqueda
- **Soporte multiidioma**: Español e inglés con detección automática
- **Diseño responsivo**: Adaptable a diferentes dispositivos
- **Arquitectura modular**: Basada en características (feature-based)
- **UX/UI intuitiva**: Formularios validados y notificaciones
