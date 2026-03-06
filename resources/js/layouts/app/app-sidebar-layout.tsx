import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { isTelegramWebApp } from '@/hooks/use-telegram';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[]
}>) {
    const isTg = isTelegramWebApp();

    // Telegram Mini App ichida: sidebar yashiriladi, faqat bottom nav
    if (isTg) {
        return (
            <div className="flex min-h-screen w-full flex-col bg-background">
                {/* Telegram ichida engil header */}
                <div className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl dark:bg-black/80">
                    <header className="flex h-12 items-center justify-between border-b border-border/50 px-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <img
                                src="/images/icons/big-logo-nobg.png"
                                alt="P24A"
                                className="size-7 object-contain"
                            />
                            <span>Prava24</span>
                        </div>
                    </header>
                </div>

                <main className="mt-12 flex-1 pb-20">
                    {children}
                </main>

                <AppBottomNav />
            </div>
        );
    }

    // Desktop/brauzer: to'liq sidebar layout
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="pb-14 md:pb-0 w-100" >

                <div className={'mb-14'}>
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                </div>

                {children}
            </AppContent>

            <AppBottomNav />

        </AppShell>
    );
}
