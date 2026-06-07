"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "C'est quoi vos tarifs ?",
  "Réserver un appel",
  "Délais de livraison ?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour 👋 Je suis l'assistant Massishoots. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message ?? "Une erreur est survenue." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Désolé, une erreur est survenue. Réessayez ou contactez-nous directement." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#C9A84C",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(201,168,76,0.4)",
        }}
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="chatbot-window"
            style={{
              position: "fixed",
              bottom: 92,
              right: 24,
              zIndex: 9998,
              width: 360,
              height: 500,
              background: "#0f0f0f",
              border: "0.5px solid #C9A84C",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1) inset",
            }}
          >
            {/* Header */}
            <div style={{
              background: "#000",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "0.5px solid rgba(201,168,76,0.2)",
              flexShrink: 0,
            }}>
              <span className="font-bebas" style={{ fontSize: 14, letterSpacing: "0.15em", color: "#fff" }}>
                MASSISHOOTS
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                  animation: "chatPulse 2s ease-in-out infinite",
                }} />
                <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                  En ligne
                </span>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              background: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  <div
                    className="font-dm"
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user" ? "#C9A84C" : "#1a1a1a",
                      color: msg.role === "user" ? "#0a0a0a" : "rgba(255,255,255,0.8)",
                      fontSize: 13,
                      lineHeight: 1.55,
                      fontWeight: msg.role === "user" ? 500 : 400,
                      border: msg.role === "assistant" ? "0.5px solid rgba(255,255,255,0.07)" : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "10px 16px",
                    background: "#1a1a1a",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px 16px 16px 4px",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}>
                    {[0, 1, 2].map(d => (
                      <span key={d} style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "rgba(201,168,76,0.6)",
                        animation: `chatDot 1.2s ease-in-out ${d * 0.2}s infinite`,
                        display: "inline-block",
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested — show only at start */}
              {messages.length === 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="font-dm"
                      style={{
                        padding: "6px 12px",
                        background: "transparent",
                        border: "0.5px solid rgba(201,168,76,0.4)",
                        borderRadius: 9999,
                        color: "#C9A84C",
                        fontSize: 11,
                        cursor: "pointer",
                        letterSpacing: "0.03em",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 14px",
              background: "#1a1a1a",
              borderTop: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") send(); }}
                placeholder="Écrivez votre message..."
                className="font-dm"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: 13,
                  placeholder: "rgba(255,255,255,0.2)",
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: input.trim() && !loading ? "#C9A84C" : "rgba(201,168,76,0.2)",
                  border: "none",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "#0a0a0a" : "rgba(201,168,76,0.5)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .chatbot-window::-webkit-scrollbar { width: 0; }
        @media (max-width: 480px) {
          .chatbot-window {
            width: 100vw !important;
            right: 0 !important;
            bottom: 80px !important;
            height: 60vh !important;
            border-radius: 12px 12px 0 0 !important;
          }
        }
      `}</style>
    </>
  );
}
