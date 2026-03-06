import { AppBottomNav } from '@/components/app-bottom-nav';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import LanguageBar from '@/components/language';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { isTelegramWebApp } from '@/hooks/use-telegram';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[]
}>) {
    const isTg = isTelegramWebApp();

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="pb-20 md:pb-0 w-100" >
                {isTg ? (
                    // Telegram Mini App: Ixcham yengil header, SidebarTrigger (hamburger) bilan
                    <>
                        <div className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl dark:bg-black/80">
                            <header className="flex h-12 items-center justify-between border-b border-border/50 px-4">
                                <div className="flex items-center gap-2">
                                    <SidebarTrigger className="-ml-2 h-8 w-8" />
                                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <img
                                            src="/images/icons/big-logo-nobg.png"
                                            alt="P24A"
                                            className="size-7 object-contain"
                                        />
                                        <span>Prava24</span>
                                    </div>
                                </div>
                                <LanguageBar />
                            </header>
                        </div>
                        <div className="mb-14" />
                    </>
                ) : (
                    // Desktop/Browser: To'liq Sidebar header (Breadcrumbs bilan)
                    <div className="mb-14">
                        <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    </div>
                )}

                {children}
            </AppContent>

            <AppBottomNav />
        </AppShell>
    );
}
