'use client';

import React, { useState } from 'react';
import { X, Server, Sparkles, Volume2, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { AppSettings } from '../utils/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (s: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSaveSettings }) => {
  const [url, setUrl] = useState(settings.backendUrl);
  const [useMock, setUseMock] = useState(settings.useMock);
  const [sound, setSound] = useState(settings.soundEnabled);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMsg, setTestMsg] = useState('');

  if (!isOpen) return null;

  const handleTest = async () => {
    setTestStatus('testing'); setTestMsg('');
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'Ping' });
      if (res.ok) { setTestStatus('success'); setTestMsg('Spring Boot responded successfully!'); }
      else { setTestStatus('failed'); setTestMsg(`Server returned ${res.status}`); }
    } catch (e: unknown) {
      setTestStatus('failed');
      setTestMsg(`Cannot connect: ${e instanceof Error ? e.message : 'Network error'}. Check Spring Boot is running and CORS is enabled.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md cf-card bg-[var(--bg-card)] p-6 shadow-[var(--shadow-md)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-color)] flex items-center justify-center">
              <Server className="w-4 h-4 text-[var(--text-secondary)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Backend Settings</h3>
              <p className="text-[10px] text-[var(--text-muted)]">Configure your Spring Boot API connection</p>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 my-5">
          {/* URL */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              API Endpoint <span className="text-[var(--text-muted)] font-normal">(POST · Content-Type: text/plain)</span>
            </label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)}
              placeholder="http://localhost:8080/api/chat"
              className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-card-2)] text-[var(--text-primary)] text-sm border border-[var(--border-color)] outline-none focus:border-[var(--text-muted)] transition-colors placeholder-[var(--text-muted)]"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-[var(--text-muted)]">Default: http://localhost:8080/api/chat</span>
              <button onClick={handleTest} disabled={testStatus === 'testing'}
                className="text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
                {testStatus === 'testing' && <RefreshCw className="w-3 h-3 animate-spin" />}
                Test
              </button>
            </div>
            {testStatus === 'success' && (
              <div className="mt-2 p-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border-color)] text-xs flex items-center gap-1.5 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {testMsg}
              </div>
            )}
            {testStatus === 'failed' && (
              <div className="mt-2 p-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border-color)] text-xs flex items-start gap-1.5 text-[var(--text-secondary)]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {testMsg}
              </div>
            )}
          </div>

          {/* Mock toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl cf-card-2">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <div>
                <span className="text-xs font-semibold text-[var(--text-primary)] block">Smart Mock Mode</span>
                <span className="text-[10px] text-[var(--text-muted)]">Use built-in responses if backend is offline</span>
              </div>
            </div>
            <input type="checkbox" checked={useMock} onChange={e => setUseMock(e.target.checked)}
              className="w-4 h-4 accent-current cursor-pointer" />
          </div>

          {/* Sound toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl cf-card-2">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[var(--text-secondary)]" />
              <div>
                <span className="text-xs font-semibold text-[var(--text-primary)] block">Sound Effects</span>
                <span className="text-[10px] text-[var(--text-muted)]">Ping sounds on message send/receive</span>
              </div>
            </div>
            <input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)}
              className="w-4 h-4 accent-current cursor-pointer" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border-color)]">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={() => { onSaveSettings({ backendUrl: url, useMock, soundEnabled: sound }); onClose(); }}
            className="btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
