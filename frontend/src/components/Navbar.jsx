import React from 'react';
import { Heart, Bell, Search, User, ShieldCheck } from 'lucide-react';

export default function Navbar({ 
  currentScreen, 
  setScreen, 
  activeRole, 
  setActiveRole, 
  unreadNotifications, 
  onOpenNotifications 
}) {
  const isAppView = [
    'request_form', 
    'blood_search', 
    'donor_match', 
    'tracking', 
    'hospital_dash', 
    'bloodbank_dash', 
    'donor_dash'
  ].includes(currentScreen);

  return (
    <header className="top-nav">
      {/* Brand */}
      <div className="brand-logo" onClick={() => setScreen('landing')}>
        <div className="brand-icon">
          <Heart size={18} fill="white" />
        </div>
        <span className="brand-name">LifeLink</span>
      </div>

      {/* Main Nav Links (Showcase has these exact links) */}
      <nav className="nav-links">
        <a 
          className={`nav-link ${currentScreen === 'landing' ? 'active' : ''}`}
          onClick={() => setScreen('landing')}
        >
          Home
        </a>
        <a 
          className="nav-link"
          onClick={() => {
            setScreen('landing');
            setTimeout(() => {
              document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
        >
          About
        </a>
        <a 
          className="nav-link"
          onClick={() => {
            setScreen('landing');
            setTimeout(() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
        >
          How It Works
        </a>
        <a 
          className={`nav-link ${activeRole === 'hospital' && isAppView ? 'active' : ''}`}
          onClick={() => {
            setActiveRole('hospital');
            setScreen('hospital_dash');
          }}
        >
          For Hospitals
        </a>
        <a 
          className={`nav-link ${activeRole === 'donor' && isAppView ? 'active' : ''}`}
          onClick={() => {
            setActiveRole('donor');
            setScreen('donor_dash');
          }}
        >
          For Donors
        </a>
        <a 
          className={`nav-link ${activeRole === 'bloodbank' && isAppView ? 'active' : ''}`}
          onClick={() => {
            setActiveRole('bloodbank');
            setScreen('bloodbank_dash');
          }}
        >
          For Blood Banks
        </a>
      </nav>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Search icon */}
        <button 
          onClick={() => setScreen('blood_search')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Search Blood Availability"
        >
          <Search size={19} />
        </button>

        {/* Notification Bell */}
        <button 
          onClick={onOpenNotifications}
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Notifications & Mobile Alert Center"
        >
          <Bell size={19} />
          {unreadNotifications > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#E52D3D',
              color: 'white',
              fontSize: '10px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Role Quick Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F1F5F9',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid #E2E8F0'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            Role:
          </span>
          <select 
            value={activeRole} 
            onChange={(e) => {
              const r = e.target.value;
              setActiveRole(r);
              if (r === 'hospital') setScreen('hospital_dash');
              if (r === 'bloodbank') setScreen('bloodbank_dash');
              if (r === 'donor') setScreen('donor_dash');
              if (r === 'guest') setScreen('landing');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              color: '#0F172A',
              cursor: 'pointer'
            }}
          >
            <option value="hospital">Hospital (Graphic Era)</option>
            <option value="bloodbank">Blood Bank (GEU)</option>
            <option value="donor">Donor (Aarav Singh)</option>
            <option value="guest">Public Visitor</option>
          </select>
        </div>

        {/* Login & Get Started Buttons */}
        {currentScreen !== 'auth' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
              onClick={() => setScreen('auth')}
            >
              Login
            </button>
            <button 
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
              onClick={() => setScreen('request_form')}
            >
              Get Started
            </button>
          </div>
        ) : (
          <button 
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
            onClick={() => setScreen('landing')}
          >
            Back to Home
          </button>
        )}
      </div>
    </header>
  );
}
