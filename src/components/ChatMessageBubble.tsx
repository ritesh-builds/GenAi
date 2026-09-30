'use client';

import React, { useState } from 'react';
import { Footprints, User, Copy, Check, Volume2, VolumeX, ThumbsUp, ThumbsDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChatMessage } from '../utils/types';
import { speakText, stopSpeech } from '../utils/audio';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (isPlaying) { stopSpeech(); setIsPlaying(false); }
    else { speakText(message.content); setIsPlaying(true); setTimeout(() => setIsPlaying(false), 5000); }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    if (type === 'up') confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
  };

  return (
    <div className={`flex items-end gap-2.5 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>

      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
        isUser
          ? 'bg-[var(--bg-card-2)] text-[var(--text-secondary)]'
          : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
      }`}>
        {isUser ? <User className="w-3.5 h-3.5" /> : <Footprints className="w-3.5 h-3.5" />}
      </div>

      <div className={`flex flex-col max-w-[82%] sm:max-w-[70%] gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Sender label */}
        <div className="flex items-center gap-1.5 px-1 text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-secondary)]">
            {isUser ? 'You' : 'Support Agent'}
          </span>
          <span>·</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Bubble — user: white bg w/ black text (dark) | bot: dark card */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] rounded-br-sm'
            : 'bg-[var(--chat-bot-bg)] text-[var(--chat-bot-text)] border border-[var(--border-color)] rounded-bl-sm'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Bot toolbar */}
          {!isUser && (
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-1">
                <button onClick={handleCopy} className="p-1 rounded-lg hover:bg-[var(--bg-card-2)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" title="Copy">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button onClick={handleSpeak} className="p-1 rounded-lg hover:bg-[var(--bg-card-2)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" title="Listen">
                  {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleFeedback('up')} className={`p-1 rounded-lg transition-colors hover:bg-[var(--bg-card-2)] ${feedback === 'up' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleFeedback('down')} className={`p-1 rounded-lg transition-colors hover:bg-[var(--bg-card-2)] ${feedback === 'down' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
