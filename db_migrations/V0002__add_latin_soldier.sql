INSERT INTO t_p53424259_phoenix_rebirth_proj.soldiers
  (personal_number, password_hash, full_name, rank, position, unit, division, birth_date, service_start)
VALUES
  ('A-271439', md5('demo1234'), 'Петров Александр Николаевич', 'Майор', 'Командир роты', 'В/ч 12345', '3-я общевойсковая армия', '1987-07-14', '2009-09-01')
ON CONFLICT (personal_number) DO NOTHING;
