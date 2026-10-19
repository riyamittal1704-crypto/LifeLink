import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Droplet, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

export default function AuthView({ setScreen, activeRole, setActiveRole }) {
  const [role, setRole] = useState(activeRole === 'guest' ? 'hospital' : activeRole);
  const [email, setEmail] = useState('hospital@domain.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSelect = (r) => {
    setRole(r);
    if (r === 'hospital') setEmail('hospital@domain.com');
    if (r === 'donor') setEmail('aarav.singh@gmail.com');
    if (r === 'bloodbank') setEmail('geu.bloodbank@lifelink.org');
    if (r === 'admin') setEmail('admin@lifelink.org');
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    setActiveRole(role);
    if (role === 'hospital') setScreen('hospital_dash');
    else if (role === 'bloodbank') setScreen('bloodbank_dash');
    else if (role === 'donor') setScreen('donor_dash');
    else setScreen('hospital_dash');
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '40px 20px 90px' }}>
      {/* 2. Login / Registration (Desktop) */}
      <div style={{
        maxWidth: '1080px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        minHeight: '620px'
      }}>
        {/* Left: Login Form */}
        <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#E52D3D',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Heart size={18} fill="white" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', color: '#0F172A' }}>
              LifeLink
            </span>
          </div>

          {/* Header */}
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
            Login to continue to LifeLink
          </p>

          {/* Role Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '28px',
            border: '1px solid #E2E8F0'
          }}>
            {[
              { id: 'hospital', label: 'Hospital' },
              { id: 'donor', label: 'Donor' },
              { id: 'bloodbank', label: 'Blood Bank' },
              { id: 'admin', label: 'Admin' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRoleSelect(item.id)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: role === item.id ? '#FFFFFF' : 'transparent',
                  color: role === item.id ? '#0F172A' : '#64748B',
                  boxShadow: role === item.id ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  border: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email or Hospital ID
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hospital@domain.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  color: '#0F172A'
                }}
                required
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  Password
                </label>
                <a href="#forgot" style={{ fontSize: '12.5px', color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    color: '#0F172A'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#E52D3D', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '14px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                width: '100%',
                marginTop: '6px'
              }}
            >
              <span>Login to Dashboard</span>
              <ArrowRight size={16} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '12px 0 6px',
              color: '#94A3B8',
              fontSize: '13px'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              <span style={{ padding: '0 12px' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            </div>

            <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#64748B' }}>
              Don't have an account?{' '}
              <a 
                onClick={() => {
                  setActiveRole(role);
                  if (role === 'donor') setScreen('donor_dash');
                  else setScreen('request_form');
                }} 
                style={{ color: '#E52D3D', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}
              >
                {role === 'hospital' ? 'Register Hospital' : role === 'donor' ? 'Register as Donor' : 'Register Organization'}
              </a>
            </div>
          </form>
        </div>

        {/* Right: Hospital Hero Banner with Glass Card */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.75)), url(/hospital.jpg) center/cover no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '40px'
        }}>
          {/* Quote Card */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px', lineHeight: 1.3 }}>
              "Faster access to blood means more lives saved."
            </h3>
            <p style={{ fontSize: '13.5px', color: '#E2E8F0', opacity: 0.9, lineHeight: 1.5, marginBottom: '16px' }}>
              Join a growing network of hospitals, donors and blood banks across India.
            </p>

            {/* Slide Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '20px', height: '6px', borderRadius: '4px', background: 'white' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
