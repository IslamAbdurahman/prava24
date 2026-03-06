import AttemptTimer from '@/components/practice/AttemptTimer';
import FinishAttemptModal from '@/components/practice/FinishAttemptModal';
import { useTelegramBackButton, useTelegramHaptic } from '@/hooks/use-telegram';
import { cn } from '@/lib/utils';
import { Attempt, AttemptAnswer } from '@/types';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    attempt: Attempt;
}

export default function ExamInterface({ attempt }: Props) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const haptic = useTelegramHaptic();

    // Telegram BackButton — orqaga qaytish
    useTelegramBackButton(route('attempts.index'));

    // Modal holatlari
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const answers = attempt.attempt_answers || [];
    const totalMinutes = answers.length || 0;

    const startedAt = useMemo(() => {
        const dateValue = attempt.started_at ?? new Date().toISOString();
        return new Date(dateValue).getTime();
    }, [attempt.started_at]);

    const endAt = useMemo(() => startedAt + totalMinutes * 60 * 1000, [startedAt, totalMinutes]);

    if (answers.length === 0) {
        return <div className="text-muted-foreground flex h-full items-center justify-center">{t('no_questions_found')}</div>;
    }

    const currentAttemptAnswer: AttemptAnswer = answers[currentIndex];
    const question = currentAttemptAnswer?.question;

    const handleAnswerSelect = (answerId: number) => {
        const selectedAnswer = question?.answers?.find((a) => a.id === answerId);
        setIsCorrect(!!selectedAnswer?.is_correct);

        // Haptic feedback
        if (selectedAnswer?.is_correct) {
            haptic.success();
        } else {
            haptic.error();
        }

        router.patch(
            route('attempt_answers.update', currentAttemptAnswer.id),
            { answer_id: answerId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Javob saqlangach modalni ko'rsatamiz
                    setShowExplanation(true);
                },
            },
        );
    };

    const handleNextQuestion = () => {
        setShowExplanation(false);
        if (currentIndex < answers.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="bg-background text-foreground flex h-[85vh] w-full flex-col overflow-hidden transition-colors">
            {/* Header Section */}
            <div className="border-border bg-card block shrink-0 border-b p-4 lg:flex lg:items-stretch lg:p-0">
                <div className="lg:bg-muted/30 hidden lg:order-2 lg:flex lg:basis-[15%] lg:items-center lg:justify-center lg:border-l lg:px-4">
                    <AttemptTimer endAt={endAt} attemptId={attempt.id} />
                </div>

                <div className="flex-1 lg:p-6 lg:text-center">
                    <div className="float-right mb-1 ml-3 lg:hidden">
                        <AttemptTimer endAt={endAt} attemptId={attempt.id} />
                    </div>
                    <h1 className="text-base leading-snug font-semibold md:text-lg lg:text-xl">{question?.content}</h1>
                    <div className="clear-both"></div>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 lg:flex-row lg:gap-6 lg:p-6">
                <div
                    className={cn(
                        'relative flex items-center justify-center overflow-hidden rounded-lg p-2 transition-all lg:h-auto lg:flex-1',
                        question?.image_url ? 'border-border bg-card/50 h-48 border' : 'h-0 border-transparent bg-transparent lg:h-auto',
                    )}
                >
                    {question?.image_url ? (
                        <img src={`/storage/${question?.image_url}`} alt="Question" className="h-full w-full object-contain" />
                    ) : (
                        <div className="text-muted-foreground/20 hidden text-sm italic lg:block"></div>
                    )}
                </div>

                <div className="flex w-full flex-col gap-2 overflow-y-auto pr-1 lg:w-1/3 lg:gap-3">
                    {question?.answers?.map((answer, index) => (
                        <button
                            key={answer.id}
                            onClick={() => handleAnswerSelect(answer.id)}
                            className={cn(
                                'group border-border bg-card hover:border-primary flex shrink-0 items-stretch rounded-md border text-left transition-all active:scale-[0.98]',
                                currentAttemptAnswer.answer_id === answer.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'hover:bg-muted',
                            )}
                        >
                            <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex w-10 items-center justify-center text-sm font-bold lg:w-12">
                                F{index + 1}
                            </div>
                            <div className="text-foreground/80 flex-1 p-2.5 text-xs lg:p-3 lg:text-sm">{answer.content}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="border-border bg-muted/30 border-t p-4 lg:px-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="hidden items-center justify-between gap-2 md:flex lg:justify-start">
                        <button
                            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                            className="bg-secondary text-secondary-foreground flex-1 rounded px-4 py-2 text-sm font-medium transition disabled:opacity-30 lg:flex-none"
                        >
                            {t('previous')}
                        </button>
                        <button
                            onClick={() => currentIndex < answers.length - 1 && setCurrentIndex(currentIndex + 1)}
                            disabled={currentIndex === answers.length - 1}
                            className="bg-secondary text-secondary-foreground flex-1 rounded px-4 py-2 text-sm font-medium transition disabled:opacity-30 lg:flex-none"
                        >
                            {t('next')}
                        </button>
                    </div>
                    <div className="grid w-full grid-cols-10 gap-1 px-1 sm:flex sm:flex-wrap sm:justify-center sm:gap-1.5 lg:max-h-none lg:px-2">
                        {answers.map((ans, idx) => {
                            const selectedAnswer = ans.question?.answers?.find((a) => a.id === ans.answer_id);
                            return (
                                <button
                                    key={ans.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={cn(
                                        'flex aspect-square h-auto w-full items-center justify-center rounded text-[11px] font-bold transition-all sm:h-7 sm:w-9 lg:h-8 lg:w-10 lg:text-xs',
                                        currentIndex === idx
                                            ? 'bg-blue-600 text-white ring-1 ring-blue-400 lg:ring-2'
                                            : 'bg-muted text-muted-foreground',
                                        ans.answer_id !== null && selectedAnswer?.is_correct ? 'bg-green-600 text-white' : '',
                                        ans.answer_id !== null && !selectedAnswer?.is_correct ? 'bg-red-600 text-white' : '',
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                    <FinishAttemptModal attempt={attempt} />
                </div>
            </div>

            {/* Explanation Modal Overlay */}
            {showExplanation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="bg-card border-border animate-in fade-in zoom-in relative w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl duration-200">

                        {/* Yopish tugmasi */}
                        <button
                            onClick={() => setShowExplanation(false)}
                            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className={cn('p-4 text-center font-bold text-white', isCorrect ? 'bg-green-600' : 'bg-red-600')}>
                            {isCorrect ? t('correct_answer') : t('wrong_answer')}
                        </div>

                        <div className="p-6">
                            <h3 className="text-foreground mb-3 text-lg font-semibold">{t('description')}</h3>
                            <div className="bg-muted/50 text-foreground/80 max-h-[40vh] overflow-y-auto rounded-lg p-4 text-sm leading-relaxed lg:text-base">
                                {question?.description || t('no_description_available')}
                            </div>
                        </div>

                        <div className="border-border border-t p-4">
                            <button
                                onClick={handleNextQuestion}
                                className="bg-primary text-primary-foreground w-full rounded-lg py-3 font-semibold transition hover:opacity-90 active:scale-[0.98]"
                            >
                                {t('understand_and_continue')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
