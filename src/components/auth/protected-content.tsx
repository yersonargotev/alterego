'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedContent({
    children
}: {
    children: React.ReactNode
}) {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !userId) {
            // Redireccionar al usuario a la página de inicio de sesión
            router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`);
        }
    }, [isLoaded, userId, router]);

    // Mientras se carga la autenticación, muestra un spinner o pantalla de carga
    if (!isLoaded) {
        return (
            <div className="w-full h-dvh flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    // Si no hay usuario autenticado, no muestra el contenido
    // (el useEffect se encargará de la redirección)
    if (!userId) {
        return (
            <div className="w-full h-dvh flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-muted-foreground">Acceso restringido</p>
                    <p className="mt-2">Redirigiendo a la página de inicio de sesión...</p>
                </div>
            </div>
        );
    }

    // Si el usuario está autenticado, muestra el contenido
    return <>{children}</>;
} 