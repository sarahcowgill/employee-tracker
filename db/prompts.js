const inquirer = require("inquirer");
const connection = require("./connection");
const { prompts } = require("inquirer");

function start() {
    inquirer.prompt(
        {
            name: "start",
            message: "What would you like to do?",
            type: "list",
            choices: [
            "View All Departments",
            "Add Department",
            "View All Roles",
            "Add Role",
            "View All Employees",
            "Add Employee",
            "Update Employee Role"
            ]
        }
    ).then(function(answer) {
        if (answer.start === "View All Departments") {
            viewDepartment();
        } else if (answer.start === "Add Department") {
            addDepartment();
        } else if (answer.start === "View All Roles") {
            viewRole();
        } else if (answer.start === "Add Role") {
            addRole();
        } else if (answer.start === "View All Employees") {
            viewEmployee();
        } else if (answer.start === "Add Employee") {
            addEmployee();
        } else if (answer.start === "Update Employee Role") {
            employeeRole();
        } else {
            console.log("Something went wrong or nothing selected");
            connection.end();
        }
    });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

function viewRole() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

function viewEmployee() {
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

function addDepartment() {
    inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "What is the name of the new department?"
        }
    ).then(function(answer) {
        connection.query("INSERT INTO department SET ?",
            {name: answer.name},
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`Department ${answer.name} successfully added!`);
                start();
            });
    });
}

function addRole() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
    });

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role salary?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the id of the department for this role?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`Job ${answer.title} with salary ${answer.salary} in department ${answer.department_id} added!`);
                start();
            });
    });
}

function addEmployee() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
    });

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the new employee first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the new employee last name?"
        },
        {   
            name: "role_id",
            type: "input",
            message: "What is the id of the role the new employee will have?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the employee id of the new employee's manager?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`New employee: ${answer.first_name} ${answer.last_name} with Role ID ${answer.role_id} and Manager with an ID of ${answer.manager_id}`);
                start();
            })
    });
}

function employeeRole() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
    });
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
    });

    inquirer.prompt([
        {
            name: "employee_id",
            type: "input",
            message: "What is the id of the employee in question?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the id of the new role for the employee?"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.role_id, answer.employee_id],
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`Employee ID ${answer.employee_id} updated with Job ID ${answer.role_id}`);
                start();
            }
        )
    });
}

module.exports = {start}