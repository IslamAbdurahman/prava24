import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { toast } from 'sonner';

import { baseButton } from '@/components/ui/baseButton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@/types';

interface Props {
    ticket: Ticket;
}

export default function StartAttemptModal({ ticket }: Props) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    // Using useForm to handle the post request to the attempt store route
    const { post, processing } = useForm({
        ticket_id: ticket.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Adjust the route name to match your Laravel backend (e.g., 'attempts.store')
        post(route('attempts.store'), {
            onSuccess: () => {
                setOpen(false);
                toast.success(t('attempt_started_successfully'));
            },
            onError: () => {
                toast.error(t('failed_to_start_attempt'));
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-white/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-95 dark:from-emerald-600 dark:to-teal-700 dark:ring-white/10"
                >
                    {/* Yaltiroq effekt (Shine effect on hover) */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ease-in-out group-hover:translate-x-full" />

                    <IoPlayCircleOutline className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10 tracking-wide">{t('start')}</span>
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md border bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold dark:text-white">{t('modal.start_attempt_title')}</DialogTitle>
                    <DialogDescription className="pt-2 text-gray-600 dark:text-gray-400">
                        {t('modal.start_attempt_warning', { title: ticket.title })}
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">{t('ticket_details')}</span>
                        <p className="text-sm font-medium dark:text-gray-200">{ticket.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.questions_count} {t('questions_available')}
                        </p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="dark:bg-gray-800 dark:text-gray-200">
                                {t('cancel')}
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing} className="bg-green-600 text-white hover:bg-green-700">
                            {processing ? t('starting') : t('confirm_start')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
