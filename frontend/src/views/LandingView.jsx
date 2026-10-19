import React, { useState } from 'react';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Building2, 
  Droplet, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Activity,
  Flame,
  Radio
} from 'lucide-react';
import { COMPATIBILITY_MATRIX } from '../data/mockData';

export default function LandingView({ setScreen, setActiveRole, onTriggerDonorAlert }) {
  const [selectedGroup, setSelectedGroup] = useState('O+');

  const compatibleTypes = COMPATIBILITY_MATRIX[selectedGroup] || [];

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '56px 32px 64px',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        alignItems: 'center',
        gap: '48px'
      }}>
        {/* Left Column: Text & Hero CTA */}
        <div>
          {/* Top Pill Tags (from Showcase Screen 1) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: '#FFF1F2',
              color: '#E11D48',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid #FECDD3'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E11D48' }} />
              National Network
            </span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: '#EFF6FF',
              color: '#2563EB',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid #BFDBFE'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
              Real-time Availability
            </span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: '#F0FDF4',
              color: '#16A34A',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid #BBF7D0'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} />
              Saving Lives Together
            </span>
          </div>

          {/* Headline (Exact words from Showcase) */}
          <h1 style={{
            fontSize: '56px',
            lineHeight: 1.08,
            fontWeight: 900,
            color: '#0F172A',
            marginBottom: '20px',
            fontFamily: 'Plus Jakarta Sans',
            letterSpacing: '-0.03em'
          }}>
            When Every <br/>
            Second <span style={{
              background: 'linear-gradient(135deg, #E52D3D 0%, #BE123C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Counts</span>,<br/>
            Lives <span style={{
              background: 'linear-gradient(135deg, #E52D3D 0%, #BE123C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Connect.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '17px',
            color: '#475569',
            lineHeight: 1.6,
            maxWidth: '540px',
            marginBottom: '36px'
          }}>
            LifeLink bridges the gap between hospitals, blood banks and donors — ensuring timely access to blood, anywhere, anytime.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setActiveRole('hospital');
                setScreen('request_form');
              }}
              className="btn-primary"
              style={{
                padding: '16px 28px',
                fontSize: '16px',
                borderRadius: '12px',
                fontWeight: 700
              }}
            >
              <span>Request Blood Urgently</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setActiveRole('donor');
                setScreen('donor_dash');
              }}
              className="btn-secondary"
              style={{
                padding: '16px 28px',
                fontSize: '16px',
                borderRadius: '12px',
                fontWeight: 600
              }}
            >
              Become a Donor
            </button>
          </div>

          {/* Live emergency indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '28px',
            padding: '8px 14px',
            background: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            color: '#64748B'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'inline-block'
            }} />
            <span>Priority Queue Active: <strong>Graphic Era Network, Dehradun</strong></span>
          </div>
        </div>

        {/* Right Column: Interactive Central LifeLink Connection Diagram */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Circular glow background */}
          <div style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(229, 45, 61, 0.12) 0%, rgba(229, 45, 61, 0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }} />

          {/* Visual Canvas Diagram */}
          <div style={{
            position: 'relative',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            border: '1px dashed #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            {/* Center Pulsing Blood Drop Node */}
            <div 
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF4D5E 0%, #E52D3D 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 12px 30px rgba(229, 45, 61, 0.4)',
                position: 'relative',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onClick={onTriggerDonorAlert}
              title="Click to trigger emergency alert simulation"
            >
              <Droplet size={36} fill="white" />
              <span style={{ fontSize: '11px', fontWeight: 800, marginTop: '2px', letterSpacing: '0.04em' }}>LIFELINK</span>
            </div>

            {/* Orbit Node 1: Blood Banks (Top Left) */}
            <div 
              onClick={() => {
                setActiveRole('bloodbank');
                setScreen('bloodbank_dash');
              }}
              style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Droplet size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Blood Banks</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>Live Inventory</div>
              </div>
            </div>

            {/* Orbit Node 2: Donors (Top Right) */}
            <div 
              onClick={() => {
                setActiveRole('donor');
                setScreen('donor_dash');
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#FFF1F2',
                color: '#E11D48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Donors</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>People like you</div>
              </div>
            </div>

            {/* Orbit Node 3: Hospitals (Bottom Center) */}
            <div 
              onClick={() => {
                setActiveRole('hospital');
                setScreen('hospital_dash');
              }}
              style={{
                position: 'absolute',
                bottom: '15px',
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 20px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#F0FDF4',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Hospitals</div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>Emergency requests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip (Exact values from Showcase Screen 1) */}
      <section style={{
        background: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '36px 32px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          <div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
              500+
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
              Registered Blood Banks
            </div>
          </div>

          <div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
              50,000+
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
              Verified Donors
            </div>
          </div>

          <div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
              2,000+
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
              Hospitals Connected
            </div>
          </div>

          <div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#E11D48', fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
              Lives Saved
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
              Every Single Day
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Blood Compatibility Tool */}
      <section id="how-it-works" style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="badge badge-critical" style={{ marginBottom: '12px' }}>Interactive Transfusion Matrix</span>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            Check Emergency Blood Compatibility
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
            Powered by LifeLink's 27 verified medical compatibility rules from MySQL schema. Select a patient blood group to see valid donor groups.
          </p>
        </div>

        {/* Group Selector Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              style={{
                padding: '12px 22px',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 700,
                background: selectedGroup === bg ? '#E52D3D' : '#FFFFFF',
                color: selectedGroup === bg ? '#FFFFFF' : '#334155',
                border: selectedGroup === bg ? '1px solid #E52D3D' : '1px solid #CBD5E1',
                boxShadow: selectedGroup === bg ? '0 4px 12px var(--primary-glow)' : 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* Matching Result Card */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '28px',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '13px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '8px' }}>
            Patient Needs: <span style={{ color: '#E11D48', fontWeight: 900, fontSize: '18px' }}>{selectedGroup}</span>
          </div>
          <div style={{ fontSize: '16px', color: '#1E293B', marginBottom: '20px' }}>
            Compatible Donor Groups accepted:
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {compatibleTypes.map((type) => (
              <span
                key={type}
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: '2px solid #E11D48',
                  padding: '8px 18px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(225, 29, 72, 0.15)'
                }}
              >
                {type}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '24px', fontSize: '13px', color: '#64748B' }}>
            {selectedGroup === 'O-' && "ℹ️ O- is the universal donor, but can only receive O- blood."}
            {selectedGroup === 'AB+' && "ℹ️ AB+ is the universal recipient and can safely receive any blood type!"}
            {selectedGroup === 'O+' && "ℹ️ O+ is the most common emergency request, compatible with O+ and O-."}
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Flow */}
      <section id="about-section" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '64px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-info" style={{ marginBottom: '12px' }}>Engineered For Speed</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A' }}>
              How LifeLink Handles An Emergency
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 800 }}>1</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Emergency Request</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Hospital inputs blood type, units, and urgency level. Stored procedure assigns priority rank 1 to 3.
              </p>
            </div>

            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 800 }}>2</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Stock Row Lock</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Nearby blood banks holding compatible stock are scored. Row-level locks prevent duplicate unit allocation.
              </p>
            </div>

            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 800 }}>3</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Donor Geofence Alert</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                If stock is insufficient, nearby eligible donors receive an immediate popup alert to accept or reject.
              </p>
            </div>

            <div className="ui-card" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 800 }}>4</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Live Dispatch</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Hospital tracks live courier and donor ETA in real time until units are delivered to the operating theatre.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
