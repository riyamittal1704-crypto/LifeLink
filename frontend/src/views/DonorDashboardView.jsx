import React, { useState } from 'react';
import { 
  UserCheck, 
  LayoutDashboard, 
  User, 
  History, 
  Bell, 
  MapPin, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Droplet
} from 'lucide-react';

export default function DonorDashboardView({ 
  setScreen, 
  onTriggerDonorAlert, 
  onOpenAIAssistant,
  onOpenNotifications 
}) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [reminderSet, setReminderSet] = useState(false);
  const [showScreening, setShowScreening] = useState(false);

  // Screening state based on 02_features.sql
  const [screening, setScreening] = useState({
    weight: 68,
    haemoglobin: 14.2,
    recentInfection: false,
    onMedication: false,
    alcohol24h: false,
    smoked1h: false
  });
  const [screeningResult, setScreeningResult] = useState(null);

  const handleRunScreening = (e) => {
    e.preventDefault();
    if (screening.weight >= 45 && screening.haemoglobin >= 12.5 && !screening.alcohol24h) {
      setScreeningResult({ eligible: true, message: "Eligible! Verified according to MoHFW & LifeLink database rules." });
    } else {
      setScreeningResult({ eligible: false, message: "Temporarily ineligible based on physiological criteria (Weight >= 45 kg, Hb >= 12.5 g/dL required)." });
    }
  };

  return (
    <div className="app-layout-sidebar">
      {/* Donor Sidebar (From Showcase Screen 7c) */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-avatar" style={{ background: '#FFF1F2', color: '#E11D48' }}>
            <UserCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Donor</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Aarav Singh</div>
          </div>
        </div>

        <button className="sidebar-link active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button className="sidebar-link" onClick={() => setShowScreening(!showScreening)}>
          <ShieldCheck size={18} />
          <span>Eligibility Check</span>
        </button>

        <button className="sidebar-link">
          <User size={18} />
          <span>My Profile</span>
        </button>

        <button className="sidebar-link">
          <History size={18} />
          <span>Donation History</span>
        </button>

        <button className="sidebar-link" onClick={onOpenNotifications}>
          <Bell size={18} />
          <span>Notifications</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('blood_search')}>
          <MapPin size={18} />
          <span>Find Blood Banks</span>
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
              Eligible for emergency broadcast in Dehradun quadrant.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
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
                Donor Dashboard
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                Welcome back, Aarav!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onTriggerDonorAlert}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <Heart size={14} fill="white" />
                <span>Test Alert Popup</span>
              </button>

              <button
                onClick={() => setShowScreening(true)}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <span>View Profile</span>
              </button>
            </div>
          </div>

          {/* Metric Cards (Exact from Showcase Screen 7c) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {/* Card 1: Blood Group */}
            <div className="ui-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: '#FFF1F2',
                color: '#E11D48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Droplet size={26} fill="#E11D48" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#E11D48', lineHeight: 1 }}>
                  O+
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                  Your Blood Group
                </div>
              </div>
            </div>

            {/* Card 2: Total Donations */}
            <div className="ui-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={24} fill="#2563EB" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                  3
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                  Total Donations
                </div>
              </div>
            </div>

            {/* Card 3: Current Status Toggle */}
            <div className="ui-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: isAvailable ? '#ECFDF5' : '#F1F5F9',
                  color: isAvailable ? '#059669' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserCheck size={24} />
                </div>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: isAvailable ? '#059669' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAvailable ? '#10B981' : '#94A3B8' }} />
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                    Current Status
                  </div>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                style={{
                  width: '46px',
                  height: '26px',
                  borderRadius: '13px',
                  background: isAvailable ? '#10B981' : '#CBD5E1',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: isAvailable ? '23px' : '3px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'left 0.2s ease'
                }} />
              </button>
            </div>
          </div>

          {/* Hero Banner Card: Be Ready to Save Lives (Exact from Showcase Screen 7c) */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
            border: '1px solid #FECDD3',
            borderRadius: '20px',
            padding: '28px 32px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#9F1239', marginBottom: '6px' }}>
                Be Ready to Save Lives
              </h2>
              <p style={{ fontSize: '14.5px', color: '#881337', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} />
                <span>You can donate again in <strong>28 days</strong>. Last donated: 15 Aug 2026</span>
              </p>
            </div>

            <button
              onClick={() => {
                setReminderSet(true);
                alert('Reminder scheduled! LifeLink will notify you when your 90-day cooldown concludes.');
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: '#FFFFFF',
                color: '#9F1239',
                border: '1px solid #FECDD3',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(159, 18, 57, 0.08)'
              }}
            >
              <Calendar size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              <span>{reminderSet ? 'Reminder Set ✓' : 'Set Reminder'}</span>
            </button>
          </div>

          {/* Optional Screening Drawer/Section */}
          {showScreening && (
            <div className="ui-card" style={{ padding: '24px', marginBottom: '28px', border: '2px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  Official Donor Eligibility Screening (Table: donor_screening)
                </h3>
                <button 
                  onClick={() => setShowScreening(false)} 
                  style={{ background: 'transparent', border: 'none', color: '#64748B', fontWeight: 600, fontSize: '13px' }}
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleRunScreening} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Weight (kg) - Min 45 kg
                  </label>
                  <input
                    type="number"
                    value={screening.weight}
                    onChange={(e) => setScreening({ ...screening, weight: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Haemoglobin (g/dL) - Min 12.5
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={screening.haemoglobin}
                    onChange={(e) => setScreening({ ...screening, haemoglobin: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    Evaluate Eligibility
                  </button>
                </div>
              </form>

              {screeningResult && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: screeningResult.eligible ? '#ECFDF5' : '#FFF1F2',
                  color: screeningResult.eligible ? '#065F46' : '#9F1239',
                  fontSize: '13.5px',
                  fontWeight: 600
                }}>
                  {screeningResult.message}
                </div>
              )}
            </div>
          )}

          {/* Recent Activities Section (Exact from Showcase Screen 7c) */}
          <div className="ui-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
              Recent Activities
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Activity 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={20} fill="#059669" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>
                      Donation Completed
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                      15 Aug 2026 • Doon Medical College
                    </div>
                  </div>
                </div>

                <span className="badge badge-success" style={{ fontSize: '12px', fontWeight: 800 }}>
                  +1 Life
                </span>
              </div>

              {/* Activity 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Droplet size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>
                      Matched for Emergency Request
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                      12 Jan 2026 • Not donated (was unavailable)
                    </div>
                  </div>
                </div>

                <span className="badge" style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px' }}>
                  Helped
                </span>
              </div>

              {/* Activity 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>
                      Profile Verified
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                      05 Jan 2026
                    </div>
                  </div>
                </div>

                <span className="badge badge-success" style={{ fontSize: '12px' }}>
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
