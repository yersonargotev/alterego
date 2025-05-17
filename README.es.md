# AlterEgo

## 🧑‍💻 Descripción del proyecto

AlterEgo es una aplicación web diseñada para ayudar a los usuarios a descubrir alternativas basadas en Rust para sus herramientas y bibliotecas de software favoritas. Aborda la creciente necesidad de aplicaciones de alto rendimiento y seguras en cuanto a memoria mediante la curación de una colección de proyectos de Rust. Los usuarios pueden explorar información detallada de los proyectos, incluyendo características, licencias y compatibilidad con plataformas. El objetivo principal es proporcionar una plataforma centralizada para explorar el ecosistema de Rust y encontrar reemplazos adecuados para las herramientas existentes, promoviendo así la adopción de Rust.

## 🔐 Uso de Clerk

Clerk se integra en AlterEgo para una robusta autenticación de usuarios y gestión de sesiones. Maneja los procesos de inicio de sesión y registro, permitiendo a los usuarios crear cuentas y acceder de forma segura a la plataforma. El middleware de Clerk se utiliza para proteger rutas y gestionar las sesiones de los usuarios en toda la aplicación. La integración simplifica la gestión de usuarios al aprovechar los componentes de interfaz de usuario preconstruidos de Clerk para los flujos de autenticación, garantizando una experiencia fluida y segura para los usuarios.

## 🚀 Demo

[https://alternego.vercel.app/](https://alternego.vercel.app/)

## 📸 Capturas de Pantalla

![Captura 1](./public/images/screenshot-1.png)

## 🔍 Funcionalidades

- 🔍 **Explora Alternativas en Rust:** Encuentra reemplazos basados en Rust para herramientas y librerías populares.
- 📝 **Información y Características del Proyecto:** Tarjetas detalladas de proyectos con licencia, plataformas y características clave.
- 📰 **Blog/Contenido:** Sistema dinámico de blog/contenido impulsado por directorios locales y datos JSON.
- 🦾 **Autenticación:** Integrado con Clerk para el inicio de sesión de usuarios.
- 🎨 **UI/UX:** Construido con Shadcn UI, Radix, Tailwind CSS y Sonner para notificaciones.
- ⚡ **Rendimiento:** Utiliza App Router de Next.js, React Server Components y carga optimizada de imágenes.

## 🛠 Stack Tecnológico

- [Next.js](https://nextjs.org/) (App Router, SSR, RSC)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) para notificaciones
- [Clerk](https://clerk.com/) para autenticación
- [pnpm](https://pnpm.io/) para gestión de paquetes

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js v18+
- pnpm

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```
Visita [http://localhost:3000](http://localhost:3000)

### Build

```bash
pnpm build
```

### Lint & Formato

```bash
pnpm lint
pnpm format
```

## 🤝 Contribuir

1. Haz un fork y crea una rama de funcionalidad.
2. Usa TypeScript, componentes funcionales y Tailwind CSS.
3. Sigue el estilo y convenciones de código (ver `/src/types` y `/src/components`).
4. Ejecuta lint y format antes de enviar un PR.

## 📄 Licencia

MIT
