
# AlterEgo

## 🧑‍💻 Project Description

AlterEgo is a web platform built with Next.js 15 and TypeScript that enables users to manage digital identities securely and flexibly. The main goal is to provide a modern experience for authentication, profile customization, and content management, following best practices in usability and security.
The application uses a modular architecture and reusable components, leveraging Radix UI and Shadcn UI for an accessible, responsive interface. Dynamic content is managed via MDX, allowing users and admins to create and view rich documents. User experience and performance are prioritized by optimizing Web Vitals and using Next.js hybrid rendering (SSR and RSC).

Key features include:

- Secure sign-up and login with Clerk
- User profile and preferences management
- Rich content viewing and editing (MDX)
- Modern, accessible, mobile-first UI
- Real-time notifications and feedback with Sonner

## 🔐 Use of Clerk

Clerk is integrated as the main authentication and user management provider in AlterEgo. The official Clerk SDK for Next.js is used, leveraging both UI components and hooks/helpers to protect routes and customize the user experience.

Key Clerk implementations in the project:

- User authentication:
Clerk’s <SignIn />, <SignUp />, and <UserButton /> components handle sign-in, sign-up, and session management flows.

- Route protection:
The Next.js middleware (src/middleware.ts) uses Clerk to restrict access to private routes, ensuring only authenticated users can access certain pages or resources.

- Profile management:
Users can update their personal information and preferences through Clerk components integrated into the UI.

- Personalization and roles:
Clerk enables management of custom attributes and user roles, making it easy to create differentiated experiences based on user type.

- SSR and RSC integration:
Clerk integrates natively with Next.js hybrid rendering, allowing user information to be accessed both server-side and client-side.
This integration ensures a seamless, secure, and scalable user experience, meeting modern standards for authentication and identity management.

## 🚀 Demo

[https://alternego.vercel.app/](https://alternego.vercel.app/)

## 📸 Screenshots

![Screenshot 1](./public/images/screenshot-1.png)

## 🔍 Features

- 🔍 **Browse Rust Alternatives:** Find Rust-based replacements for popular tools and libraries.
- 📝 **Project Info & Features:** Detailed project cards with license, platforms, and key features.
- 📰 **Blog/Content:** Dynamic blog/content system powered by local content directories and JSON data.
- 🦾 **Authentication:** Integrated with Clerk for user sign-in.
- 🎨 **UI/UX:** Built with Shadcn UI, Radix, Tailwind CSS, and Sonner for toasts.
- ⚡ **Performance:** Uses Next.js App Router, React Server Components, and optimized image loading.

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) (App Router, SSR, RSC)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) for notifications
- [Clerk](https://clerk.com/) for authentication
- [pnpm](https://pnpm.io/) for package management

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
pnpm build
```

### Lint & Format

```bash
pnpm lint
pnpm format
```

## 🤝 Contributing

1. Fork and create a feature branch.
2. Use TypeScript, functional components, and Tailwind CSS.
3. Follow code style and conventions (see `/src/types` and `/src/components`).
4. Run lint and format before submitting a PR.

## 📄 License

MIT