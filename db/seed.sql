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
 ("Mark", "Fisher",  1,  null),
 ("Andy", "Smith",  2,  null),
 ("Wendy",  "Tamar",  5, 1),
 ("Shanna",  "Leroy", 6, 1),
 ("Susie",  "Keen", 3, 1),
 ("Sophia", "Ford", 4, 1),
 ("Henry", "Rodriguez", 3, 2),
 ("Lenny", "Lee", 4, 2);
