// LifeLink Mock Data & Network State
// Aligned directly with LifeLink Database Schema, sample_data.sql, and UI Showcase

export const INITIAL_REQUESTS = [
  {
    id: "REQ-2026-0842",
    bloodGroup: "O+",
    units: 4,
    urgency: "critical", // 'critical' | 'high' | 'medium'
    status: "in_progress", // 'pending' | 'in_progress' | 'fulfilled' | 'canceled'
    hospital: "Graphic Era Hospital",
    city: "Dehradun, Uttarakhand",
    patientCondition: "Severe hemorrhage following emergency trauma surgery in OT-3. Requires immediate whole blood or packed RBCs.",
    submittedTime: "Today, 10:24 AM",
    submittedFullDate: "24 Sep 2026, 10:24 AM",
    allocatedBanks: [
      { name: "Doon Medical College Blood Bank", units: 2, confirmedAt: "10:32 AM" }
    ],
    allocatedDonors: [
      { name: "Aarav Singh", eta: "10:50 AM", status: "On the way" },
      { name: "Priya Sharma", eta: "11:05 AM", status: "Confirmed" }
    ],
    timeline: [
      {
        id: 1,
        title: "Request Submitted",
        time: "Today, 10:24 AM",
        desc: "Your emergency request has been submitted to the LifeLink priority queue.",
        status: "completed",
        type: "check"
      },
      {
        id: 2,
        title: "Searching Network",
        time: "Today, 10:24 AM",
        desc: "Checking 12 blood banks and 48 nearby eligible donors within 50 km.",
        status: "completed",
        type: "radar"
      },
      {
        id: 3,
        title: "Matches Found",
        time: "Today, 10:26 AM",
        desc: "2 blood banks • 8 potential donors with 100% compatible O+ stock.",
        status: "completed",
        hasAction: true,
        actionLabel: "View Matches",
        type: "matches"
      },
      {
        id: 4,
        title: "Blood Bank Confirmed",
        time: "Today, 10:32 AM",
        desc: "Doon Medical College Blood Bank confirmed 2 units under row lock.",
        status: "completed",
        type: "check"
      },
      {
        id: 5,
        title: "Donor Confirmed",
        time: "Today, 10:35 AM",
        desc: "2 donors accepted alert and are en route for donation.",
        status: "completed",
        type: "check"
      },
      {
        id: 6,
        title: "Fulfillment in Progress",
        time: "Estimated: 11:15 AM",
        desc: "Blood collection and emergency courier dispatch in transit.",
        status: "current",
        type: "progress"
      }
    ],
    liveUpdates: [
      { id: 1, time: "10:36 AM", text: "Aarav Singh is on the way to donate (ETA 14 mins)" },
      { id: 2, time: "10:32 AM", text: "Doon Medical College confirmed 2 units" },
      { id: 3, time: "10:26 AM", text: "Priority rank 3 assigned by critical triage algorithm" },
      { id: 4, time: "10:24 AM", text: "Emergency broadcast initiated to Dehradun zone" }
    ]
  },
  {
    id: "REQ-2026-0801",
    bloodGroup: "A-",
    units: 2,
    urgency: "urgent",
    status: "fulfilled",
    hospital: "Graphic Era Hospital",
    city: "Dehradun, Uttarakhand",
    patientCondition: "Scheduled cardiovascular procedure pre-transfusion reserve.",
    submittedTime: "Yesterday",
    submittedFullDate: "23 Sep 2026, 04:15 PM"
  },
  {
    id: "REQ-2026-0790",
    bloodGroup: "B+",
    units: 3,
    urgency: "high",
    status: "fulfilled",
    hospital: "Graphic Era Hospital",
    city: "Dehradun, Uttarakhand",
    patientCondition: "Post-accident pediatric orthopedic stabilization.",
    submittedTime: "21 Sep 2026",
    submittedFullDate: "21 Sep 2026, 08:30 AM"
  },
  {
    id: "REQ-2026-0781",
    bloodGroup: "AB+",
    units: 1,
    urgency: "normal",
    status: "canceled",
    hospital: "Graphic Era Hospital",
    city: "Dehradun, Uttarakhand",
    patientCondition: "Patient stabilized through alternative saline expanders.",
    submittedTime: "20 Sep 2026",
    submittedFullDate: "20 Sep 2026, 02:10 PM"
  }
];

