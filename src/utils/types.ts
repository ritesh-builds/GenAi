export type Role = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  category?: 'order' | 'refund' | 'tracking' | 'policy' | 'general';
}

export interface AppSettings {
  backendUrl: string;
  useMock: boolean;
  soundEnabled: boolean;
  ttsEnabled: boolean;
  theme: 'dark' | 'light';
  autoScroll: boolean;
}

export interface QuickPrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'order' | 'refund' | 'tracking' | 'policy';
  iconName: string;
  gradient: string;
}

export interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

export interface MockOrder {
  id: string;
  restaurant: string;
  items: OrderItem[];
  total: string;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedMinutes: number;
  deliveryPartner: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
}
