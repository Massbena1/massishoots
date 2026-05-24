"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function CalendarWithTime() {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  // Time slots 9h → 18h every 30 min
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const totalMinutes = i * 30;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  // Disable past dates + Sundays
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
            onSelect={setDate}
            defaultMonth={today}
            disabled={disabledDays}
            showOutsideDays={false}
            className="bg-transparent p-0"
            formatters={{
              formatWeekdayName: (d: Date) => d.toLocaleString("fr-FR", { weekday: "short" }),
            }}
          />
        </div>

        {/* Time slots */}
        <div
          className="no-scrollbar"
          style={{
            position: undefined,
            overflowY: "auto",
            maxHeight: 280,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          // md override
        >
          <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
            Heure
          </p>
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
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
                transition: "all 0.2s",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: selectedTime === time ? 600 : 400,
              }}
            >
              {time}
            </button>
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
        <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          {date && selectedTime ? (
            <>
              Séance réservée pour le{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>{formattedDate}</span>{" "}
              à <span style={{ color: "#c4cdd6", fontWeight: 600 }}>{selectedTime}</span>.
            </>
          ) : (
            "Sélectionnez une date et une heure pour votre séance."
          )}
        </p>
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
            transition: "all 0.25s",
            cursor: date && selectedTime ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (date && selectedTime) window.location.href = "#contact-form";
          }}
        >
          Continuer →
        </Button>
      </CardFooter>
    </Card>
  );
}
