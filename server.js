const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE = "employees.json";

// Read employee data
function readEmployees() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }
    return JSON.parse(fs.readFileSync(FILE));
}

// Save employee data
function saveEmployees(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

/* Get all employees */
app.get("/employees", (req, res) => {
    res.json(readEmployees());
});

/* Add employee */
app.post("/employees", (req, res) => {

    let employees = readEmployees();

    let employee = req.body;

    let duplicate = employees.find(e => e.id == employee.id);

    if (duplicate) {
        return res.status(400).json({
            message: "Employee ID already exists"
        });
    }

    employees.push(employee);

    saveEmployees(employees);

    res.json({
        message: "Employee deployed successfully"
    });

});

/* Update employee */
app.put("/employees/:id", (req, res) => {

    let employees = readEmployees();

    let id = req.params.id;

    let index = employees.findIndex(e => e.id == id);

    if (index == -1) {

        return res.status(404).json({
            message: "Employee not found"
        });

    }

    employees[index] = req.body;

    saveEmployees(employees);

    res.json({
        message: "Employee updated successfully"
    });

});

/* Delete employee */
app.delete("/employees/:id", (req, res) => {

    let employees = readEmployees();

    let id = req.params.id;

    employees = employees.filter(e => e.id != id);

    saveEmployees(employees);

    res.json({
        message: "Employee deleted successfully"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});