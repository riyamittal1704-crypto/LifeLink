"""Synthetic LifeLink dataset: 60 hospitals, 30 blood banks, 5000 donors."""
import random
from datetime import date, timedelta
import pymysql
from werkzeug.security import generate_password_hash

random.seed(7)
HOSPITALS, BANKS, DONORS = 60, 30, 5000
CITIES = {"Dehradun": (30.32, 78.03), "Haridwar": (29.95, 78.16), "Rishikesh": (30.09, 78.27),
          "Roorkee": (29.85, 77.89), "Mussoorie": (30.46, 78.07), "Haldwani": (29.22, 79.51),
          "Saharanpur": (29.96, 77.55), "Meerut": (28.98, 77.71), "Delhi": (28.61, 77.21),
          "Moradabad": (28.84, 78.77), "Bareilly": (28.37, 79.43), "Kotdwar": (29.75, 78.52)}
CITY_LIST = list(CITIES)
GROUPS = ["O+", "B+", "A+", "AB+", "O-", "B-", "A-", "AB-"]
WEIGHTS = [36, 32, 22, 6, 1, 1, 1, 1]          # rough spread; negative groups are rare
FIRST = ["Aarav", "Riya", "Vivaan", "Ananya", "Kabir", "Meera", "Rohan", "Isha", "Arjun", "Neha"]
LAST = ["Sharma", "Verma", "Rawat", "Negi", "Gupta", "Singh", "Bisht", "Joshi", "Kumar", "Mittal"]

con = pymysql.connect(host="localhost", user="root", password="YOUR_PASSWORD",
                      database="lifelink")
cur = con.cursor()
pw = generate_password_hash("demo123")          # hashed once and reused, so loading stays fast

def place(city):
    la, lo = CITIES[city]
    return round(la + random.uniform(-.07, .07), 6), round(lo + random.uniform(-.07, .07), 6)

def add_user(name, email, role):
    cur.execute("INSERT INTO users(name,email,password_hash,role) VALUES(%s,%s,%s,%s)",
                (name, email, pw, role))
    return cur.lastrowid


for i in range(HOSPITALS):
    city = CITY_LIST[i % len(CITY_LIST)]
    uid = add_user(f"{city} Hospital {i+1}", f"hospital{i+1}@sample.test", "hospital")
    la, lo = place(city)
    cur.execute("INSERT INTO hospitals(user_id,name,city,latitude,longitude) VALUES(%s,%s,%s,%s,%s)",
                (uid, f"{city} Hospital {i+1}", city, la, lo))

for i in range(BANKS):
    city = CITY_LIST[i % len(CITY_LIST)]
    uid = add_user(f"{city} Blood Bank {i+1}", f"bank{i+1}@sample.test", "bloodbank")
    la, lo = place(city)
    cur.execute("INSERT INTO blood_banks(user_id,name,city,latitude,longitude) VALUES(%s,%s,%s,%s,%s)",
                (uid, f"{city} Blood Bank {i+1}", city, la, lo))
    bank_id = cur.lastrowid
    for g in GROUPS:
        units = max(0, int(random.gauss(18, 10)) - (8 if g.endswith("-") else 0))
        cur.execute("INSERT INTO blood_inventory(bank_id,blood_group,units) VALUES(%s,%s,%s)",
                    (bank_id, g, units))

for i in range(DONORS):
    city = random.choice(CITY_LIST)
    sex = "M" if random.random() < .7 else "F"
    ok = random.random() > .08                  # about 8% fail screening
    uid = add_user(f"{random.choice(FIRST)} {random.choice(LAST)}", f"donor{i+1}@sample.test", "donor")
    la, lo = place(city)
    last = None if random.random() < .4 else date.today() - timedelta(days=random.randint(20, 400))
    cur.execute("""INSERT INTO donors(user_id,blood_group,city,age,sex,latitude,longitude,eligible,last_donation)
                   VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                (uid, random.choices(GROUPS, WEIGHTS)[0], city, random.randint(18, 60), sex, la, lo, ok, last))
    donor_id = cur.lastrowid
    wt = round(random.uniform(48, 95), 1)
    hb = round(random.uniform(12.5, 16.5), 1) if ok else round(random.uniform(10, 12.4), 1)

    cur.execute("""INSERT INTO donor_screening(donor_id,weight_kg,haemoglobin,is_eligible,reason)
                   VALUES(%s,%s,%s,%s,%s)""",
                (donor_id, wt, hb, ok, None if ok else "Low haemoglobin"))

con.commit()
print("Done")
