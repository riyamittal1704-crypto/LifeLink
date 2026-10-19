import React, { useState } from 'react';
import { AlertTriangle, MapPin, Heart, Clock, X, Check, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonorAlertModal({ isOpen, onClose, onAccept, requestData }) {
  const [hasResponded, setHasResponded] = useState(false);
  const [responseType, setResponseType] = useState(null);

  if (!isOpen) return null;

  const handleAccept = () => {
    setResponseType('accept');
    setHasResponded(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    setResponseType('decline');
    setHasResponded(true);
  };

  const data = requestData || {
    id: "REQ-2026-0842",
    bloodGroup: "O+",
    units: 4,
    hospital: "Graphic Era Hospital",
    location: "Dehradun (1.8 km away)",
    urgency: "CRITICAL (Within 2 Hours)",
    patientStatus: "Emergency surgical hemorrhage"
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(225, 29, 72, 0.35)',
        border: '2px solid #FFE4E6',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Urgent Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
          padding: '20px 24px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={24} color="#FFFFFF" className="pulse-indicator" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                Emergency Donor Alert
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }}>
                Urgent Blood Match Required
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {!hasResponded ? (
            <>
              {/* Blood Match Badge Box */}
              <div style={{
                background: '#FFF1F2',
                border: '1px solid #FECDD3',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#9F1239', fontWeight: 600 }}>COMPATIBLE BLOOD TYPE</div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#E11D48', lineHeight: 1.1 }}>
                    {data.bloodGroup}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Need: <strong>{data.units} Units</strong> (100% Match)
                  </div>
                </div>

                <div style={{
                  textAlign: 'right',
                  background: 'white',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  border: '1px solid #FECDD3'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E11D48', fontWeight: 700, fontSize: '12px' }}>
                    <Clock size={14} />
                    <span>0-2 HOURS</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Priority Rank 3</div>
                </div>
              </div>

              {/* Hospital & Location Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="#E11D48" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{data.hospital}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{data.location}</div>
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#475569'
                }}>
                  <strong style={{ color: '#0F172A' }}>Reason: </strong>
                  {data.patientStatus}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <button
                  onClick={handleDecline}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#F1F5F9',
                    color: '#64748B',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  Unable to Donate
                </button>

                <button
                  onClick={handleAccept}
                  className="btn-primary"
                  style={{
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Heart size={18} fill="white" />
                  <span>I Can Donate Now</span>
                </button>
              </div>

              <div style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center', marginTop: '14px' }}>
                By accepting, your contact and live ETA will be shared directly with the hospital transfusion coordinator.
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              {responseType === 'accept' ? (
                <>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#DCFCE7',
                    color: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    Thank You, Life Saver! ❤️
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px', lineHeight: 1.5 }}>
                    Your response has been confirmed in the LifeLink database. Graphic Era Hospital has been notified that you are on the way.
                  </p>
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    color: '#475569',
                    marginBottom: '20px'
                  }}>
                    📍 <strong>Destination:</strong> Blood Bank Wing, Graphic Era Hospital, Dehradun<br/>
                    📞 <strong>Helpline:</strong> 1800 121 4455 (Ext 2)
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                    Response Recorded
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
                    We understand. The request has been forwarded to the next nearest eligible donor in the network.
                  </p>
                </>
              )}

              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
