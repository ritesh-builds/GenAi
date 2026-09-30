'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Trash2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onClearChat, disabled = false }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SR = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => { setText(p => p ? `${p} ${e.results[0][0].transcript}` : e.results[0][0].transcript); setIsListening(false); };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    if (isListening) rec.start();
    else { try { rec.stop(); } catch { /* noop */ } }
    return () => { try { rec.stop(); } catch { /* noop */ } };
  }, [isListening]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--text-muted)] transition-colors shadow-[var(--shadow-sm)]"
      >
        {/* Clear */}
        <button type="button" onClick={onClearChat} title="Clear Chat"
          className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-2)] transition-colors shrink-0">
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Input */}
        <input ref={inputRef} type="text" value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          placeholder="Ask about your order, sizing, refund, or tracking…"
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none min-w-0"
        />

        {/* Mic */}
        <button type="button" onClick={() => setIsListening(p => !p)} title="Voice Input"
          className={`p-1.5 rounded-xl shrink-0 transition-colors ${isListening ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] animate-pulse' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-2)]'}`}>
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Send */}
        <button type="submit" disabled={!text.trim() || disabled} title="Send"
          className="btn-primary flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      <div className="flex items-center justify-between px-1 mt-1.5 text-[10px] text-[var(--text-muted)]">
        <span>Enter to send · Mic for voice input</span>
        <span className="flex items-center gap-1">
          <span className="accent-dot w-1.5 h-1.5" />
          Comfort Footwear AI Support
        </span>
      </div>
    </div>
  );
};
