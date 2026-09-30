'use client';

import React from 'react';
import { ShoppingBag, RefreshCw, Truck, ShieldCheck } from 'lucide-react';
import { QuickPrompt } from '../utils/types';
import { TiltCard } from './TiltCard';

interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export const PRESET_PROMPTS: QuickPrompt[] = [
  {
    id: '1',
    title: 'Track Shipment',
    prompt: 'Where is my Comfort Footwear shipment #CF-8492? Please track its status.',
    category: 'tracking',
    iconName: 'Truck',
    gradient: '',
  },
  {
    id: '2',
    title: 'Size Exchange',
    prompt: 'My Cloud-Walk shoes are too tight in size 9. How do I request a size exchange or refund?',
    category: 'refund',
    iconName: 'RefreshCw',
    gradient: '',
  },
  {
    id: '3',
    title: 'Sizing Guide',
    prompt: 'How do I choose the correct width and arch support for Comfort Footwear orthotics?',
    category: 'order',
    iconName: 'ShoppingBag',
    gradient: '',
  },
  {
    id: '4',
    title: '30-Day Guarantee',
    prompt: 'What is Comfort Footwear 30-day risk-free wear test and return policy?',
    category: 'policy',
    iconName: 'ShieldCheck',
    gradient: '',
  },
];

const getIcon = (category: string) => {
  const cls = 'w-4 h-4 text-[var(--text-secondary)]';
  switch (category) {
    case 'tracking': return <Truck className={cls} />;
    case 'refund':   return <RefreshCw className={cls} />;
    case 'order':    return <ShoppingBag className={cls} />;
    default:         return <ShieldCheck className={cls} />;
  }
};

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt }) => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-3 px-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
        Common Topics
      </span>
      <span className="text-[11px] text-[var(--text-muted)]">Click to ask</span>
    </div>

    <div className="grid grid-cols-2 gap-2">
      {PRESET_PROMPTS.map(qp => (
        <TiltCard key={qp.id} maxTilt={10} onClick={() => onSelectPrompt(qp.prompt)}
          className="cf-card-2 p-3 cursor-pointer group hover:border-[var(--text-muted)] transition-colors">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover:border-[var(--border-color)] transition-colors shrink-0">
              {getIcon(qp.category)}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] truncate">
                {qp.title}
              </h4>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5 line-clamp-2">
                {qp.prompt}
              </p>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  </div>
);
