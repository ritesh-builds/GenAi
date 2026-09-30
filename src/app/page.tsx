'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ThreeMascot } from '../components/ThreeMascot';
import { QuickPrompts } from '../components/QuickPrompts';
import { OrderTrackerWidget } from '../components/OrderTrackerWidget';
import { ChatContainer } from '../components/ChatContainer';
import { SettingsModal } from '../components/SettingsModal';
import { AppSettings, ChatMessage } from '../utils/types';
import { sendMessageToBackend } from '../utils/api';
import { soundManager } from '../utils/audio';
import { MessageSquare, LayoutDashboard, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content:
      'Welcome to Comfort Footwear Support! I am here to assist with your footwear orders, sizing, refunds, order tracking, and company policy inquiries.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function Home() {
  const [settings, setSettings] = useState<AppSettings>({
    backendUrl: 'http://localhost:8080/api/chat',
    useMock: false,
    soundEnabled: true,
    ttsEnabled: false,
    theme: 'dark',
    autoScroll: true,
  });

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'dashboard' | 'chat'>('chat');

  // Load saved preferences & sync dark mode class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('comfort_footwear_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings((prev) => ({ ...prev, ...parsed }));
          if (parsed.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch {
          document.documentElement.classList.add('dark');
        }
      } else {
        document.documentElement.classList.add('dark');
      }

      const savedChat = localStorage.getItem('comfort_footwear_chat');
      if (savedChat) {
        try {
          const parsedMsgs = JSON.parse(savedChat);
          if (Array.isArray(parsedMsgs) && parsedMsgs.length > 0) {
            setMessages(parsedMsgs);
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Save settings on update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== 'undefined') {
        localStorage.setItem('comfort_footwear_settings', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Save messages on update
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('comfort_footwear_chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Send message to Spring Boot backend
  const handleSendMessage = async (userText: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp,
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    if (settings.soundEnabled) {
      soundManager.playSend();
    }

    // Call backend endpoint (POST http://localhost:8080/api/chat)
    const result = await sendMessageToBackend(userText, settings.backendUrl, settings.useMock);

    setIsTyping(false);

    if (result.error && !settings.useMock) {
      console.warn('Backend warning:', result.error);
    }

    const assistantMessage: ChatMessage = {
      id: `ast-${Date.now()}`,
      role: 'assistant',
      content: result.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    if (settings.soundEnabled) {
      soundManager.playReceive();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('comfort_footwear_chat');
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col transition-colors duration-300" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 overflow-hidden max-w-7xl w-full mx-auto p-4 sm:p-5 lg:p-6 flex flex-col gap-4">
        {/* Mobile View Switcher Tabs */}
        <div className="flex md:hidden items-center p-1 rounded-2xl cf-card mb-2">
          <button
            onClick={() => setMobileTab('chat')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'chat'
                ? 'btn-primary'
                : ''
            }`}
            style={mobileTab !== 'chat' ? { color: 'var(--text-muted)' } : {}}
          >
            <MessageSquare className="w-4 h-4" /> Chat
          </button>
          <button
            onClick={() => setMobileTab('dashboard')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'dashboard'
                ? 'btn-primary'
                : ''
            }`}
            style={mobileTab !== 'dashboard' ? { color: 'var(--text-muted)' } : {}}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 overflow-hidden">
          {/* Left Column: 3D Mascot Canvas + Order Tracker + Frequent Prompts */}
          <div
            className={`md:col-span-5 lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1 ${
              mobileTab === 'dashboard' ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* 3D Mascot Visualizer Box */}
            <div className="cf-card p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
              {/* Badge — matches the amber dot label from the app */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                style={{ background: 'var(--accent-dim)', borderColor: 'rgba(var(--accent), 0.2)', color: 'var(--accent)' }}>
                <span className="accent-dot w-1.5 h-1.5" />
                COMFORT FOOTWEAR 2026
              </div>

              {/* Shoe Mascot */}
              <ThreeMascot isTyping={isTyping} />
            </div>

            {/* Active Order Tracker Widget */}
            <OrderTrackerWidget onAskAboutOrder={handleSendMessage} />

            {/* Frequent Topics 3D Tilt Cards */}
            <QuickPrompts onSelectPrompt={handleSendMessage} />
          </div>

          {/* Right Column: Main Chat Panel */}
          <div
            className={`md:col-span-7 lg:col-span-7 h-full min-h-0 flex flex-col ${
              mobileTab === 'chat' ? 'flex' : 'hidden md:flex'
            }`}
          >
            <ChatContainer
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              soundEnabled={settings.soundEnabled}
            />
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleUpdateSettings}
      />
    </div>
  );
}
