import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CalculatorIcon, Layers2Icon, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AppBottomNav() {
    const { url } = usePage(); // Hozirgi sahifa URL manzili
    const { t } = useTranslation();

    const mainNavItems = [
        {
            title: t('sidebar.dashboard'),
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: t('sidebar.active_tickets'),
            href: '/active_tickets', // route('active_tickets') natijasi shunday bo'lsa
            icon: Layers2Icon,
        },
        {
            title: t('sidebar.attempts'),
            href: '/attempts', // route('attempts.index') natijasi
            icon: CalculatorIcon,
        },
    ];

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden dark:border-gray-800 dark:bg-gray-900">
            <div className="pb-safe flex h-16 items-center justify-around">
                {mainNavItems.map((item) => {
                    // Aktivlikni aniqlash:
                    // 1. Agar dashboard bo'lsa, URL aynan teng bo'lishi kerak
                    // 2. Boshqa sahifalar uchun URL shu href bilan boshlanishi kifoya (masalan: /attempts/12)
                    const isActive = item.href === '/dashboard' ? url === '/dashboard' : url.startsWith(item.href);

                    return (
                        <button
                            key={item.title}
                            onClick={() => router.visit(item.href)}
                            className="flex flex-1 flex-col items-center justify-center transition-all active:scale-90"
                        >
                            <div
                                className={cn(
                                    'flex flex-col items-center gap-1',
                                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500',
                                )}
                            >
                                <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
                                <span className="text-[10px] font-bold">{item.title}</span>
                            </div>

                            {/* Pastki chiziqcha (aktiv indikator) */}
                            <div
                                className={cn(
                                    'mt-1 h-1 w-5 rounded-full transition-all',
                                    isActive ? 'bg-blue-600 dark:bg-blue-400' : 'bg-transparent',
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
