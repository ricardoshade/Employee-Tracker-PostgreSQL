import inquirer from 'inquirer';
import { pool, connectToDb } from './connections.js'
await connectToDb()

async function main_menu() {
    const answers = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'what_to_do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            },
        ])

    console.log(answers)

    if (answers['what_to_do?'] == 'View all departments') {
        const data = await pool.query('SELECT * FROM department')
        console.table(data.rows)
        main_menu()
    }

    if (answers['what_to_do?'] == 'View all roles') {
        const data = await pool.query('SELECT * FROM role')
        console.table(data.rows)
        main_menu()
    }

    if (answers['what_to_do?'] == 'View all employees') {
        const data = await pool.query('SELECT * FROM employee')
        console.table(data.rows)
        main_menu()
    }

    if (answers['what_to_do?'] == 'Add a department') {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "dept_name",
                message: "What is the name of the new department?"
            }
        ])

        await pool.query(`INSERT INTO department (department_name) VALUES  ($1)`, [answers.dept_name])
        console.log("Department has been added!")
        main_menu()
    }

    if (answers['what_to_do?'] == 'Add a role') {
        const departments = await pool.query('SELECT id, department_name FROM department');
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "role_name",
                message: "What is the name of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "Provide salary for new role:",
            },
            {
                type: "list",
                name: "dept_id",
                message: "Select the department for the new role:",
                choices: departments.rows.map(department => ({
                    name: department.department_name,
                    value: department.id
                }))
            }
        ])

        await pool.query(`INSERT INTO role (role_name, salary, department_id) VALUES  ($1, $2, $3)`, [answers.role_name, answers.salary, answers.dept_id])
        console.log("Role has been added!")
        main_menu()
    }

    if (answers['what_to_do?'] == 'Add an employee') {
        const roles = await pool.query('SELECT id, role_name FROM role');
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the new employee?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of the new employee?"
            },
            {
                type: "list",
                name: "role_id",
                message: "Select the role for the new employee:",
                choices: roles.rows.map(role => ({
                    name: role.role_name,
                    value: role.id
                }))
            }
        ]);

        await pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES  ($1, $2, $3)`, [answers.first_name, answers.last_name, answers.role_id])
        console.log("Employee has been added!")
        main_menu()
    }

    if (answers['what_to_do?'] == 'Update an employee role') {
        
        const employees = await pool.query('SELECT id, first_name, last_name FROM employee');
        const roles = await pool.query('SELECT id, role_name FROM role');
        
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Select the employee whose role you want to update:",
                choices: employees.rows.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
            }))
        },
            {
                type: "list",
                name: "new_role_id",
                message: "Select the new role for this employee:",
                choices: roles.rows.map(role => ({
                    name: role.role_name,
                    value: role.id
                }))
            }
    ]);

    await pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [answers.new_role_id, answers.employee_id]
    );

    console.log("Employee role has been updated!");
    main_menu();
}

    if (answers['what_to_do?'] == 'exit') {
        process.exit(1)
    }
}

main_menu()