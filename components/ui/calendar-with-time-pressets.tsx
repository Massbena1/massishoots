"use client";
import * as React from "react";

const CALENDLY_URL = "https://calendly.com/massishot-ca/consultation-gratuite";

function loadCalendlyScript() {
  if (document.getElementById("calendly-script")) return;
  const s = document.createElement("script");
  s.id = "calendly-script";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.head.appendChild(s);
}

function openCalendly(date?: Date, time?: string) {
  const url = date
    ? `${CALENDLY_URL}?month=${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    : CALENDLY_URL;

  const win = window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } };
  if (win.Calendly?.initPopupWidget) {
    win.Calendly.initPopupWidget({ url });
  } else {
    // Script not ready yet — fallback to new tab
    window.open(url, "_blank");
  }
}
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { MonthCaptionProps } from "react-day-picker";

interface CalendarWithTimeProps {
  onSelect?: (date: Date | undefined, time: string | null) => void;
  hideButton?: boolean;
}

export function CalendarWithTime({ onSelect, hideButton = false }: CalendarWithTimeProps = {}) {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(today);

  // Preload Calendly script on mount so the popup opens instantly
  React.useEffect(() => { loadCalendlyScript(); }, []);

  const handleDateChange = (d: Date | undefined) => {
    setDate(d);
    onSelect?.(d, selectedTime);
  };

  const handleTimeChange = (t: string) => {
    setSelectedTime(t);
    onSelect?.(date, t);
  };

  // Time slots 9h → 18h every 30 min
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const totalMinutes = i * 30;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  const disabledDays = [
    { before: today },
    { dayOfWeek: [0] },
  ];

  const formattedDate = date?.toLocaleDateString("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Animated month caption — slides when navigating months
  const AnimatedCaption = React.useCallback(({ calendarMonth }: MonthCaptionProps) => {
    const monthLabel = format(calendarMonth.date, "MMMM yyyy", { locale: fr });
    return (
      <div className="relative mx-10 mb-1 flex h-9 items-center justify-center z-20" style={{ overflow: "hidden" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={monthLabel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-dm"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.06em",
              textTransform: "capitalize",
              display: "block",
            }}
          >
            {monthLabel}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }, []);

  return (
    <Card className="gap-0 p-0 overflow-hidden" style={{
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: 20,
    }}>
      <CardContent className="relative p-0 md:pr-44">
        {/* Calendar */}
        <div className="p-5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            disabled={disabledDays}
            showOutsideDays={false}
            className="bg-transparent p-0"
            formatters={{
              formatWeekdayName: (d: Date) => d.toLocaleString("fr-FR", { weekday: "short" }),
            }}
            classNames={{
              today: [
                "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10",
                "*:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-[#c4cdd6]",
                "[&[data-selected]:not(.range-middle)>*]:after:bg-background",
                "[&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
              ].join(" "),
              day_button: [
                "relative flex size-9 items-center justify-center whitespace-nowrap rounded-full p-0",
                "outline-offset-2 transition-all duration-200 ease-out",
                "focus:outline-none group-data-[disabled]:pointer-events-none",
                "hover:bg-white/10 hover:text-white hover:scale-105",
                "group-data-[selected]:bg-[rgba(196,205,214,0.18)] group-data-[selected]:text-[#c4cdd6]",
                "group-data-[selected]:ring-1 group-data-[selected]:ring-[rgba(196,205,214,0.45)]",
                "group-data-[selected]:scale-105",
                "group-data-[disabled]:text-foreground/25 group-data-[disabled]:line-through",
                "group-data-[outside]:text-foreground/25 focus-visible:outline focus-visible:outline-2",
              ].join(" "),
            }}
            components={{
              MonthCaption: AnimatedCaption,
            }}
          />
        </div>

        {/* Time slots */}
        <div
          className="time-col no-scrollbar"
          style={{
            overflowY: "auto",
            maxHeight: 280,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <p className="font-dm" style={{
            fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginBottom: 8,
          }}>
            Heure
          </p>
          {timeSlots.map((time, i) => (
            <motion.button
              key={time}
              onClick={() => handleTimeChange(time)}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.015 }}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="font-dm"
              style={{
                width: "100%",
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 13,
                border: selectedTime === time
                  ? "1px solid rgba(196,205,214,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: selectedTime === time
                  ? "rgba(196,205,214,0.12)"
                  : "rgba(255,255,255,0.03)",
                color: selectedTime === time ? "#c4cdd6" : "rgba(255,255,255,0.55)",
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: selectedTime === time ? 600 : 400,
              }}
            >
              {time}
            </motion.button>
          ))}
        </div>

        {/* md: absolute right column */}
        <style>{`
          @media (min-width: 768px) {
            .time-col {
              position: absolute !important;
              top: 0; right: 0; bottom: 0;
              width: 11rem;
              max-height: none !important;
              border-top: none !important;
              border-left: 1px solid rgba(255,255,255,0.07) !important;
              overflow-y: auto;
            }
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </CardContent>

      {/* Footer */}
      <CardFooter style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "16px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={date ? (formattedDate ?? "") + (selectedTime ?? "") : "empty"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-dm"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
          >
            {date && selectedTime ? (
              <>
                Séance réservée pour le{" "}
                <span style={{ color: "#fff", fontWeight: 600 }}>{formattedDate}</span>{" "}
                à <span style={{ color: "#c4cdd6", fontWeight: 600 }}>{selectedTime}</span>.
              </>
            ) : (
              "Sélectionnez une date et une heure pour votre séance."
            )}
          </motion.p>
        </AnimatePresence>

        {!hideButton && (
          <motion.div
            whileHover={date && selectedTime ? { scale: 1.04 } : {}}
            whileTap={date && selectedTime ? { scale: 0.96 } : {}}
            transition={{ duration: 0.15 }}
          >
            <Button
              disabled={!date || !selectedTime}
              className="font-dm"
              style={{
                background: date && selectedTime ? "#c4cdd6" : "rgba(255,255,255,0.06)",
                color: date && selectedTime ? "#0a0a0a" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: 10,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                transition: "background 0.25s, color 0.25s",
                cursor: date && selectedTime ? "none" : "not-allowed",
              }}
              onClick={() => {
                if (date && selectedTime) openCalendly(date, selectedTime);
              }}
            >
              Confirmer →
            </Button>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  );
}
