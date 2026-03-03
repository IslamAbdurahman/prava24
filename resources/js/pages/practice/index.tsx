import ExamInterface from '@/components/practice/ExamInterface';
import AppLayout from '@/layouts/app-layout';
import { Attempt, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Practice() {
    // Fixed: The key in the generic type now matches the destructured variable 'attempts'
    const { attempt } = usePage<{
        attempt: Attempt;
    }>().props;

    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('attempt'),
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('attempt')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <ExamInterface attempt={attempt} />
                </div>
            </div>
        </AppLayout>
    );
}
