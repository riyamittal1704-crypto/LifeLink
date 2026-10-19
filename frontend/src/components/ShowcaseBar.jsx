import React from 'react';
import { 
  Home, 
  LogIn, 
  PlusCircle, 
  Search, 
  Users, 
  Activity, 
  Building2, 
  Droplet, 
  UserCheck, 
  BellRing,
  Bot
} from 'lucide-react';

export const SCREENS = [
  { id: 'landing', label: '1. Landing', icon: Home },
  { id: 'auth', label: '2. Login / Auth', icon: LogIn },
  { id: 'request_form', label: '3. Request Form', icon: PlusCircle },
  { id: 'blood_search', label: '4. Blood Availability', icon: Search },
  { id: 'donor_match', label: '5. Donor Matches', icon: Users },
  { id: 'tracking', label: '6. Live Timeline', icon: Activity },
  { id: 'hospital_dash', label: '7a. Hospital Dash', icon: Building2 },
  { id: 'bloodbank_dash', label: '7b. Bank Dash', icon: Droplet },
  { id: 'donor_dash', label: '7c. Donor Dash', icon: UserCheck }
];

export default function ShowcaseBar({ 
  currentScreen, 
  setScreen, 
  onTriggerDonorAlert, 
  onOpenAIAssistant 
}) {
  return (
    <div className="showcase-navigator">
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {SCREENS.map((s) => {
          const Icon = s.icon;
          const isActive = currentScreen === s.id;
          return (
            <button
              key={s.id}
              className={`showcase-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setScreen(s.id)}
              title={s.label}
            >
              <Icon size={14} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 4px' }} />

      {/* Interactive Trigger Shortcuts */}
      <button 
        className="showcase-nav-btn"
        style={{ color: '#F87171', background: 'rgba(239, 68, 68, 0.15)' }}
        onClick={onTriggerDonorAlert}
        title="Simulate Emergency Alert Popup received by a donor"
      >
        <BellRing size={14} />
        <span>Simulate Donor Alert</span>
      </button>

      <button 
        className="showcase-nav-btn"
        style={{ color: '#60A5FA', background: 'rgba(59, 130, 246, 0.15)' }}
        onClick={onOpenAIAssistant}
        title="Open LifeLink Emergency AI Assistant"
      >
        <Bot size={14} />
        <span>AI Assistant</span>
      </button>
    </div>
  );
}
