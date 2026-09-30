'use client';

import React, { useState } from 'react';
import { X, FileCode, Copy, Check, ShieldAlert } from 'lucide-react';
import { SYSTEM_PROMPT } from '../utils/api';

interface SystemPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemPromptModal: React.FC<SystemPromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Spring Boot System Prompt
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Backend system prompt configured in your Comfort Footwear application
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-4">
          <div className="relative p-4 rounded-2xl bg-zinc-950 text-zinc-100 font-mono text-xs leading-relaxed border border-zinc-800 shadow-inner overflow-x-auto max-h-[300px]">
            <pre className="whitespace-pre-wrap">{SYSTEM_PROMPT}</pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Copy System Prompt"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Rules Summary */}
          <div className="mt-4 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" /> Strict Assistant Rules:
            </div>
            <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px] text-slate-600 dark:text-zinc-300">
              <li>Identifies customer main problem and urgency</li>
              <li>Answers strictly in <strong>one line</strong></li>
              <li>Uses words like <em>&quot;I understand your frustration&quot;</em> and <em>&quot;I am really sorry for your trouble&quot;</em></li>
              <li>Only handles Footwear ordering, sizing/fit, refund, order tracking status, and company policy queries</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-zinc-800 text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
