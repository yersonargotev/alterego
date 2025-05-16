'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <div className="rounded-lg border border-destructive bg-card p-8 shadow-sm max-w-md w-full">
                        <h2 className="text-2xl font-bold text-destructive mb-4">Application Error</h2>
                        <p className="text-muted-foreground mb-6">
                            Something went wrong in the application. Please try reloading the page.
                        </p>
                        {error.digest && (
                            <p className="text-xs text-muted-foreground mb-4">
                                Error ID: {error.digest}
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={reset}
                                className="px-4 py-2"
                            >
                                Try again
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                            >
                                <Link href="/">
                                    Return Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
} 