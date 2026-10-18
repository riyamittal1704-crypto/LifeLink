# LifeLink – Emergency Blood Donor and Blood Bank Network

**Course / Team:** B.Tech OSDBMS-V-2026-T215 · Team LifeLink · Graphic Era (Deemed to be) University, Dehradun

LifeLink is a web platform that connects hospitals, blood banks and registered donors so an emergency blood request can be handled from one system instead of through scattered phone calls and separate records.

## Problem Statement / Objective

In an emergency, a hospital often loses time finding blood because stock records and donor lists are kept in different places. India's e-RaktKosh lets blood banks publish stock, but emergency requests, donor matching and request tracking are not joined together. LifeLink aims to:

- keep blood stock, donors and emergency requests in one database;
- choose the best blood bank for a request using **distance, criticality of the case and availability of blood**;
- when blood banks cannot supply enough, alert **nearby, eligible, compatible donors** who can accept or reject through a popup, with the hospital notified of every answer;
- let ordinary people register as donors after an **eligibility screening** (age, weight, haemoglobin, recent illness, medicines, alcohol, smoking and similar criteria);
- handle **many hospitals requesting at the same time**, serving the most critical requests first;
- demonstrate the operating-systems ideas behind this (priority scheduling, multithreading, synchronization) in a C++ simulation.

## Team Members

| Name | Student ID | Main responsibility |
|---|---|---|
| Akansha Sharma (Team Lead) | 240221201 | Flask backend and API |
| Chetna Gurjar | 240221812 | Database design, queries, data generation |
| Riya Mittal | 240211129 | React frontend and C++ OS simulation |

## Technologies / Tools Used

React.js (Vite) · Flask (Python) · SQLAlchemy + PyMySQL · MySQL 8.0 · MySQL Workbench · C++20 (`std::thread`, `std::mutex`, `std::counting_semaphore`) · Git / GitHub · VS Code · Postman

## The Four Modes

| Mode | Who | What they do |
|---|---|---|
| **User (donor)** | Ordinary people | Register, complete the eligibility screening, receive emergency alerts and accept or reject them |
| **Hospital** | Hospitals | Raise requests (blood group, units, criticality), search availability, track status and see donor responses |
| **Blood bank** | Blood banks | Maintain stock, see incoming requests, supply blood |
| **Admin** | Administrators | Network overview, request queue by priority, stock and donor statistics |

## How a Request Is Handled

1. A hospital submits a request with blood group, units and criticality (critical, urgent or normal).
2. Requests are ordered by criticality first, then arrival time.
3. Blood banks that hold enough **compatible** blood are scored on distance and availability. The more critical the case, the more weight goes to proximity.
4. The best bank's stock is reduced inside a database transaction with a row lock, so two requests can never claim the same units.
5. If no bank can supply enough, eligible compatible donors within range (larger radius for critical cases) are alerted with a popup.
6. Each donor's accept or reject is recorded and the hospital is notified.

## Project Structure

```
LifeLink/
├── README.md
├── .gitignore
├── database/
│   ├── schema.sql            # 10 core tables, constraints, indexes, compatibility data
│   ├── 02_features.sql       # locations, donor screening, priority rank, alert tracking, admin views
│   ├── sample_data.sql       # small dataset for testing
│   ├── queries.sql           # stock, request, matching queries
│   ├── transaction.sql       # commit / rollback and locking demos
│   └── generate_data.py      # large synthetic dataset (planned)
├── docs/                     # progress report, ER diagram, normalization notes, test log
├── backend/                  # Flask API (in progress)
├── frontend/                 # React app (planned)
└── os-simulation/            # C++ simulation (planned)
```

## Setup / Installation

### 1. Database (available now)

Requirements: MySQL 8.0.16 or newer (CHECK constraints need it) and MySQL Workbench.

In MySQL Workbench, open and run these files **in this order** (select all with Ctrl+A, then Run):

1. `database/schema.sql` (this drops and recreates the `lifelink` database)
2. `database/02_features.sql`
3. `database/sample_data.sql` (or the large generator, not both)

Or from a terminal:

