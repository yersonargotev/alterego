import React from "react";

/**
 * Wrapper para aplicar estilos de tipografía globales (prose) al contenido MDX.
 * Usar este componente para envolver el contenido principal de MDX.
 */
export function Prose({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`prose prose-lg max-w-none dark:prose-invert ${className || ''}`}>
            {children}
        </div>
    );
}