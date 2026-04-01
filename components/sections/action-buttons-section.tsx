"use client";

import { useLocale } from "@/lib/i18n/locale-context";

interface ActionButtonsSectionProps {
  onSendWish: () => void;
  onRSVP: () => void;
  onWeddingGift: () => void;
}

export default function ActionButtonsSection({
  onSendWish,
  onRSVP,
  onWeddingGift,
}: ActionButtonsSectionProps) {
  const { t } = useLocale();

  const buttons = [
    {
      label: t.actions.sendWish,
      onClick: onSendWish,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
    {
      label: t.actions.confirmAttendance,
      onClick: onRSVP,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
    },
    // {
    //   label: t.actions.weddingGift,
    //   onClick: onWeddingGift,
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <section className="py-8 bg-secondary/50">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className="flex items-center gap-2.5 px-6 py-3 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground/70 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 w-full sm:w-auto justify-center border border-border/30 hover:border-primary"
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>
    </section>
  );
}