```
mysql -u root -p < database/schema.sql
mysql -u root -p < database/02_features.sql
mysql -u root -p < database/sample_data.sql
```

Verify:

```sql
USE lifelink;
SHOW FULL TABLES;                           -- 11 tables and 2 views
SELECT COUNT(*) FROM blood_compatibility;   -- 27
```

### 2. Large dataset (planned)

```
pip install pymysql werkzeug
python database/generate_data.py
```
Creates 60 hospitals, 30 blood banks and 5,000 donors across 12 cities. Edit the MySQL password inside the script first.

### 3. Backend (in progress)

```
cd backend
pip install -r requirements.txt
set DATABASE_URL=mysql+pymysql://root:YOURPASSWORD@localhost/lifelink    # PowerShell: $env:DATABASE_URL="..."
python app.py                                                           # http://localhost:5000
```

### 4. Frontend (planned)

```
cd frontend
npm install
npm run dev
```

### 5. OS simulation (planned)

```
cd os-simulation
g++ -std=c++20 -O2 -pthread simulation.cpp -o simulation
```

## Database Overview

| Table / view | Purpose |
|---|---|
| `users` | Login accounts with role (hospital, donor, bloodbank, admin) |
| `donors` | Blood group, city, location, sex, availability, last donation, eligibility flag |
| `donor_screening` | Yes/no screening answers, weight, haemoglobin and the eligibility result |
| `hospitals`, `blood_banks` | Organisations with city and coordinates |
| `blood_inventory` | Units per blood group per bank (never negative) |
| `blood_compatibility` | Lookup of which group can donate to which (27 pairs) |
| `emergency_requests` | Requests with criticality, stored priority rank, status, chosen bank, score and distance |
| `donor_matches` | Donors alerted for a request, with distance, response and timestamps |
| `notifications`, `request_logs` | Messages and the status history of each request |
| `v_stock_by_group`, `v_request_queue` | Admin views for stock totals and the priority queue |

Design points: normalised to 3NF; foreign keys with cascades; CHECK constraints (age 18–65, units ≥ 0, request units > 0, eligibility consistent with weight and haemoglobin); composite and geographic indexes for matching; transactions with `SELECT ... FOR UPDATE` for stock allocation.

## Testing Done So Far

| Test | Result |
|---|---|
| Schema script runs on MySQL 8.0.46 | Passed, all statements executed |
| Compatibility data loaded | 27 rows |
| Feature migration `02_features.sql` | Passed; `priority_rank` is a stored generated column |
| Duplicate user email | Rejected (error 1062) |
| Eligibility rule: 40 kg, 11 g/dL marked eligible | Rejected (error 3819, `chk_eligible_rule`) |
| Valid screening: 60 kg, 13.5 g/dL | Accepted |

Details are in `docs/db_testing.md` and `docs/progress_report.md`.

## Current Project Status

| Component | Status |
|---|---|
| Repository, README, .gitignore | Done |
| Core schema (10 tables) | Done |
| Feature schema (screening, locations, priority, views) | Done |
| Sample data, queries, transaction demos | Done |
| Database test log | In progress |
| Large dataset generator | Pending |
| Bank scoring and donor search queries | Pending |
| Flask backend (login, inventory, requests, matching) | In progress |
| React dashboards (four modes) | Pending |
| Accept / reject donor popup and notifications | Pending |
| C++ simulation | Pending |
| Integration and concurrency testing | Pending |

## Contribution Overview

Each member commits from their own GitHub account. See the commit history and the Contributors page.

- **Chetna Gurjar:** database design, constraints, sample data, queries, transaction demos, feature migration, test log
- **Akansha Sharma:** backend API and matching logic
- **Riya Mittal:** frontend dashboards and C++ simulation

## Limitations and Assumptions

- Donor eligibility is **self-declared**; the blood bank's medical officer must do the final screening before any donation.
- Distance is straight-line distance between stored coordinates, not live GPS or road distance.
- Screening answers are health data: only yes/no flags are stored, and access must be restricted by role.
- The large dataset is synthetic and is used only for testing.
