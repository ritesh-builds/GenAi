'use client';

import React, { useRef, useEffect } from 'react';
import { Footprints, Download, Bot } from 'lucide-react';
import { ChatMessage } from '../utils/types';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';

interface ChatContainerProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  soundEnabled?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages, isTyping, onSendMessage, onClearChat,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `cf_support_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0 cf-card overflow-hidden">

      {/* ── Chat header bar ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-color)] bg-[var(--bg-card)] shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Amber live dot — matches app branding */}
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-subtle-pulse" />
            <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide uppercase">
              Live Support Agent
            </span>
          </span>
        </div>

        {messages.length > 0 && (
          <button onClick={handleExport} title="Export Chat"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-2)] border border-[var(--border-subtle)] transition-all">
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4">
            {/* Matches the dark card style from the app's hero section */}
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card-2)] border border-[var(--border-color)] flex items-center justify-center">
              <Bot className="w-7 h-7 text-[var(--text-muted)] animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Walk in comfort.
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mt-1 leading-relaxed">
                Footwear designed for the way you move. Ask us anything about your order, sizing, refunds, or our policies.
              </p>
            </div>
            {/* Two CTA pills — matches app's "Explore Collection" + "Learn More" buttons */}
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => onSendMessage('How do I track my Comfort Footwear order?')} className="btn-primary text-xs">
                Track My Order →
              </button>
              <button onClick={() => onSendMessage('What is Comfort Footwear return policy?')} className="btn-secondary text-xs">
                Return Policy
              </button>
            </div>
          </div>
        ) : (
          messages.map(msg => <ChatMessageBubble key={msg.id} message={msg} />)
        )}

        {/* ── Typing indicator ── */}
        {isTyping && (
          <div className="flex items-end gap-2.5">
            <div className="w-8 h-8 rounded-xl shrink-0 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center">
              <Footprints className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--chat-bot-bg)] border border-[var(--border-color)] flex items-center gap-1.5">
              <span className="text-xs text-[var(--text-muted)]">Typing</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] animate-bounce" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input footer ── */}
      <div className="p-3 sm:p-4 border-t border-[var(--border-color)] bg-[var(--bg-card)] shrink-0">
        <ChatInput onSendMessage={onSendMessage} onClearChat={onClearChat} disabled={isTyping} />
      </div>
    </div>
  );
};
