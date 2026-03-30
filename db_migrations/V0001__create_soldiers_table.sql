CREATE TABLE t_p53424259_phoenix_rebirth_proj.soldiers (
  id SERIAL PRIMARY KEY,
  personal_number VARCHAR(10) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  rank VARCHAR(100) NOT NULL,
  position VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,
  division VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  service_start DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO t_p53424259_phoenix_rebirth_proj.soldiers
  (personal_number, password_hash, full_name, rank, position, unit, division, birth_date, service_start)
VALUES
  ('А-271439', md5('demo1234'), 'Петров Александр Николаевич', 'Майор', 'Командир роты', 'В/ч 12345', '3-я общевойсковая армия', '1987-07-14', '2009-09-01');
