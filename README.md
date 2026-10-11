# LifeLink – Emergency Blood Donor and Blood Bank Network

**Course / Team:** B.Tech OSDBMS-V-2026-T215 · Team LifeLink · Graphic Era (Deemed to be) University

LifeLink is a web platform that connects hospitals, blood banks and donors so that emergency blood requests can be handled from one place instead of through scattered phone calls and records.

## Problem Statement / Objective
In an emergency, hospitals lose time locating blood because stock records and donor lists are kept separately. India's e-RaktKosh lets blood banks publish stock, but emergency requests, donor matching and request tracking are not joined together. LifeLink aims to:
- track blood stock, donors and emergency requests in one database;
- match donors to a request by blood-group compatibility, availability and approximate distance (same city / other city);
- give each user role a dashboard to check availability and follow request status;
- demonstrate the OS concepts behind concurrent urgent requests (priority scheduling, multithreading, synchronization) in a C++ simulation.

## Team Members
| Name | Student ID | Role |
|---|---|---|
| Akansha Sharma | 240221201 | Team Lead |
| Chetna Gurjar | 240221812 | Member |
| Riya Mittal | 240211129 | Member |

## Technologies / Tools Used
React.js (Vite) · Flask (Python) · SQLAlchemy + PyMySQL · MySQL 8 · C++20 (`std::thread`, `std::mutex`, `std::counting_semaphore`) · Git/GitHub

## Setup / Installation
**1. Database**
```
mysql -u root -p < database/schema.sql
```
**2. Backend** (Python 3.10+)
```
cd backend
pip install -r requirements.txt
export DATABASE_URL="mysql+pymysql://USER:PASSWORD@localhost/lifelink"   # Windows: set DATABASE_URL=...
python seed.py     # demo data, run once
python app.py      # http://localhost:5000
```
**3. Frontend** (Node 18+)
```
cd frontend
npm install
npm run dev        # http://localhost:5173
```
**4. OS simulation**
```
cd os-simulation
g++ -std=c++20 -O2 -pthread simulation.cpp -o simulation && ./simulation
```
Demo accounts (password `demo123`): `hospital@lifelink.test`, `bank@lifelink.test`, `donor1@lifelink.test` … `donor4@lifelink.test`, `admin@lifelink.test`.

## Major Features / Modules
| Module | Folder | What it does |
|---|---|---|
| Database | `database/` | 3NF schema, keys, CHECK constraints, indexes, blood compatibility lookup |
| Backend API | `backend/` | Authentication, inventory, emergency requests, donor matching, tracking logs, notifications, reports |
| Frontend | `frontend/` | Hospital, donor and blood bank dashboards, availability search, request form and tracking |
| OS simulation | `os-simulation/` | Priority queue, worker threads, mutex/semaphore, unsafe vs safe stock handling |

## Current Project Status
<!-- Update this table whenever progress changes -->
| Component | Status |
|---|---|
| MySQL schema and sample data | Done |
| Authentication, inventory, request APIs | Done |
| Donor matching | Done (first version) |
| React dashboards | In progress |
| Notifications | In-app only; email/SMS pending |
| C++ simulation | In progress |
| End-to-end and concurrency testing | Pending |

## Contribution Overview
Each member commits their own work from their own GitHub account; see the commit history and the Contributors page.
- Akansha Sharma: backend API and donor matching (`backend/`)
- Chetna Gurjar: database design and queries (`database/`)
- Riya Mittal: React frontend and C++ simulation (`frontend/`, `os-simulation/`)
