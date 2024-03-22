// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  const employees = []; // Array to store employee objects

  while (true) {
    // Prompt user for employee data
    const firstName = prompt('Enter the first name of the employee:');
    const lastName = prompt('Enter the last name of the employee:');
    let salary; // Declare salary variable outside the loop; changed this to for next while loop

    // Ask for salary until a valid number is provided
    while (true) {
      const salaryInput = prompt('Enter the salary of the employee:');
      // Check if input is a valid number
      if (!isNaN(parseFloat(salaryInput))&& parseFloat(salaryInput) >= 0) {  //to assure users cant use negative numbers
        salary = parseFloat(salaryInput); // Convert valid input to a number
        break; // Exit loop if valid input
      } else {
        alert('Please enter a valid number for salary.'); // Alert user for invalid input
      }
    }
    // Create employee object and add it to the array
    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    };
    employees.push(employee);

    // Ask user if they want to add another employee
    const addAnother = confirm('Do you want to add another employee?');
    if (!addAnother) {
      break; // Exit the loop if user chooses not to add another employee
    }
  }

  return employees;
};

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // Initialize variables for sum and count
  let sum = 0;
  let count = 0;

  // Loop through the employees array to calculate sum and count
  employeesArray.forEach(employee => {
    // Check if salary is a valid number, otherwise default to 0
    const salary = isNaN(employee.salary) ? 0 : employee.salary;
    sum += salary; // Add salary to sum
    count++; // Increment count
  });

  // Calculate average salary
  const averageSalary = count > 0 ? sum / count : 0;

  // Log the average salary and number of employees to the console
  console.log(`The average employee salary between our ${count} employee(s) is $${averageSalary.toFixed(2)}.`);
};
// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // Generate a random index between 0 and the length of the employees array
  const randomIndex = Math.floor(Math.random() * employeesArray.length);

  // Get the randomly selected employee object
  const randomEmployee = employeesArray[randomIndex];

  // Extract first name and last name from the employee object
  const firstName = randomEmployee.firstName;
  const lastName = randomEmployee.lastName;

  // Log the full name of the randomly selected employee to the console
  console.log(`Congratulations to ${firstName} ${lastName}, our random drawing winner!`);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}




// Add event listener to the 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
