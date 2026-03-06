import AttemptsChart from '@/components/dashboard/attempt-chart';
import DailyStatsChart from '@/components/dashboard/DailyStatsChart';
import HourlyAttemptsChart from '@/components/dashboard/HourlyAttemptsChart';
import WeeklyAttemptsChart from '@/components/dashboard/WeeklyAttemptsChart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, HourlyStatItem, StatItem, User, WeeklyStatItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LucideChevronRight, LucideClipboardList, LucideShapes, LucideSplit, LucideUserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { user, daily_users, daily_attempts, hourly_attempts, today_hourly_attempts, weekly_attempts } = usePage<{
        user: User;
        daily_users: StatItem[];
        daily_attempts: StatItem[];
        weekly_attempts: WeeklyStatItem[];
        hourly_attempts: HourlyStatItem[];
        today_hourly_attempts: HourlyStatItem[];
    }>().props;
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('sidebar.dashboard'),
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('sidebar.dashboard')} />

            <div className="flex flex-col gap-4 bg-slate-50/50 p-4 md:gap-8 md:p-6 dark:bg-transparent">
                {/* 🌈 Welcome Header - Ixchamroq */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            {user.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-xs text-slate-500 md:text-base dark:text-slate-400">{t('check_your_progress_and_scores')}</p>
                    </div>
                    {/* Profil rasmi headerga ko'chirildi */}
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm md:hidden dark:border-slate-800">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-200 dark:bg-slate-800">
                                <LucideUserCircle className="h-6 w-6 text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>
                {/* 📊 Stats Grid - 2ta kichik va 1ta enli karta */}
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-6">
                    {/* 1. Stats Card - Deep Luxury Blue */}
                    <div className="relative col-span-full overflow-hidden rounded-[28px] bg-[#0F172A] p-5 text-white shadow-2xl md:col-span-1">
                        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-600/20 blur-2xl" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-wider text-blue-400 uppercase opacity-90">
                                    {t('exam_attempts.title')}
                                </p>
                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-4xl font-extrabold tracking-tighter tabular-nums">{user.attempts_count ?? 0}</span>
                                    <span className="text-xs font-semibold text-slate-500">{t('attempts_unit', 'urinish')}</span>
                                </div>
                            </div>

                            {(() => {
                                const totalScore = user.attempts_sum_score ?? 0;
                                const totalQuestions = user.attempts_sum_questions_count ?? 0;
                                const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

                                return (
                                    <div className="mt-6">
                                        <div className="mb-2 flex justify-between text-xs font-semibold">
                                            <span className="text-slate-400">{t('accuracy', 'Natija')}</span>
                                            <span className="text-blue-400">{accuracy}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-slate-800 ring-1 ring-slate-700">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-1000"
                                                style={{ width: `${Math.min(accuracy, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* 2. Tickets Card - Vibrant Amber (Urgent Action) */}
                    <Link
                        href={route('active_tickets')}
                        className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-orange-400 to-amber-600 p-4 text-white shadow-xl shadow-orange-500/20 transition-all active:scale-95 md:min-h-[170px] md:hover:-translate-y-2"
                    >
                        <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-white/20 blur-xl" />
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md md:h-12 md:w-12">
                            <LucideClipboardList className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-sm leading-tight font-bold tracking-tight md:text-xl">{t('sidebar.ticket')}</div>
                            <div className="mt-1.5 flex items-center text-[11px] font-semibold tracking-wide uppercase opacity-80">
                                {t('view_all')} <LucideChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>

                    {/* 3. Road Signs Card - Elegant Emerald */}
                    <Link
                        href={route('sign_category.index')}
                        className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 to-teal-700 p-4 text-white shadow-xl shadow-emerald-500/20 transition-all active:scale-95 md:min-h-[170px] md:hover:-translate-y-2"
                    >
                        <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md md:h-12 md:w-12">
                            <LucideShapes className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-sm leading-tight font-bold tracking-tight md:text-xl">{t('road_signs')}</div>
                            <div className="mt-1.5 flex items-center text-[11px] font-semibold tracking-wide uppercase opacity-80">
                                {t('view_all')} <LucideChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>

                    {/* 4. Road Lines Card - Cool Violet */}
                    <Link
                        href={route('road_line.index')}
                        className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-500 to-purple-700 p-4 text-white shadow-xl shadow-purple-500/20 transition-all active:scale-95 md:min-h-[170px] md:hover:-translate-y-2"
                    >
                        <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md md:h-12 md:w-12">
                            <LucideSplit className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-sm leading-tight font-bold tracking-tight md:text-xl">{t('road_lines')}</div>
                            <div className="mt-1.5 flex items-center text-[11px] font-semibold tracking-wide uppercase opacity-80">
                                {t('view_all')} <LucideChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                </div>{' '}
                {/* 📈 Chart Section */}
                <div className={''}>
                    <AttemptsChart attempts={user.attempts ?? []} />
                </div>
                {
                    (daily_users.length > 0 || daily_attempts.length > 0) && (
                        <div className={''}>
                            <DailyStatsChart dailyUsers={daily_users} dailyAttempts={daily_attempts} />
                        </div>
                    )
                }
                {
                    today_hourly_attempts.length > 0 && (
                        <>
                            <div className={''}>
                                <HourlyAttemptsChart
                                    hourlyAttempts={today_hourly_attempts}
                                    title={t('today_hourly_stats', 'Bugungi soatbay statistika')}
                                />
                            </div>
                        </>
                    )
                }
                {
                    weekly_attempts.length > 0 && (
                        <>
                            <div className={''}>
                                <WeeklyAttemptsChart weeklyAttempts={weekly_attempts} title={t('weekly_stats', 'Haftalik statistika')} />
                            </div>
                        </>
                    )
                }
                {
                    hourly_attempts.length > 0 && (
                        <>
                            <div className={''}>
                                <HourlyAttemptsChart hourlyAttempts={hourly_attempts} title={t('hourly_stats', 'Soatbay statistika')} />
                            </div>
                        </>
                    )
                }
            </div >
        </AppLayout >
    );
}
