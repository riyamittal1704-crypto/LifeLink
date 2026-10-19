import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  User, 
  Share2, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  HeartHandshake,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { DONOR_MATCHES } from '../data/mockData';

export default function DonorMatchingView({ 
  setScreen, 
  onTriggerDonorAlert, 
  onOpenAIAssistant 
}) {
  const [sortBy, setSortBy] = useState('best_match');
  const [contactedDonors, setContactedDonors] = useState({});

  const handleContact = (donor) => {
    setContactedDonors(prev => ({ ...prev, [donor.id]: true }));
    // Trigger the real-time popup so user sees what the donor receives!
    if (onTriggerDonorAlert) {
      onTriggerDonorAlert(donor);
    }
  };

  const sortedList = [...DONOR_MATCHES].sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'availability') return (b.available ? 1 : 0) - (a.available ? 1 : 0);
    return a.distanceKm - b.distanceKm; // best match combines proximity + availability
  });

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

        <button className="sidebar-link" onClick={() => setScreen('blood_search')}>
          <FileText size={18} />
          <span>Availability Search</span>
        </button>

        <button className="sidebar-link active" onClick={() => setScreen('donor_match')}>
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
              Geofence matching active. Radius extended to 50 km for Critical status.
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
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Donor Matches Found
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B' }}>
                Verified donors with compatible blood type near your location
              </p>
            </div>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                <option value="best_match">Best Match</option>
                <option value="distance">Proximity / Distance</option>
                <option value="availability">Availability First</option>
              </select>
            </div>
          </div>

          {/* Filter Summary Pill Bar */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', fontWeight: 600, color: '#334155' }}>
              <span style={{
                background: '#FFF1F2',
                color: '#E11D48',
                padding: '3px 10px',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '12.5px'
              }}>
                O+
              </span>
              <span>Needed: <strong>4 units</strong></span>
              <span>|</span>
              <span>Location: <strong>Dehradun</strong></span>
              <span>|</span>
              <span>Radius: <strong>50 km</strong></span>
            </div>

            <button
              onClick={() => setScreen('tracking')}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '12.5px', borderRadius: '8px' }}
            >
              <span>View Tracking Timeline (Screen 6)</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Table of Matched Donors (Exact rows from Showcase Screen 5) */}
          <div className="ui-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '16px 24px' }}>Donor Details</th>
                  <th style={{ padding: '16px 20px' }}>Distance</th>
                  <th style={{ padding: '16px 20px' }}>Compatibility</th>
                  <th style={{ padding: '16px 20px' }}>Last Donated</th>
                  <th style={{ padding: '16px 20px' }}>Availability</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedList.map((donor) => {
                  const isContacted = contactedDonors[donor.id];

                  return (
                    <tr 
                      key={donor.id}
                      style={{ 
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Name & Age / Sex */}
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={donor.avatar} 
                            alt={donor.name} 
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }} 
                          />
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{donor.name}</span>
                              <ShieldCheck size={14} color="#10B981" title="Screened & Verified" />
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              {donor.age} years • {donor.sex}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Distance */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                          {donor.distance}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          {donor.city}
                        </div>
                      </td>

                      {/* Compatibility Badge */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          background: '#F0FDF4',
                          color: '#16A34A',
                          border: '1px solid #DCFCE7'
                        }}>
                          <span>{donor.compatibility}</span>
                          <span style={{ color: '#E11D48', fontWeight: 800 }}>({donor.bloodGroup})</span>
                        </span>
                      </td>

                      {/* Last Donated */}
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                        {donor.lastDonated}
                      </td>

                      {/* Availability status */}
                      <td style={{ padding: '16px 20px' }}>
                        {donor.available ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                            <div>
                              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#16A34A' }}>
                                Available
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748B' }}>
                                {donor.availabilityNote}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EAB308', display: 'inline-block' }} />
                            <div>
                              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#CA8A04' }}>
                                Available
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748B' }}>
                                {donor.availabilityNote}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        {donor.available ? (
                          isContacted ? (
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
                              <span>Alert Sent</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleContact(donor)}
                              className="btn-primary"
                              style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
                            >
                              Contact
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => alert(`Donor ${donor.name} will be reminded in ${donor.canDonateInDays} days once their eligibility window opens.`)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '8px',
                              background: '#F1F5F9',
                              color: '#64748B',
                              fontSize: '13px',
                              fontWeight: 600,
                              border: '1px solid #CBD5E1'
                            }}
                          >
                            Notify
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12.5px', color: '#94A3B8' }}>
            All donors adhere to Ministry of Health & Family Welfare eligibility screening standards (Weight ≥ 45 kg, Hb ≥ 12.5 g/dL).
          </div>
        </div>
      </main>
    </div>
  );
}
