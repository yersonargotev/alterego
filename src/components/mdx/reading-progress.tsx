'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            // Calculate how far the user has scrolled through the document
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrolled = scrollTop / docHeight;
            setProgress(scrolled * 100);
        };

        // Add scroll event listener
        window.addEventListener('scroll', updateProgress);

        // Initial calculation
        updateProgress();

        // Clean up
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
} 