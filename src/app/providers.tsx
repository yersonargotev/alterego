import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NuqsAdapter>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            <Toaster />
        </NuqsAdapter>
    );
}

