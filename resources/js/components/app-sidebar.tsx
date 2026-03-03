import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Auth, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    CalculatorIcon,
    Folder,
    Layers2Icon,
    LayersIcon,
    LayoutGrid,
    Users,
} from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { t, i18n } = useTranslation();

    const footerNavItems: NavItem[] = [
        {
            title: t('sidebar.repository'),
            href: 'https://github.com/islamabdurahman',
            icon: Folder,
        },
        {
            title: t('sidebar.telegram'),
            href: 'https://t.me/livelongevity',
            icon: BookOpen,
        },
    ];

    const { auth } = usePage().props as unknown as { auth?: Auth };

    const isAdmin = auth?.user?.roles?.some((role) => role.name === 'Admin');

    const filteredNavItems = useMemo((): NavItem[] => {
        const items: NavItem[] = [
            {
                title: t('sidebar.dashboard'),
                href: route('dashboard'),
                icon: LayoutGrid,
            },
            {
                title: t('sidebar.user'),
                href: route('user.index'),
                icon: Users,
            },
            {
                title: t('sidebar.ticket'),
                href: route('tickets.index'),
                icon: LayersIcon,
            },
            {
                title: t('sidebar.active_tickets'),
                href: route('active_tickets'),
                icon: Layers2Icon,
            },
            {
                title: t('sidebar.attempts'),
                href: route('attempts.index'),
                icon: CalculatorIcon,
            },
        ];

        return items.filter((item) => {
            if (item.href === route('user.index') && !isAdmin) return false;
            if (item.href === route('tickets.index') && !isAdmin) return false;
            return true;
        });
    }, [isAdmin, i18n.language]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
