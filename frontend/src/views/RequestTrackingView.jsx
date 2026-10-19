import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  User, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Truck, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_REQUESTS } from '../data/mockData';

export default function RequestTrackingView({ setScreen, onOpenAIAssistant }) {
  const req = INITIAL_REQUESTS[0];
  const [copied, setCopied] = useState(false);
  const [progressWidth, setProgressWidth] = useState(72);

  // Subtle live progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressWidth(prev => (prev >= 95 ? 72 : prev + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <button className="sidebar-link" onClick={() => setScreen('hospital_dash')}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('request_form')}>
          <PlusCircle size={18} />
          <span>New Blood Request</span>
        </button>

        <button className="sidebar-link active" onClick={() => setScreen('tracking')}>
          <FileText size={18} />
          <span>My Requests & Tracking</span>
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
              Tracking ETA and cold-chain courier logistics in real time.
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', fontFamily: 'Plus Jakarta Sans' }}>
                  Request #{req.id}
                </h1>
                <span className="badge badge-critical" style={{ fontSize: '12px', padding: '4px 12px' }}>
                  Critical
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, color: '#E11D48' }}>{req.bloodGroup}</span>
                <span>•</span>
                <span>{req.units} units</span>
                <span>•</span>
                <span>{req.hospital}</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <Share2 size={14} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Grid Layout: Timeline Left + Details Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '28px', alignItems: 'start' }}>
            {/* Left: Stepper Timeline (Exact from Showcase Screen 6) */}
            <div className="ui-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
                {/* Vertical continuous line */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  bottom: '24px',
                  left: '18px',
                  width: '2px',
                  background: '#E2E8F0',
                  zIndex: 0
                }} />

                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Request Submitted</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Today, 10:24 AM</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                      Your emergency request has been submitted
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#0284C7',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                  }}>
                    <Search size={18} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Searching Network</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Today, 10:24 AM</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                      Checking blood banks and nearby donors
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#0D9488',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Matches Found</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Today, 10:26 AM</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', flexWrap: 'wrap', gap: '8px' }}>
                      <p style={{ fontSize: '13.5px', color: '#64748B' }}>
                        2 blood banks • 8 potential donors
                      </p>
                      <button
                        onClick={() => setScreen('donor_match')}
                        className="btn-secondary"
                        style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '6px' }}
                      >
                        View Matches
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#0D9488',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Blood Bank Confirmed</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Today, 10:32 AM</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                      Doon Medical College Blood Bank confirmed 2 units
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#0D9488',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Donor Confirmed</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Today, 10:35 AM</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                      2 donors confirmed and contacted
                    </p>
                  </div>
                </div>

                {/* Step 6 (Current/Active) */}
                <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#E11D48',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 6px rgba(225, 29, 72, 0.15)'
                  }}>
                    <Truck size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#E11D48' }}>Fulfillment in Progress</h4>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        background: '#FFF1F2',
                        color: '#E11D48',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        Estimated: 11:15 AM
                      </span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px', marginBottom: '12px' }}>
                      Blood collection and delivery in progress
                    </p>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${progressWidth}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #E52D3D 0%, #10B981 100%)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Request Details & Live Activity Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Request Details Card (Exact fields from Showcase Screen 6) */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Request Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Blood Group</span>
                    <span style={{ fontWeight: 800, color: '#E11D48' }}>{req.bloodGroup}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Units Required</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{req.units}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Urgency</span>
                    <span className="badge badge-critical">Critical</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Hospital</span>
                    <span style={{ fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>{req.hospital}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Location</span>
                    <span style={{ color: '#0F172A', textAlign: 'right' }}>{req.city}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Request ID</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{req.id}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Submitted</span>
                    <span style={{ color: '#0F172A', textAlign: 'right' }}>{req.submittedFullDate}</span>
                  </div>
                </div>
              </div>

              {/* Live Updates Card (Exact items from Showcase Screen 6) */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    Live Updates
                  </h3>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                        Doon Medical College confirmed 2 units
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        10:32 AM
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                        Aarav Singh is on the way to donate
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        10:36 AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
