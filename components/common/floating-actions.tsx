"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

interface FloatingActionsProps {
  onSendWish: () => void;
  onRSVP: () => void;
  onWeddingGift: () => void;
}

export default function FloatingActions({
  onSendWish,
  onRSVP,
  onWeddingGift,
}: FloatingActionsProps) {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const actions = [
    {
      label: t.actions.sendWish,
      onClick: onSendWish,
      color: "bg-primary text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
    {
      label: t.actions.confirmAttendance,
      onClick: onRSVP,
      color: "bg-accent text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    // {
    //   label: t.actions.weddingGift,
    //   onClick: onWeddingGift,
    //   color: "bg-accent text-white",
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col-reverse items-end gap-2">
      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "fab",
          expanded
            ? "bg-foreground/80 text-white rotate-45"
            : "bg-accent text-white"
        )}
        style={{ transition: "transform 0.3s, background 0.3s" }}
        aria-label="Toggle actions"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Action buttons */}
      {expanded &&
        actions.map((action, i) => (
          <div
            key={i}
            className="flex items-center gap-2 animate-slide-in-right"
            style={{ animationDelay: `${i * 0.08}s` }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === i && (
              <span className="bg-foreground/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg animate-fade-in">
                {action.label}
              </span>
            )}
            <button
              onClick={() => {
                action.onClick();
                setExpanded(false);
              }}
              className={cn("fab", action.color)}
              aria-label={action.label}
            >
              {action.icon}
            </button>
          </div>
        ))}
    </div>
  );
}