export const BLOOD_BANKS = [
  {
    id: 1,
    name: "GEU Blood Bank",
    city: "Dehradun",
    distance: "2.1 km",
    distanceKm: 2.1,
    availableUnits: 2,
    lastUpdated: "10 mins ago",
    status: "sufficient",
    stock: { "A+": 28, "A-": 12, "B+": 18, "B-": 6, "O+": 2, "O-": 8, "AB+": 4, "AB-": 2 },
    address: "Graphic Era Hill University Campus, Clement Town, Dehradun",
    phone: "+91 135 273 5000"
  },
  {
    id: 2,
    name: "Doon Medical College Blood Bank",
    city: "Dehradun",
    distance: "4.3 km",
    distanceKm: 4.3,
    availableUnits: 5,
    lastUpdated: "5 mins ago",
    status: "optimal",
    stock: { "A+": 35, "A-": 15, "B+": 22, "B-": 8, "O+": 14, "O-": 5, "AB+": 9, "AB-": 4 },
    address: "Patel Nagar, Dehradun, Uttarakhand",
    phone: "+91 135 272 6020"
  },
  {
    id: 3,
    name: "Max Super Speciality Blood Bank",
    city: "Dehradun",
    distance: "8.7 km",
    distanceKm: 8.7,
    availableUnits: 0,
    lastUpdated: "2 mins ago",
    status: "out_of_stock",
    stock: { "A+": 10, "A-": 2, "B+": 14, "B-": 0, "O+": 0, "O-": 1, "AB+": 2, "AB-": 0 },
    address: "Mussoorie Diversion Road, Dehradun",
    phone: "+91 135 719 3000"
  },
  {
    id: 4,
    name: "Himalayan Hospital Blood Bank",
    city: "Dehradun",
    distance: "12.4 km",
    distanceKm: 12.4,
    availableUnits: 3,
    lastUpdated: "15 mins ago",
    status: "optimal",
    stock: { "A+": 40, "A-": 18, "B+": 30, "B-": 11, "O+": 8, "O-": 4, "AB+": 6, "AB-": 3 },
    address: "Swami Ram Nagar, Jolly Grant, Dehradun",
    phone: "+91 135 247 1100"
  },
  {
    id: 5,
    name: "Kailash Hospital Blood Bank",
    city: "Dehradun",
    distance: "15.2 km",
    distanceKm: 15.2,
    availableUnits: 1,
    lastUpdated: "8 mins ago",
    status: "low",
    stock: { "A+": 12, "A-": 4, "B+": 9, "B-": 2, "O+": 1, "O-": 2, "AB+": 3, "AB-": 1 },
    address: "Haridwar Bypass Road, Jogiwala, Dehradun",
    phone: "+91 135 266 0000"
  }
];

export const DONOR_MATCHES = [
  {
    id: 1,
    name: "Aarav Singh",
    age: 24,
    sex: "Male",
    bloodGroup: "O+",
    distance: "1.8 km",
    distanceKm: 1.8,
    city: "Dehradun",
    compatibility: "100% Compatible",
    lastDonated: "3 months ago",
    available: true,
    availabilityStatus: "Available",
    availabilityNote: "Can donate now",
    canDonateInDays: 0,
    weightKg: 68,
    haemoglobin: 14.2,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 21,
    sex: "Female",
    bloodGroup: "O+",
    distance: "3.2 km",
    distanceKm: 3.2,
    city: "Dehradun",
    compatibility: "100% Compatible",
    lastDonated: "4 months ago",
    available: true,
    availabilityStatus: "Available",
    availabilityNote: "Can donate now",
    canDonateInDays: 0,
    weightKg: 54,
    haemoglobin: 13.0,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Rohan Mehta",
    age: 27,
    sex: "Male",
    bloodGroup: "O+",
    distance: "5.6 km",
    distanceKm: 5.6,
    city: "Dehradun",
    compatibility: "100% Compatible",
    lastDonated: "2 months ago",
    available: true,
    availabilityStatus: "Available",
    availabilityNote: "Can donate now",
    canDonateInDays: 0,
    weightKg: 72,
    haemoglobin: 15.1,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Neha Verma",
    age: 26,
    sex: "Female",
    bloodGroup: "O+",
    distance: "7.1 km",
    distanceKm: 7.1,
    city: "Dehradun",
    compatibility: "100% Compatible",
    lastDonated: "5 months ago",
    available: false,
    availabilityStatus: "Pending Window",
    availabilityNote: "Can donate in 2 days",
    canDonateInDays: 2,
    weightKg: 58,
    haemoglobin: 13.4,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Vikram Joshi",
    age: 29,
    sex: "Male",
    bloodGroup: "O+",
    distance: "9.4 km",
    distanceKm: 9.4,
    city: "Dehradun",
    compatibility: "100% Compatible",
    lastDonated: "1 month ago",
    available: true,
    availabilityStatus: "Available",
    availabilityNote: "Can donate now",
    canDonateInDays: 0,
    weightKg: 80,
    haemoglobin: 14.8,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export const NOTIFICATIONS_LIST = [
  {
    id: 1,
    title: "Emergency Match Found",
    description: "A nearby donor has been found for REQ-2026-0842 (O+ Critical)",
    time: "2 mins ago",
    type: "request",
    category: "requests",
    unread: true
  },
  {
    id: 2,
    title: "Blood Bank Confirmed",
    description: "Doon Medical College has confirmed 2 units for your request",
    time: "8 mins ago",
    type: "update",
    category: "updates",
    unread: true
  },
  {
    id: 3,
    title: "Request Status Updated",
    description: "Your emergency request #REQ-2026-0842 is now in progress",
    time: "15 mins ago",
    type: "update",
    category: "updates",
    unread: false
  },
  {
    id: 4,
    title: "Donation Reminder",
    description: "You can donate again in 28 days. Stay healthy and hydrated!",
    time: "1 day ago",
    type: "reminder",
    category: "updates",
    unread: false
  },
  {
    id: 5,
    title: "New Message",
    description: "You have a new message from GEU Blood Bank medical desk",
    time: "1 day ago",
    type: "message",
    category: "messages",
    unread: false
  }
];

// 27 Standard Compatibility Pairs from LifeLink schema.sql
export const COMPATIBILITY_MATRIX = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]
};
