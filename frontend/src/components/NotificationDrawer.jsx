import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Droplet, 
  CheckCircle2, 
  Heart, 
  MessageSquare, 
  Clock, 
  CheckCheck
} from 'lucide-react';
import { NOTIFICATIONS_LIST } from '../data/mockData';

export default function NotificationDrawer({ 
  isOpen, 
  onClose, 
  onTriggerDonorAlert, 
  setScreen 
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'requests' | 'updates' | 'messages'
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);

  if (!isOpen) return null;

  const filtered = notifications.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 10000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Drawer panel */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        height: '100%',
        background: '#FFFFFF',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: '#FFF1F2',
              color: '#E11D48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                Notifications
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Real-time network alerts
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={markAllAsRead}
              title="Mark all as read"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2563EB',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              style={{
                background: '#F1F5F9',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          padding: '12px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          gap: '6px'
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'requests', label: 'Requests' },
            { id: 'updates', label: 'Updates' },
            { id: 'messages', label: 'Messages' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '7px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                background: activeTab === tab.id ? '#E52D3D' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                border: activeTab === tab.id ? '1px solid #E52D3D' : '1px solid #E2E8F0',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#FFFFFF'
        }}>
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'request') {
                  onTriggerDonorAlert();
                  onClose();
                } else if (item.type === 'update') {
                  setScreen('tracking');
                  onClose();
                }
              }}
              style={{
                padding: '14px',
                borderRadius: '12px',
                background: item.unread ? '#FFF5F5' : '#F8FAFC',
                border: item.unread ? '1px solid #FECDD3' : '1px solid #E2E8F0',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: item.type === 'request' ? '#FFE4E6' : item.type === 'reminder' ? '#FFF1F2' : item.type === 'update' ? '#EFF6FF' : '#F1F5F9',
                color: item.type === 'request' ? '#E11D48' : item.type === 'reminder' ? '#E11D48' : item.type === 'update' ? '#2563EB' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.type === 'request' && <Droplet size={18} fill="#E11D48" />}
                {item.type === 'update' && <CheckCircle2 size={18} />}
                {item.type === 'reminder' && <Heart size={18} fill="#E11D48" />}
                {item.type === 'message' && <MessageSquare size={18} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', marginTop: '3px', lineHeight: 1.45 }}>
                  {item.description}
                </p>
              </div>

              {item.unread && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#E52D3D',
                  alignSelf: 'center',
                  flexShrink: 0
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            LifeLink Priority Notification Engine
          </div>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '12.5px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
