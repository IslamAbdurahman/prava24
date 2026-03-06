import StartAttemptModal from '@/components/ticket/StartAttemptModal';
import { cn } from '@/lib/utils';
import { Ticket } from '@/types';
import { Calendar, CheckCircle2, ClipboardList, LayersIcon, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ActiveTicketTable = ({ tickets }: { tickets: Ticket[] }) => {
    const { t } = useTranslation();

    if (!tickets || tickets.length === 0) {
        return (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/20">
                <ClipboardList className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('no_tickets_found')}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('start_by_creating_new_ticket')}</p>
            </div>
        );
    }

    return (
        /* grid-cols-1 mobilda (telegram app) 1 ta ustun bo'lishi chiroyliroq (batafsil ma'lumot sig'adi) */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tickets.map((item, index) => (
                <div
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:p-5 dark:bg-[#111] dark:ring-gray-800"
                >
                    {/* Soft background glow */}
                    <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20 dark:bg-blue-500/15" />

                    {/* Header */}
                    <div className="relative z-10 mb-3 flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                                <LayersIcon className="h-3 w-3" />
                                {t('ticket')} #{String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="line-clamp-2 text-base font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h3>
                        </div>
                        <div
                            className={cn(
                                "flex shrink-0 items-center justify-center rounded-full p-1.5 backdrop-blur-sm",
                                item.is_active
                                    ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                                    : "bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
                            )}>
                            {item.is_active ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="relative z-10 mb-5 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {item.description}
                    </p>

                    <div className="relative z-10 mt-auto flex flex-col gap-4">
                        {/* Stats Row */}
                        <div className="flex w-full items-center gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                            <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-gray-50/80 px-3 py-2 ring-1 ring-gray-100 dark:bg-gray-800/40 dark:ring-gray-800">
                                <ClipboardList className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-medium text-gray-400 uppercase leading-none mb-0.5">{t('question')}</span>
                                    <span className="leading-none">{item.questions_count}</span>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-gray-50/80 px-3 py-2 ring-1 ring-gray-100 dark:bg-gray-800/40 dark:ring-gray-800">
                                <Calendar className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-medium text-gray-400 uppercase leading-none mb-0.5">{t('attempt')}</span>
                                    <span className="leading-none">{item.attempts_count}</span>
                                </div>
                            </div>
                        </div>

                        {/* Button / Action */}
                        <div className="w-full">
                            <StartAttemptModal ticket={item} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActiveTicketTable;
