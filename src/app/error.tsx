'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="rounded-lg border border-destructive bg-card p-8 shadow-sm max-w-md w-full">
                <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
                <p className="text-muted-foreground mb-6">
                    An error occurred while processing your request. Please try again later.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="button"
                        onClick={reset}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity text-center"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
} 