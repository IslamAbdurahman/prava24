import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="group flex items-center gap-3">
            {/* Logo konteyneri */}
            <div className="/* Dark modeda fonni butunlay qora qilmasdan, xira kulrang qilamiz */ flex aspect-square size-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all dark:bg-slate-200">
                <img
                    src="/images/icons/big-logo-nobg.png"
                    alt="P24A Logo"
                    className="/* Dark modeda rasm yaqqol ko'rinishi uchun soya qo'shamiz */ size-8 object-contain transition-all dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]"
                />
            </div>

            {/* Matn qismi */}
            <div className="flex flex-col text-left">
                <span className="text-sm leading-none font-bold tracking-tight text-slate-900 dark:text-white">Prava24Bot</span>
            </div>
        </Link>
    );
}
