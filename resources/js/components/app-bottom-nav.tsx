import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CalculatorIcon, Layers2Icon, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AppBottomNav() {
    const { url } = usePage();
    const { t } = useTranslation();

    const mainNavItems = [
        {
            title: t('sidebar.dashboard'),
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: t('sidebar.active_tickets'),
            href: '/active_tickets',
            icon: Layers2Icon,
        },
        {
            title: t('sidebar.attempts'),
            href: '/attempts',
            icon: CalculatorIcon,
        },
    ];

    const handleNavClick = (href: string) => {
        // Haptic feedback
        window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
        router.visit(href);
    };

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200/80 bg-white/80 shadow-[0_-2px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden dark:border-gray-800/80 dark:bg-gray-900/80">
            <div className="flex h-16 items-center justify-around" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                {mainNavItems.map((item) => {
                    const isActive = item.href === '/dashboard' ? url === '/dashboard' : url.startsWith(item.href);

                    return (
                        <button
                            key={item.title}
                            onClick={() => handleNavClick(item.href)}
                            className="flex flex-1 flex-col items-center justify-center gap-1 transition-all active:scale-90"
                        >
                            <div
                                className={cn(
                                    'flex h-8 w-12 items-center justify-center rounded-2xl transition-all',
                                    isActive
                                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                                        : 'text-gray-400 dark:text-gray-500',
                                )}
                            >
                                <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
                            </div>
                            <span className={cn(
                                'text-xs font-semibold',
                                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500',
                            )}>{item.title}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

