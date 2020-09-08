USE employee_db;

INSERT INTO department(name)
VALUES 
("Management"),
("Finance"),
("Sales"),
("R&D");

INSERT INTO role (title,salary,department_id)
VALUES
("CEO",1000,1),
("Accountant",70,2),
("Salesman",50,3),
("Engineer",100,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
 ("Bob", "Smith",  1,  null),
 ("Julie", "Andrews",  2,  null),
 ("Dwayne",  "Johnson",  5, 1),
 ("Kendrick",  "Lamar", 6, 1),
 ("Maya",  "Angelou", 3, 1),
 ("Maddox", "Mitchell", 4, 1),
 ("David", "Goggins", 3, 2),
 ("Jane", "Goodall", 4, 2);
