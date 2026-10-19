import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, ShieldAlert, CheckCircle } from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your LifeLink AI Emergency Assistant. I can help calculate compatibility matching, evaluate donor eligibility criteria, or assist in rapid blood bank allocation. How can I help?"
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsgs = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgs);
    setInput('');

    // Simulated Smart Healthcare Responses
    setTimeout(() => {
      let reply = "Under LifeLink emergency protocols, all compatible blood units within 15 km are automatically prioritized. For critical cases (<2 hours), row-locked transactions ensure zero reservation collisions.";
      const lower = userText.toLowerCase();

      if (lower.includes('o-') || lower.includes('universal')) {
        reply = "O- is the universal red cell donor! However, O- stock is currently at 8 units in Dehradun. LifeLink recommends reserving O- strictly for emergency trauma when patient typing cannot be determined.";
      } else if (lower.includes('eligibility') || lower.includes('screening') || lower.includes('criteria')) {
        reply = "LifeLink Donor Eligibility Rule: Age 18–65, weight ≥ 45 kg, haemoglobin ≥ 12.5 g/dL, no alcohol in the past 24h, no smoking in past 1h, and minimum 90-day cooldown between whole blood donations.";
      } else if (lower.includes('priority') || lower.includes('rank') || lower.includes('score')) {
        reply = "Emergency requests are scored using Priority Rank (Critical = Rank 3, Urgent = Rank 2, Normal = Rank 1) combined with distance attenuation formula `Score = (UnitsAvailable / UnitsNeeded) * (1 / (1 + 0.1 * DistanceKm))`";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '520px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>LifeLink Emergency AI</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                Operational • OSDBMS-V Algorithm Connected
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Message History */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: '#F8FAFC'
        }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '82%',
                padding: '12px 16px',
                borderRadius: '16px',
                fontSize: '13.5px',
                lineHeight: 1.5,
                background: m.sender === 'user' ? '#E52D3D' : '#FFFFFF',
                color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                boxShadow: m.sender === 'user' ? 'none' : '0 2px 4px rgba(0,0,0,0.04)',
                border: m.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: m.sender === 'ai' ? '4px' : '16px'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', overflowX: 'auto', background: '#F1F5F9', borderTop: '1px solid #E2E8F0' }}>
          {["Check O- Universal rules", "Donor Eligibility Criteria", "Priority Queue calculation"].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => { setInput(chip); }}
              style={{
                fontSize: '11.5px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'white',
                border: '1px solid #CBD5E1',
                color: '#475569',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ padding: '14px 16px', background: 'white', display: 'flex', gap: '8px', borderTop: '1px solid #E2E8F0' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about blood groups, eligibility, urgency..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '13.5px'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '10px 16px', borderRadius: '10px' }}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
