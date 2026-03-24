const API_BASE = '/api/employees';
let editingEmployeeId = null;

// DOM elements
const employeeForm = document.getElementById('employeeForm');
const employeesList = document.getElementById('employeesList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const employeeIdInput = document.getElementById('employeeId');
const empIDInput = document.getElementById('empID');
const empNameInput = document.getElementById('empName');
const ageInput = document.getElementById('age');
const designationInput = document.getElementById('designation');
const salaryInput = document.getElementById('salary');

// Load employees when page loads
document.addEventListener('DOMContentLoaded', loadEmployees);

// Form submission
employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employeeData = {
        empID: empIDInput.value,
        empName: empNameInput.value,
        age: parseInt(ageInput.value),
        designation: designationInput.value,
        salary: parseFloat(salaryInput.value)
    };

    try {
        if (editingEmployeeId) {
            await updateEmployee(editingEmployeeId, employeeData);
        } else {
            await createEmployee(employeeData);
        }
        resetForm();
        loadEmployees();
    } catch (error) {
        showError('Operation failed: ' + error.message);
    }
});

// Cancel editing
cancelBtn.addEventListener('click', resetForm);

// Create employee
async function createEmployee(employeeData) {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    return response.json();
}

// Load all employees
async function loadEmployees() {
    try {
        employeesList.innerHTML = '<div class="loading">Loading employees...</div>';
        
        const response = await fetch(API_BASE);
        if (!response.ok) {
            throw new Error('Failed to load employees');
        }

        const employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        employeesList.innerHTML = `<div class="error">Error loading employees: ${error.message}</div>`;
    }
}

// Display employees in table format
function displayEmployees(employees) {
    if (employees.length === 0) {
        employeesList.innerHTML = `
            <div class="empty-state">
                <h3>No employees found</h3>
                <p>Add your first employee using the form below</p>
            </div>
        `;
        return;
    }

    employeesList.innerHTML = employees.map((employee, index) => `
        <div class="employee-row">
            <div class="employee-cell employee-number">${index + 1}</div>
            <div class="employee-cell">${employee.empID}</div>
            <div class="employee-cell">${employee.empName}</div>
            <div class="employee-cell">${employee.age}</div>
            <div class="employee-cell">${employee.designation}</div>
            <div class="employee-cell salary">${formatSalary(employee.salary)}</div>
            <div class="employee-cell">
                <button class="edit-btn" onclick="editEmployee('${employee._id}')">
                    ✏️ Edit
                </button>
                <button class="delete-btn" onclick="deleteEmployee('${employee._id}')">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Format salary for display in Indian Rupees
function formatSalary(salary) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(salary);
}

// Edit employee
async function editEmployee(employeeId) {
    try {
        const response = await fetch(`${API_BASE}/${employeeId}`);
        if (!response.ok) {
            throw new Error('Failed to load employee');
        }

        const employee = await response.json();
        
        // Populate form
        empIDInput.value = employee.empID;
        empNameInput.value = employee.empName;
        ageInput.value = employee.age;
        designationInput.value = employee.designation;
        salaryInput.value = employee.salary;
        
        // Disable empID field during edit (to prevent duplicate IDs)
        empIDInput.disabled = true;
        
        // Switch to edit mode
        editingEmployeeId = employeeId;
        submitBtn.textContent = 'Update Employee';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showError('Failed to load employee for editing: ' + error.message);
    }
}

// Update employee
async function updateEmployee(employeeId, employeeData) {
    const response = await fetch(`${API_BASE}/${employeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    return response.json();
}

// Delete employee
async function deleteEmployee(employeeId) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/${employeeId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        loadEmployees();
    } catch (error) {
        showError('Failed to delete employee: ' + error.message);
    }
}

// Reset form
function resetForm() {
    employeeForm.reset();
    editingEmployeeId = null;
    empIDInput.disabled = false; // Re-enable empID field
    submitBtn.textContent = '+ Add Employee';
    cancelBtn.style.display = 'none';
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}