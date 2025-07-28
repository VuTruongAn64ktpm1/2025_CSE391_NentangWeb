// script.js - Logic cơ bản
let currentEmployees = [...employeesData];

// Hiển thị dữ liệu lên bảng
function loadTable() {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';

    currentEmployees.forEach(employee => {
        tbody.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>${employee.phone}</td>
                <td>
                    <button class="action-btn btn-edit">✏️</button>
                    <button class="action-btn btn-delete" onclick="deleteEmployee(${employee.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// Hiển thị form thêm nhân viên
function showAddForm() {
    document.getElementById('employeeModal').style.display = 'block';
    document.getElementById('employeeForm').reset();
    clearErrors();
}

// Đóng modal
function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

// Xóa thông báo lỗi
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
}

// Hiển thị lỗi
function showError(fieldName, message) {
    document.getElementById(fieldName + 'Error').textContent = message;
    document.getElementById('employee' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1)).classList.add('error');
}

// Kiểm tra dữ liệu hợp lệ
function validateForm() {
    const name = document.getElementById('employeeName').value.trim();
    const email = document.getElementById('employeeEmail').value.trim();
    const address = document.getElementById('employeeAddress').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();
    
    let isValid = true;
    clearErrors();

    // Kiểm tra không được bỏ trống
    if (!name) {
        showError('name', 'Tên không được để trống');
        isValid = false;
    }
    if (!email) {
        showError('email', 'Email không được để trống');
        isValid = false;
    }
    if (!address) {
        showError('address', 'Địa chỉ không được để trống');
        isValid = false;
    }
    if (!phone) {
        showError('phone', 'Số điện thoại không được để trống');
        isValid = false;
    }

    // Kiểm tra số điện thoại
    if (phone) {
        if (phone.length !== 10) {
            showError('phone', 'Số điện thoại phải có đúng 10 ký tự');
            isValid = false;
        } else if (!phone.startsWith('0')) {
            showError('phone', 'Số điện thoại phải bắt đầu bằng số 0');
            isValid = false;
        }
    }

    return isValid;
}

// Thêm nhân viên mới
function addEmployee() {
    if (validateForm()) {
        const newEmployee = {
            id: employeesData.length + 1,
            name: document.getElementById('employeeName').value,
            email: document.getElementById('employeeEmail').value,
            address: document.getElementById('employeeAddress').value,
            phone: document.getElementById('employeePhone').value
        };
        
        employeesData.push(newEmployee);
        currentEmployees = [...employeesData];
        loadTable();
        closeModal();
        alert('Thêm nhân viên thành công!');
    }
}




window.onload = function() {
    loadTable();
    

    document.getElementById('employeeForm').onsubmit = function(e) {
        e.preventDefault();
        addEmployee();
    };
};