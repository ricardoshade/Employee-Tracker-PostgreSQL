INSERT INTO department (department_name)
VALUES  ('Customer Service'),
        ('Finance'),
        ('Sales'),
        ('Marketing'),
        ('IT'),
        ('Human Resources');

INSERT INTO role (role_name, salary, department_id)
VALUES  ('Customer Service Agent', 55000, 1),
        ('Treasurer', 94000, 2),
        ('Director of Sales', 86000, 3),
        ('Copy Editor', 65000, 4),
        ('Software Engineer I', 80000, 5),
        ('VP Human Resources', 110000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Hopkins', 1, 1),
        ('Tom', 'Rogers', 2, 2),
        ('Tamara', 'Jones', 3, 3),
        ('Cindy', 'Chavez', 4, 4),
        ('David', 'Obrian', 5, 5),
        ('Cody', 'Perez', 6, 6);
