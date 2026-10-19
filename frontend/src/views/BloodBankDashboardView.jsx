import React, { useState } from 'react';
import { 
  Droplet, 
  LayoutDashboard, 
  Layers, 
  Inbox, 
  Users, 
  MessageSquare, 
  User, 
  AlertTriangle, 
  Clock, 
  Flag, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';

export default function BloodBankDashboardView({ setScreen, onOpenAIAssistant }) {
  const [inventory, setInventory] = useState([
    { group: 'A+', units: 28, status: 'Sufficient' },
    { group: 'A-', units: 12, status: 'Sufficient' },
    { group: 'B+', units: 18, status: 'Sufficient' },
    { group: 'B-', units: 6, status: 'Low Stock' },
    { group: 'O+', units: 22, status: 'Sufficient' },
    { group: 'O-', units: 8, status: 'Low Stock' },
    { group: 'AB+', units: 4, status: 'Low Stock' },
    { group: 'AB-', units: 2, status: 'Critical' }
  ]);

  const totalUnits = inventory.reduce((acc, curr) => acc + curr.units, 0);

  const updateUnits = (group, delta) => {
    setInventory(prev => prev.map(item => {
      if (item.group === group) {
        const next = Math.max(0, item.units + delta);
        let status = 'Sufficient';
        if (next <= 2) status = 'Critical';
        else if (next <= 8) status = 'Low Stock';
        return { ...item, units: next, status };
      }
      return item;
    }));
  };

  return (
    <div className="app-layout-sidebar">
      {/* Sidebar (Blood Bank layout) */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-avatar" style={{ background: '#FFF1F2', color: '#E11D48' }}>
            <Droplet size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Blood Bank</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>GEU Blood Bank</div>
          </div>
        </div>

        <button className="sidebar-link active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button className="sidebar-link">
          <Layers size={18} />
          <span>Inventory</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('tracking')}>
          <Inbox size={18} />
          <span>Incoming Requests</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('donor_match')}>
          <Users size={18} />
          <span>Donor Management</span>
        </button>

        <button className="sidebar-link">
          <MessageSquare size={18} />
          <span>Messages</span>
        </button>

        <button className="sidebar-link">
          <User size={18} />
          <span>Profile</span>
        </button>

        {/* AI Assistant */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <div 
            onClick={onOpenAIAssistant}
            style={{
              background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
              border: '1px solid #FECDD3',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#E11D48" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#9F1239' }}>AI Assistant</span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#881337', lineHeight: 1.4 }}>
              MySQL row locking active on blood_inventory table.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Blood Bank Dashboard
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                GEU Blood Bank – Dehradun
              </p>
            </div>

            <button
              onClick={() => alert('Inventory synced with LifeLink central database.')}
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '14px' }}
            >
              <span>Update Inventory</span>
            </button>
          </div>

          {/* Metric Cards (Exact numbers from Showcase Screen 7b) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '28px'
          }}>
            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplet size={24} fill="#E11D48" />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>{totalUnits || 156}</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Total Units</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>12</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Low Stock</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>3</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Expiring Soon (&lt;7 days)</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flag size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>8</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Active Requests</div>
              </div>
            </div>
          </div>

          {/* 2 Columns: Current Inventory Left + Recent Requests Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', alignItems: 'start' }}>
            {/* Left: Current Inventory Table */}
            <div className="ui-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                Current Inventory
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Blood Group</th>
                      <th style={{ padding: '12px 14px' }}>Available Units</th>
                      <th style={{ padding: '12px 14px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Quick Adjust</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.group} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                          {item.group}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 700 }}>
                          {item.units}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {item.status === 'Sufficient' && (
                            <span className="badge badge-success" style={{ fontSize: '11.5px' }}>
                              Sufficient
                            </span>
                          )}
                          {item.status === 'Low Stock' && (
                            <span className="badge badge-high" style={{ background: '#FEF3C7', color: '#B45309', fontSize: '11.5px' }}>
                              Low Stock
                            </span>
                          )}
                          {item.status === 'Critical' && (
                            <span className="badge badge-critical" style={{ fontSize: '11.5px' }}>
                              Critical
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              onClick={() => updateUnits(item.group, -1)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                background: '#F1F5F9',
                                border: '1px solid #CBD5E1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Minus size={12} />
                            </button>
                            <button
                              onClick={() => updateUnits(item.group, 1)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                background: '#F1F5F9',
                                border: '1px solid #CBD5E1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Recent Requests Queue */}
            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  Recent Requests
                </h3>
                <a onClick={() => setScreen('tracking')} style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span>View All</span>
                  <ChevronRight size={14} />
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { id: 'REQ-2026-0842', group: 'O+', time: '10:24 AM', urgency: 'High' },
                  { id: 'REQ-2026-0839', group: 'A+', time: '09:15 AM', urgency: 'Medium' },
                  { id: 'REQ-2026-0831', group: 'B+', time: '08:42 AM', urgency: 'High' },
                  { id: 'REQ-2026-0827', group: 'O-', time: 'Yesterday', urgency: 'Low' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setScreen('tracking')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>
                        {item.id}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontWeight: 800, color: '#E11D48' }}>{item.group}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>

                    <span
                      className={`badge ${
                        item.urgency === 'High' ? 'badge-high' : item.urgency === 'Medium' ? 'badge-medium' : 'badge-info'
                      }`}
                      style={{ fontSize: '11px', padding: '2px 8px' }}
                    >
                      {item.urgency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
