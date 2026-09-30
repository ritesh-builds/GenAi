'use client';

import React from 'react';
import { Clock, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { MockOrder } from '../utils/types';
import { TiltCard } from './TiltCard';

export const CURRENT_MOCK_ORDER: MockOrder = {
  id: 'CF-8492',
  restaurant: 'Comfort Footwear Flagship Store',
  items: [
    { name: 'Cloud-Walk Orthotic Sneakers (Black/White)', qty: 1, price: '$129.00' },
    { name: 'Ergonomic Memory Gel Insoles', qty: 1, price: '$24.00' },
  ],
  total: '$153.00',
  status: 'Out for Delivery',
  estimatedMinutes: 25,
  deliveryPartner: {
    name: 'FedEx Express',
    phone: '+1 (555) 492-102',
    vehicle: 'FedEx Van #492',
    rating: 4.9,
  },
};

interface OrderTrackerWidgetProps {
  onAskAboutOrder: (prompt: string) => void;
}

export const OrderTrackerWidget: React.FC<OrderTrackerWidgetProps> = ({ onAskAboutOrder }) => (
  <TiltCard maxTilt={8} className="w-full">
    <div className="cf-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-subtle)]">
            <ShoppingBag className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--text-primary)] block">
              Shipment #{CURRENT_MOCK_ORDER.id}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              {CURRENT_MOCK_ORDER.restaurant}
            </span>
          </div>
        </div>
        {/* Amber status badge — matches "COMFORT FOOTWEAR 2026" label from app */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-subtle-pulse" />
          <span className="text-[10px] font-semibold text-[var(--accent)]">
            {CURRENT_MOCK_ORDER.status}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> Estimated ~{CURRENT_MOCK_ORDER.estimatedMinutes} min
          </span>
          <span className="text-[var(--text-secondary)] font-medium">{CURRENT_MOCK_ORDER.total}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[var(--bg-card-2)] overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-[var(--btn-primary-bg)] animate-pulse" />
        </div>
      </div>

      {/* Delivery partner */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border-subtle)] mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[10px] font-black text-[var(--text-secondary)]">
            FX
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[var(--text-primary)] block">
              {CURRENT_MOCK_ORDER.deliveryPartner.name}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
              <Star className="w-2.5 h-2.5" />
              <span>{CURRENT_MOCK_ORDER.deliveryPartner.rating} · {CURRENT_MOCK_ORDER.deliveryPartner.vehicle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA — pill style matching app's buttons */}
      <button
        onClick={() => onAskAboutOrder(`Track footwear shipment #${CURRENT_MOCK_ORDER.id} status.`)}
        className="btn-secondary w-full flex items-center justify-center gap-1.5 py-2 group"
      >
        <span>Ask About This Delivery</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  </TiltCard>
);
