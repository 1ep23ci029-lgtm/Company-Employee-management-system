// Employee Array
let employees = [];

// Validate Employee Details
function validateEmployee() {

    let id = document.getElementById("empId").value.trim();
    let name = document.getElementById("empName").value.trim();
    let age = document.getElementById("age").value.trim();
    let designation = document.getElementById("designation").value.trim();
    let salary = document.getElementById("salary").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let status = document.getElementById("status").value;

    if (
        id === "" ||
        name === "" ||
        age === "" ||
        designation === "" ||
        salary === "" ||
        mobile === "" ||
        status === ""
    ) {
        showResponse("Please fill all fields.", "red");
        return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        showResponse("Employee name should contain only alphabets.", "red");
        return false;
    }

    if (name.length < 3) {
        showResponse("Employee name must be at least 3 characters.", "red");
        return false;
    }

    if (age < 18 || age > 60) {
        showResponse("Age should be between 18 and 60.", "red");
        return false;
    }

    if (salary <= 0) {
        showResponse("Salary must be greater than 0.", "red");
        return false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showResponse("Mobile number must contain exactly 10 digits.", "red");
        return false;
    }

    showResponse("Validation Successful.", "green");

    return true;
}

// Show Server Response
function showResponse(message, color) {

    let response = document.getElementById("serverResponse");

    response.innerHTML = message;
    response.style.color = color;

}

// Search Employee
function searchEmployee() {

    let search = document
        .getElementById("search")
        .value
        .toLowerCase();

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees
        .filter(emp =>
            emp.id.toLowerCase().includes(search) ||
            emp.name.toLowerCase().includes(search)
        )
        .forEach(emp => {

            table.innerHTML += `

            <tr onclick="fillForm('${emp.id}')">

                <td>${emp.id}</td>

                <td>${emp.name}</td>

                <td>${emp.age}</td>

                <td>${emp.designation}</td>

                <td>${emp.salary}</td>

                <td>${emp.mobile}</td>

                <td class="${emp.status.toLowerCase()}">
                    ${emp.status}
                </td>

            </tr>

            `;

        });

}

// Fill Form for Update/Delete
function fillForm(id) {

    let employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return;
    }

    document.getElementById("empId").value = employee.id;
    document.getElementById("empName").value = employee.name;
    document.getElementById("age").value = employee.age;
    document.getElementById("designation").value = employee.designation;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("mobile").value = employee.mobile;
    document.getElementById("status").value = employee.status;

}
// Load employee data from Local Storage
employees = JSON.parse(localStorage.getItem("employees")) || [];

// Display existing employees when page loads
displayEmployees();

/* -----------------------------
   Add Employee
------------------------------*/
function AddEmployee() {

    // Validate form
    if (!validateEmployee()) {
        return;
    }

    const id = document.getElementById("empId").value.trim();

    // Check duplicate Employee ID
    const duplicate = employees.find(emp => emp.id === id);

    if (duplicate) {
        showResponse("Employee ID already exists.", "red");
        return;
    }

    // Create Employee Object
    const employee = {

        id: id,
        name: document.getElementById("empName").value.trim(),
        age: document.getElementById("age").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        salary: document.getElementById("salary").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        status: document.getElementById("status").value

    };

    // Add to Array
    employees.push(employee);

    // Save to Local Storage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Refresh Table
    displayEmployees();

    // Response
    showResponse("Employee added successfully.", "green");

    // Clear Form
    clearForm();

}


/* -----------------------------
   Display Employees
------------------------------*/
function displayEmployees() {

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(emp => {

        table.innerHTML += `

        <tr onclick="fillForm('${emp.id}')">

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.age}</td>

            <td>${emp.designation}</td>

            <td>${emp.salary}</td>

            <td>${emp.mobile}</td>

            <td class="${emp.status.toLowerCase()}">

                ${emp.status}

            </td>

        </tr>

        `;

    });

}
/* -----------------------------
   Update Employee
------------------------------*/
function updateEmployee() {

    if (!validateEmployee()) {
        return;
    }

    const id = document.getElementById("empId").value.trim();

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        showResponse("Employee not found.", "red");
        return;
    }

    employees[index] = {

        id: id,
        name: document.getElementById("empName").value.trim(),
        age: document.getElementById("age").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        salary: document.getElementById("salary").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        status: document.getElementById("status").value

    };

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    showResponse("Employee updated successfully.", "green");

    clearForm();

}


/* -----------------------------
   Delete Employee
------------------------------*/
function deleteEmployee() {

    const id = document.getElementById("empId").value.trim();

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {

        showResponse("Employee not found.", "red");

        return;

    }

    employees.splice(index, 1);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    showResponse("Employee deleted successfully.", "green");

    clearForm();

}


/* -----------------------------
   Clear Form
------------------------------*/
function clearForm() {

    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("status").value = "";

    document.getElementById("empId").focus();

}
