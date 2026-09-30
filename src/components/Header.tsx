'use client';

import React from 'react';
import { Footprints, Sun, Moon, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react';
import { AppSettings } from '../utils/types';

interface HeaderProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ settings, onUpdateSettings, onOpenSettings }) => {
  const isDark = settings.theme === 'dark';

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    onUpdateSettings({ theme: next });
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-main)] px-5 lg:px-8 py-3.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* ── Brand ── matches the "CF Comfort Footwear" logo from the app */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--btn-primary-bg)] flex items-center justify-center shadow-sm">
            <span className="text-[var(--btn-primary-text)] text-xs font-black tracking-tight">CF</span>
          </div>
          <span className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
            Comfort Footwear
          </span>
        </div>

        {/* ── Center nav pill — matches pill nav from app ── */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)]">
          <span className="px-4 py-1.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-xs font-semibold">
            Support
          </span>
          <span className="px-4 py-1.5 text-[var(--text-secondary)] text-xs font-medium hover:text-[var(--text-primary)] cursor-default transition-colors">
            Orders
          </span>
          <span className="px-4 py-1.5 text-[var(--text-secondary)] text-xs font-medium hover:text-[var(--text-primary)] cursor-default transition-colors">
            Tracking
          </span>
          <span className="px-4 py-1.5 text-[var(--text-secondary)] text-xs font-medium hover:text-[var(--text-primary)] cursor-default transition-colors">
            Policies
          </span>
        </div>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-2">
          {/* Mock/Live badge */}
          {settings.useMock && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)]/20 text-xs font-medium text-[var(--accent)]">
              <Sparkles className="w-3 h-3" />
              <span>Mock</span>
            </div>
          )}

          {/* Sound */}
          <button onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })} className="icon-btn" title="Toggle Sound">
            {settings.soundEnabled
              ? <Volume2 className="w-4 h-4" />
              : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Theme */}
          <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings — pill button like "Login / Sign Up" from app */}
          <button onClick={onOpenSettings} className="btn-secondary flex items-center gap-1.5" title="Settings">
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
