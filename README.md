# Seat Code Challenge

## Descripción

Aplicación de gestión de usuarios que permite crear, leer, actualizar y eliminar usuarios.

## Características

- ✅ Gestión de usuarios (CRUD)
- ✅ Validación de formularios
- ✅ Internacionalización (i18n)
- ✅ Tema claro/oscuro
- ✅ Diseño responsive
- ✅ Pruebas unitarias con Vitest
- ✅ Pruebas end-to-end con Cypress

## Tecnologías

- React 19
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- i18next
- Vitest
- Cypress

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Pruebas

### Pruebas Unitarias (Vitest)

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas unitarias con UI
npm run test:ui

# Ejecutar pruebas unitarias y generar informe de cobertura
npm run test:coverage
```

### Pruebas End-to-End (Cypress)

```bash
# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar pruebas e2e en modo headless
npm run cypress:run

# Ejecutar solo pruebas e2e
npm run test:e2e
```

## Estructura del Proyecto

```
src/
  ├── components/      # Componentes reutilizables
  ├── features/        # Características organizadas por dominio
  ├── hooks/           # Hooks personalizados
  ├── lib/             # Bibliotecas y configuraciones
  ├── store/           # Estado global
  ├── utils/           # Utilidades
  ├── App.tsx          # Componente principal
  └── main.tsx         # Punto de entrada
```

## Licencia

MIT
