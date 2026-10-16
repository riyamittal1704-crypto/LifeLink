USE lifelink;

INSERT INTO users(name,email,password_hash,role) VALUES
('City Care Hospital','cityhospital@sample.test','x','hospital'),
('Red Drop Blood Bank','reddrop@sample.test','x','bloodbank'),
('Donor One','donor1@sample.test','x','donor'),
('Donor Two','donor2@sample.test','x','donor'),
('Donor Three','donor3@sample.test','x','donor');

INSERT INTO hospitals(user_id,name,city) VALUES (1,'City Care Hospital','Dehradun');
INSERT INTO blood_banks(user_id,name,city) VALUES (2,'Red Drop Blood Bank','Dehradun');

INSERT INTO donors(user_id,blood_group,city,age) VALUES
(3,'AB-','Dehradun',23),
(4,'O-','Dehradun',25),
(5,'AB+','Haridwar',30);

INSERT INTO blood_inventory(bank_id,blood_group,units) VALUES
(1,'A+',8),(1,'B+',5),(1,'O+',10),(1,'O-',2),(1,'AB-',0);
