USE lifelink;

-- Demo 1: successful allocation (all steps succeed together)
START TRANSACTION;
SELECT units FROM blood_inventory WHERE bank_id = 1 AND blood_group = 'O+' FOR UPDATE;
UPDATE blood_inventory SET units = units - 2 WHERE bank_id = 1 AND blood_group = 'O+';
INSERT INTO emergency_requests(hospital_id,blood_group,units,urgency,status,fulfilled_by_bank_id)
VALUES (1,'O+',2,'urgent','fulfilled',1);
INSERT INTO request_logs(request_id,status,note) VALUES (LAST_INSERT_ID(),'fulfilled','Allocated from stock');
COMMIT;
SELECT blood_group, units FROM blood_inventory WHERE bank_id = 1;   -- O+ is now 8

-- Demo 2: a failing allocation is rolled back (O- has only 2 units, we ask for 5)
START TRANSACTION;
UPDATE blood_inventory SET units = units - 5 WHERE bank_id = 1 AND blood_group = 'O-';
-- the line above fails with a CHECK constraint error, because stock cannot go below 0
ROLLBACK;
SELECT blood_group, units FROM blood_inventory WHERE bank_id = 1;   -- O- is still 2
