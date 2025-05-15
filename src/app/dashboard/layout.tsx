import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider
            defaultOpen={true}
            className="grid h-dvh grid-rows-[auto_1fr]"
        >
            <div className="row-span-2 flex">
                <AppSidebar />
                <main className="flex flex-1 overflow-auto">
                    <div className="grid flex-1">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
}
