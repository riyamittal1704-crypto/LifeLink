import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  User, 
  Share2, 
  Edit3, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { BLOOD_BANKS } from '../data/mockData';

export default function BloodSearchAvailabilityView({ 
  setScreen, 
  activeRequest, 
  onAllocateBloodBank,
  onOpenAIAssistant 
}) {
  const [activeTab, setActiveTab] = useState('nearby'); // 'nearby' | 'additional'
  const [requestedBanks, setRequestedBanks] = useState({});
  const [copied, setCopied] = useState(false);

  const req = activeRequest || {
    id: "REQ-2026-0842",
    bloodGroup: "O+",
    units: 4,
    city: "Dehradun"
  };

  const handleRequestBank = (bank) => {
    setRequestedBanks(prev => ({ ...prev, [bank.id]: true }));
    if (onAllocateBloodBank) {
      onAllocateBloodBank(bank);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-layout-sidebar">
      {/* Left Sidebar */}
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

        <button className="sidebar-link active" onClick={() => setScreen('blood_search')}>
          <FileText size={18} />
          <span>Availability Search</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('donor_match')}>
          <MessageSquare size={18} />
          <span>Donor Matching</span>
        </button>

        <button className="sidebar-link" onClick={() => setScreen('tracking')}>
          <Clock size={18} />
          <span>Track Live Status</span>
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
              Scoring blood banks by distance and unit availability.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Header & Query Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Blood Availability
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B' }}>
                Live inventory from registered blood banks near you
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Query Pill */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#0F172A',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#E11D48' }}>{req.bloodGroup}</span>
                <span>•</span>
                <span>{req.units} units</span>
                <span>•</span>
                <span>{req.city || 'Dehradun'}</span>
              </div>

              <button
                onClick={() => setScreen('request_form')}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
              >
                <Edit3 size={13} />
                <span>Edit Search</span>
              </button>

              <button
                onClick={handleShare}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
              >
                <Share2 size={13} />
                <span>{copied ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Source Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('nearby')}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                background: activeTab === 'nearby' ? '#E52D3D' : '#FFFFFF',
                color: activeTab === 'nearby' ? '#FFFFFF' : '#64748B',
                border: activeTab === 'nearby' ? '1px solid #E52D3D' : '1px solid #E2E8F0',
                boxShadow: activeTab === 'nearby' ? '0 4px 10px rgba(229, 45, 61, 0.25)' : 'none',
                cursor: 'pointer'
              }}
            >
              Nearby Blood Banks (12)
            </button>

            <button
              onClick={() => setActiveTab('additional')}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 600,
                background: activeTab === 'additional' ? '#E52D3D' : '#FFFFFF',
                color: activeTab === 'additional' ? '#FFFFFF' : '#64748B',
                border: activeTab === 'additional' ? '1px solid #E52D3D' : '1px solid #E2E8F0',
                cursor: 'pointer'
              }}
            >
              Additional Sources (5)
            </button>

            <button
              onClick={() => setScreen('donor_match')}
              style={{
                marginLeft: 'auto',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                background: '#FFF1F2',
                color: '#E11D48',
                border: '1px solid #FECDD3',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View Donor Matches (Screen 5)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Table List (Matching Showcase Screen 4 exactly) */}
          <div className="ui-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '16px 24px' }}>Blood Bank</th>
                  <th style={{ padding: '16px 20px' }}>Distance</th>
                  <th style={{ padding: '16px 20px' }}>Available Units</th>
                  <th style={{ padding: '16px 20px' }}>Last Updated</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_BANKS.map((bank) => {
                  const isRequested = requestedBanks[bank.id];
                  const hasStock = bank.availableUnits > 0;

                  return (
                    <tr 
                      key={bank.id}
                      style={{ 
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Name & Location */}
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: '#FFF1F2',
                            color: '#E11D48',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '12px'
                          }}>
                            {bank.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                              {bank.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              {bank.city}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Distance */}
                      <td style={{ padding: '16px 20px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>
                        {bank.distance}
                      </td>

                      {/* Available Units Badge */}
                      <td style={{ padding: '16px 20px' }}>
                        {bank.availableUnits === 0 ? (
                          <span className="badge badge-critical">
                            0 units
                          </span>
                        ) : bank.availableUnits >= 3 ? (
                          <span className="badge badge-success">
                            {bank.availableUnits} units
                          </span>
                        ) : (
                          <span className="badge badge-info" style={{ background: '#ECFDF5', color: '#047857' }}>
                            {bank.availableUnits} {bank.availableUnits === 1 ? 'unit' : 'units'}
                          </span>
                        )}
                      </td>

                      {/* Last Updated */}
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748B' }}>
                        {bank.lastUpdated}
                      </td>

                      {/* Action Button */}
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        {hasStock ? (
                          isRequested ? (
                            <button
                              onClick={() => setScreen('tracking')}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                background: '#10B981',
                                color: 'white',
                                fontSize: '13px',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <CheckCircle2 size={14} />
                              <span>Allocated</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRequestBank(bank)}
                              className="btn-primary"
                              style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
                            >
                              Request
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => alert(`You will be notified as soon as ${bank.name} restocks ${req.bloodGroup}.`)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: '8px',
                              background: '#F1F5F9',
                              color: '#64748B',
                              fontSize: '12.5px',
                              fontWeight: 600,
                              border: '1px solid #CBD5E1'
                            }}
                          >
                            Notify Me
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Allocation Helper */}
          <div style={{
            marginTop: '20px',
            padding: '16px 20px',
            background: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              💡 Total available units across nearby banks: <strong>11 units</strong>. If banks cannot supply the full requirement immediately, nearby verified donors are automatically alerted.
            </div>
            <button
              onClick={() => setScreen('donor_match')}
              className="btn-secondary"
              style={{ fontSize: '13px', padding: '8px 14px' }}
            >
              See Donor Network (5)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
