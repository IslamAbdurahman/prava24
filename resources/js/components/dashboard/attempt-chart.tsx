import { Attempt } from '@/types';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement, // O'zgardi
    PointElement, // O'zgardi
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2'; // O'zgardi
import { useTranslation } from 'react-i18next';

// Elementlarni qayta ro'yxatdan o'tkazamiz
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AttemptsChart({ attempts }: { attempts: Attempt[] }) {
    const { t } = useTranslation();

    const labels = attempts.map((a) =>
        new Date(a.finished_at || a.started_at || a.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        }),
    );

    const highestScore = Math.max(...attempts.map((a) => a.score ?? 0), 20);
    const chartMax = highestScore > 20 ? Math.ceil(highestScore / 5) * 5 + 5 : 20;

    const data = {
        labels,
        datasets: [
            {
                fill: true, // Chiziq pastini bo'yash
                label: t('exam_attempts.score'),
                data: attempts.map((a) => a.score ?? 0),
                borderColor: 'rgb(99, 102, 241)', // Indigo chiziq
                backgroundColor: 'rgba(99, 102, 241, 0.1)', // Pastki qism foni
                tension: 0.4, // Chiziqni yumshatish (0 - to'g'ri chiziq, 0.4 - curve)
                pointRadius: 4,
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointHoverRadius: 6,
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' },
            },
            y: {
                min: 0,
                max: chartMax,
                ticks: {
                    stepSize: highestScore > 10 ? undefined : 1,
                    color: '#94a3b8',
                },
                grid: { color: 'rgba(226, 232, 240, 0.4)' },
            },
        },
    };

    return (
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('exam_attempts.performance')}</h3>
                <p className="text-sm text-slate-500">{t('exam_attempts.track_and_review_student_performance')}</p>
            </div>

            <div className="h-[240px] w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
