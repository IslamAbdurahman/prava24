import StartAttemptModal from '@/components/ticket/StartAttemptModal';
import { Ticket } from '@/types';
import { Calendar, CheckCircle2, ClipboardList, XCircle } from 'lucide-react';
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
        /* grid-cols-2 sets the mobile view to 2 columns */
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tickets.map((item, index) => (
                <div
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                    {/* Header: ID & Status */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/50">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">#{String(index + 1).padStart(2, '0')}</span>
                        {item.is_active ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        ) : (
                            <XCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                        )}
                    </div>

                    {/* Body: Content */}
                    <div className="flex flex-1 flex-col p-3">
                        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-gray-900 sm:text-base dark:text-white">{item.title}</h3>
                        <p className="mb-3 line-clamp-2 text-xs leading-tight text-gray-500 dark:text-gray-400">{item.description}</p>

                        <StartAttemptModal ticket={item} />

                        {/* Stats & Date */}
                        <div className="mt-auto border-t border-gray-100 pt-3 dark:border-gray-800">
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-[10px] tracking-tighter text-gray-400 uppercase dark:text-gray-500">
                                    {t('question')} ({item.questions_count})
                                </span>
                                <span className="text-sm font-black text-gray-700 dark:text-gray-200">
                                    {t('attempt')} ({item.attempts_count})
                                </span>
                            </div>

                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span className="text-[10px] font-medium">{new Date(item.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all group-hover:w-full" />
                </div>
            ))}
        </div>
    );
};

export default ActiveTicketTable;
