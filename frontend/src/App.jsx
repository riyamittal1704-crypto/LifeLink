import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShowcaseBar from './components/ShowcaseBar';
import DonorAlertModal from './components/DonorAlertModal';
import AIAssistantModal from './components/AIAssistantModal';
import NotificationDrawer from './components/NotificationDrawer';

// Views
import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import EmergencyRequestView from './views/EmergencyRequestView';
import BloodSearchAvailabilityView from './views/BloodSearchAvailabilityView';
import DonorMatchingView from './views/DonorMatchingView';
import RequestTrackingView from './views/RequestTrackingView';
import HospitalDashboardView from './views/HospitalDashboardView';
import BloodBankDashboardView from './views/BloodBankDashboardView';
import DonorDashboardView from './views/DonorDashboardView';

import { INITIAL_REQUESTS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [activeRole, setActiveRole] = useState('hospital');
  const [activeRequest, setActiveRequest] = useState(INITIAL_REQUESTS[0]);

  // Modals & Panels
  const [isDonorAlertOpen, setIsDonorAlertOpen] = useState(false);
  const [alertDonorData, setAlertDonorData] = useState(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleCreateRequest = (newReq) => {
    const created = {
      id: `REQ-2026-0${Math.floor(850 + Math.random() * 50)}`,
      bloodGroup: newReq.bloodGroup,
      units: newReq.units,
      urgency: newReq.urgency,
      status: 'in_progress',
      hospital: newReq.hospitalName,
      city: newReq.location,
      patientCondition: newReq.patientCondition,
      submittedTime: 'Just now',
      submittedFullDate: 'Just now, 10:45 AM'
    };
    setActiveRequest(created);
    setUnreadCount(prev => prev + 1);
  };

  const handleTriggerDonorAlert = (donorData) => {
    setAlertDonorData(donorData || null);
    setIsDonorAlertOpen(true);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        unreadNotifications={unreadCount}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
      />

      {/* Screen Render Switcher */}
      <div style={{ flex: 1, paddingBottom: '70px' }}>
        {currentScreen === 'landing' && (
          <LandingView
            setScreen={setCurrentScreen}
            setActiveRole={setActiveRole}
            onTriggerDonorAlert={() => handleTriggerDonorAlert()}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthView
            setScreen={setCurrentScreen}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
          />
        )}

        {currentScreen === 'request_form' && (
          <EmergencyRequestView
            setScreen={setCurrentScreen}
            onCreateRequest={handleCreateRequest}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'blood_search' && (
          <BloodSearchAvailabilityView
            setScreen={setCurrentScreen}
            activeRequest={activeRequest}
            onAllocateBloodBank={(bank) => {
              setActiveRole('hospital');
              setCurrentScreen('tracking');
            }}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'donor_match' && (
          <DonorMatchingView
            setScreen={setCurrentScreen}
            onTriggerDonorAlert={handleTriggerDonorAlert}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'tracking' && (
          <RequestTrackingView
            setScreen={setCurrentScreen}
            activeRequest={activeRequest}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'hospital_dash' && (
          <HospitalDashboardView
            setScreen={setCurrentScreen}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'bloodbank_dash' && (
          <BloodBankDashboardView
            setScreen={setCurrentScreen}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentScreen === 'donor_dash' && (
          <DonorDashboardView
            setScreen={setCurrentScreen}
            onTriggerDonorAlert={() => handleTriggerDonorAlert()}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
            onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          />
        )}
      </div>

      {/* Floating Showcase Navigator */}
      <ShowcaseBar
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        onTriggerDonorAlert={() => handleTriggerDonorAlert()}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Desktop Notification Slide-over Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onTriggerDonorAlert={() => handleTriggerDonorAlert()}
        setScreen={setCurrentScreen}
      />

      {/* Emergency Donor Alert Modal */}
      <DonorAlertModal
        isOpen={isDonorAlertOpen}
        onClose={() => setIsDonorAlertOpen(false)}
        onAccept={() => {
          setUnreadCount(prev => prev + 1);
        }}
        requestData={alertDonorData ? {
          bloodGroup: alertDonorData.bloodGroup,
          units: 1,
          hospital: "Graphic Era Hospital",
          location: `Dehradun (${alertDonorData.distance} away)`,
          urgency: "CRITICAL (Within 2 Hours)",
          patientStatus: "Emergency surgical hemorrhage in OT-3"
        } : null}
      />

      {/* LifeLink AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}
