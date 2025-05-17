# AlterEgo

## 🧑‍💻 Descripción del Proyecto

AlterEgo es una plataforma web construida con Next.js 15 y TypeScript que permite a los usuarios gestionar identidades digitales de forma segura y flexible. El objetivo principal es ofrecer una experiencia moderna para la autenticación, personalización de perfiles y gestión de contenido, siguiendo las mejores prácticas de usabilidad y seguridad.
La aplicación utiliza una arquitectura modular y componentes reutilizables, aprovechando Radix UI y Shadcn UI para una interfaz accesible y responsiva. El contenido dinámico se gestiona mediante MDX, permitiendo a usuarios y administradores crear y visualizar documentos enriquecidos. La experiencia de usuario y el rendimiento se priorizan optimizando los Web Vitals y utilizando renderizado híbrido de Next.js (SSR y RSC).

Características clave:

- Registro e inicio de sesión seguro con Clerk
- Gestión de perfil de usuario y preferencias
- Visualización y edición de contenido enriquecido (MDX)
- Interfaz moderna, accesible y mobile-first
- Notificaciones y feedback en tiempo real con Sonner

## 🔐 Uso de Clerk

Clerk está integrado como el principal proveedor de autenticación y gestión de usuarios en AlterEgo. Se utiliza el SDK oficial de Clerk para Next.js, aprovechando tanto los componentes de UI como los hooks/helpers para proteger rutas y personalizar la experiencia del usuario.

Implementaciones clave de Clerk en el proyecto:

- Autenticación de usuarios:
Los componentes <SignIn />, <SignUp /> y <UserButton /> de Clerk gestionan los flujos de inicio de sesión, registro y manejo de sesión.

- Protección de rutas:
El middleware de Next.js (src/middleware.ts) utiliza Clerk para restringir el acceso a rutas privadas, asegurando que solo los usuarios autenticados puedan acceder a ciertas páginas o recursos.

- Gestión de perfil:
Los usuarios pueden actualizar su información personal y preferencias a través de los componentes de Clerk integrados en la interfaz.

- Personalización y roles:
Clerk permite la gestión de atributos personalizados y roles de usuario, facilitando la creación de experiencias diferenciadas según el tipo de usuario.

- Integración SSR y RSC:
Clerk se integra de forma nativa con el renderizado híbrido de Next.js, permitiendo acceder a la información del usuario tanto del lado del servidor como del cliente.
Esta integración garantiza una experiencia de usuario fluida, segura y escalable, cumpliendo con los estándares modernos de autenticación y gestión de identidades.

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
