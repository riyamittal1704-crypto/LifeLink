import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  ChevronRight, 
  Sparkles,
  Users,
  Droplet
} from 'lucide-react';
import { INITIAL_REQUESTS } from '../data/mockData';

export default function HospitalDashboardView({ setScreen, onOpenAIAssistant }) {
  return (
    <div className="app-layout-sidebar">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-avatar" style={{ background: '#FFF1F2', color: '#E11D48' }}>
            <Building2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Hospital</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Graphic Era Hospital</div>
          </div>
        </div>

        <button className="sidebar-link active" onClick={() => setScreen('hospital_dash')}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('request_form')}>
          <PlusCircle size={18} />
          <span>New Blood Request</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('tracking')}>
          <FileText size={18} />
          <span>My Requests</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('donor_match')}>
          <MessageSquare size={18} />
          <span>Messages & Donors</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('hospital_dash')}>
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
              Active hospital priority node with zero lock contention.
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
                Hospital Dashboard
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                Welcome back, Graphic Era Hospital
              </p>
            </div>

            <button
              onClick={() => setScreen('request_form')}
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '14px' }}
            >
              <PlusCircle size={16} />
              <span>New Request</span>
            </button>
          </div>

          {/* Metric Cards (Exact numbers from Showcase Screen 7a) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '28px'
          }}>
            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>12</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Total Requests</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>8</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Fulfilled</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>2</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>In Progress</div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>2</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Pending</div>
              </div>
            </div>
          </div>

          {/* 2-Column Content: Recent Requests Left + Widgets Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '28px', alignItems: 'start' }}>
            {/* Left: Recent Requests Table (Exact from Showcase Screen 7a) */}
            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>Recent Requests</h3>
                <a onClick={() => setScreen('tracking')} style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span>View All</span>
                  <ChevronRight size={14} />
                </a>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 14px' }}>Request ID</th>
                      <th style={{ padding: '12px 10px' }}>Blood Group</th>
                      <th style={{ padding: '12px 10px' }}>Units</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 12px' }}>Created</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_REQUESTS.map((r) => (
                      <tr 
                        key={r.id} 
                        style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '14px', fontSize: '13px', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>
                          {r.id}
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13.5px', fontWeight: 800, color: '#E11D48' }}>
                          {r.bloodGroup}
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13.5px', fontWeight: 600 }}>
                          {r.units}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          {r.status === 'in_progress' && (
                            <span className="badge badge-high" style={{ background: '#FEF3C7', color: '#B45309' }}>In Progress</span>
                          )}
                          {r.status === 'fulfilled' && (
                            <span className="badge badge-success">Fulfilled</span>
                          )}
                          {r.status === 'canceled' && (
                            <span className="badge" style={{ background: '#F1F5F9', color: '#64748B' }}>Canceled</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12.5px', color: '#64748B' }}>
                          {r.submittedTime}
                        </td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          <button
                            onClick={() => setScreen('tracking')}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#2563EB',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Availability Gauge + Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Circular Gauge Card (Exact from Showcase Screen 7a) */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Blood Availability Near You
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
                  {/* Gauge Graphic */}
                  <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0D9488"
                        strokeDasharray="82, 100"
                        strokeWidth="3.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '18px',
                      color: '#0F172A'
                    }}>
                      82%
                      <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 600, marginTop: '-2px' }}>Available</span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                      <span style={{ color: '#64748B' }}>Available</span>
                      <strong style={{ color: '#0F172A', marginLeft: 'auto' }}>154 units</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                      <span style={{ color: '#64748B' }}>Low Stock</span>
                      <strong style={{ color: '#0F172A', marginLeft: 'auto' }}>24 units</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                      <span style={{ color: '#64748B' }}>Out of Stock</span>
                      <strong style={{ color: '#0F172A', marginLeft: 'auto' }}>12 units</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setScreen('blood_search')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2563EB',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </div>

              {/* Quick Actions (Exact from Showcase Screen 7a) */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                  Quick Actions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setScreen('request_form')}
                    className="sidebar-link"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontWeight: 600 }}
                  >
                    <PlusCircle size={16} color="#E11D48" />
                    <span>New Blood Request</span>
                  </button>

                  <button
                    onClick={() => setScreen('blood_search')}
                    className="sidebar-link"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontWeight: 600 }}
                  >
                    <Droplet size={16} color="#2563EB" />
                    <span>Message Blood Banks</span>
                  </button>

                  <button
                    onClick={() => setScreen('donor_match')}
                    className="sidebar-link"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontWeight: 600 }}
                  >
                    <Users size={16} color="#10B981" />
                    <span>View Donor Network</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
