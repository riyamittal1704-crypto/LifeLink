import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  User, 
  Bot, 
  MapPin, 
  PhoneCall, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function EmergencyRequestView({ 
  setScreen, 
  onOpenAIAssistant, 
  onCreateRequest 
}) {
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [units, setUnits] = useState(4);
  const [urgency, setUrgency] = useState('critical'); // 'critical' | 'high' | 'medium'
  const [hospitalName, setHospitalName] = useState('Graphic Era Hospital');
  const [location, setLocation] = useState('Dehradun, Uttarakhand');
  const [patientCondition, setPatientCondition] = useState('Trauma surgery in Emergency OT-3. Acute hemorrhagic shock, immediate packed red cells required.');
  const [isLocating, setIsLocating] = useState(false);

  const handleUseLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Graphic Era Hospital (30.2704° N, 77.9961° E), Dehradun');
      setIsLocating(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreateRequest) {
      onCreateRequest({
        bloodGroup,
        units,
        urgency,
        hospitalName,
        location,
        patientCondition
      });
    }
    // Navigate directly to Live Blood Availability Search Results (Screen 4)
    setScreen('blood_search');
  };

  return (
    <div className="app-layout-sidebar">
      {/* Left Sidebar (From Showcase Screen 3) */}
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

        <button 
          className="sidebar-link"
          onClick={() => setScreen('hospital_dash')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button 
          className="sidebar-link active"
          onClick={() => setScreen('request_form')}
        >
          <PlusCircle size={18} />
          <span>New Blood Request</span>
        </button>

        <button 
          className="sidebar-link"
          onClick={() => setScreen('tracking')}
        >
          <FileText size={18} />
          <span>My Requests</span>
        </button>

        <button 
          className="sidebar-link"
          onClick={() => setScreen('donor_match')}
        >
          <MessageSquare size={18} />
          <span>Messages & Donors</span>
        </button>

        <button 
          className="sidebar-link"
          onClick={() => setScreen('hospital_dash')}
        >
          <User size={18} />
          <span>Profile</span>
        </button>

        {/* AI Assistant Docked Card */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <div 
            onClick={onOpenAIAssistant}
            style={{
              background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
              border: '1px solid #FECDD3',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: '#E11D48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Sparkles size={16} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#9F1239' }}>AI Assistant</span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#881337', lineHeight: 1.4 }}>
              Get help with emergency requests and smart matching.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Form Content */}
      <main className="main-content">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
              Create Emergency Blood Request
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Submit your requirement and we'll find the fastest available sources
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '28px', alignItems: 'start' }}>
            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 1. Blood Requirement Section */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Blood Requirement
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  {/* Blood Group */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      Blood Group
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '15px',
                        fontWeight: 700,
                        background: 'white',
                        color: '#0F172A'
                      }}
                    >
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Units Required Stepper */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      Units Required
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setUnits(Math.max(1, units - 1))}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#F1F5F9',
                          border: '1px solid #CBD5E1',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#334155'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={units}
                        onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
                        style={{
                          width: '60px',
                          height: '44px',
                          textAlign: 'center',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '16px',
                          fontWeight: 800
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setUnits(units + 1)}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#F1F5F9',
                          border: '1px solid #CBD5E1',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#334155'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
                      1 unit = 350 ml ({units * 350} ml total)
                    </div>
                  </div>
                </div>

                {/* Urgency Level Selector Cards */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '10px' }}>
                    Urgency Level
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {/* Critical */}
                    <div
                      onClick={() => setUrgency('critical')}
                      style={{
                        padding: '14px 12px',
                        borderRadius: '12px',
                        border: urgency === 'critical' ? '2px solid #E11D48' : '1px solid #E2E8F0',
                        background: urgency === 'critical' ? '#FFF1F2' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#E11D48', marginBottom: '2px' }}>
                        Critical
                      </div>
                      <div style={{ fontSize: '11px', color: '#9F1239', fontWeight: 600 }}>
                        (0-2 hours)
                      </div>
                    </div>

                    {/* High */}
                    <div
                      onClick={() => setUrgency('high')}
                      style={{
                        padding: '14px 12px',
                        borderRadius: '12px',
                        border: urgency === 'high' ? '2px solid #EA580C' : '1px solid #E2E8F0',
                        background: urgency === 'high' ? '#FFF7ED' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#EA580C', marginBottom: '2px' }}>
                        High
                      </div>
                      <div style={{ fontSize: '11px', color: '#9A3412', fontWeight: 600 }}>
                        (2-6 hours)
                      </div>
                    </div>

                    {/* Medium */}
                    <div
                      onClick={() => setUrgency('medium')}
                      style={{
                        padding: '14px 12px',
                        borderRadius: '12px',
                        border: urgency === 'medium' ? '2px solid #CA8A04' : '1px solid #E2E8F0',
                        background: urgency === 'medium' ? '#FEFCE8' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#CA8A04', marginBottom: '2px' }}>
                        Medium
                      </div>
                      <div style={{ fontSize: '11px', color: '#854D0E', fontWeight: 600 }}>
                        (6-24 hours)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Hospital Information Section */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Hospital Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        color: '#0F172A'
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                        Location
                      </label>
                      <button
                        type="button"
                        onClick={handleUseLocation}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#2563EB',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MapPin size={12} />
                        <span>{isLocating ? 'Locating...' : 'Use my location'}</span>
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 34px 12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          color: '#0F172A'
                        }}
                      />
                      <MapPin size={16} color="#94A3B8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Additional Details Section */}
              <div className="ui-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    Additional Details
                  </h3>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {patientCondition.length}/500
                  </span>
                </div>

                <textarea
                  value={patientCondition}
                  onChange={(e) => setPatientCondition(e.target.value.slice(0, 500))}
                  placeholder="Patient condition, any specific requirements, ward/OT number..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    color: '#0F172A',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    boxShadow: '0 8px 20px rgba(229, 45, 61, 0.3)'
                  }}
                >
                  <span>Submit Emergency Request</span>
                  <ArrowRight size={18} />
                </button>
                <div style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  You'll get instant matches from blood banks and nearby donors.
                </div>
              </div>
            </div>

            {/* Right Help Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="ui-card" style={{ padding: '24px', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Need Help?</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Call our 24/7 emergency dispatch</div>
                  </div>
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#0F172A',
                  fontFamily: 'Plus Jakarta Sans',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px'
                }}>
                  1800 121 4455
                </div>

                <div style={{
                  padding: '12px',
                  background: 'white',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '12px',
                  color: '#475569',
                  lineHeight: 1.5
                }}>
                  Direct line to Dehradun zone trauma logistics coordinator. Priority dispatch with green corridor assistance.
                </div>
              </div>

              {/* Urgency SLA Card */}
              <div className="ui-card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Network Response Guarantee
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Average blood bank match in <strong>1.8 mins</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Automated donor broadcast to 50 km radius</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Row lock concurrency prevents race conditions</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
