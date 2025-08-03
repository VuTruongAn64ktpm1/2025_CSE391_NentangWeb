let currentEmployees = [...employeesData];

function loadTable() {
    const $tbody = $('#employeeTableBody');
    $tbody.empty();

    currentEmployees.forEach(employee => {
        $tbody.append(`
            <tr>
                <td><input type="checkbox"></td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>${employee.phone}</td>
                <td>
                    <button class="action-btn btn-edit">✏️</button>
                    <button class="action-btn btn-delete" data-id="${employee.id}">🗑️</button>
                </td>
            </tr>
        `);
    });
}

function showAddForm() {
    $('#employeeModal').show();
    $('#employeeForm')[0].reset();
    clearErrors();
}

function closeModal() {
    $('#employeeModal').hide();
}

function clearErrors() {
    $('.error-message').text('');
    $('input').removeClass('error');
}

function showError(fieldName, message) {
    $('#' + fieldName + 'Error').text(message);
    $('#employee' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1)).addClass('error');
}

function validateForm() {
    const name = $('#employeeName').val().trim();
    const email = $('#employeeEmail').val().trim();
    const address = $('#employeeAddress').val().trim();
    const phone = $('#employeePhone').val().trim();

    let isValid = true;
    clearErrors();

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
    } else {
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

function addEmployee() {
    if (validateForm()) {
        const newEmployee = {
            id: employeesData.length + 1,
            name: $('#employeeName').val(),
            email: $('#employeeEmail').val(),
            address: $('#employeeAddress').val(),
            phone: $('#employeePhone').val()
        };

        employeesData.push(newEmployee);
        currentEmployees = [...employeesData];
        loadTable();
        closeModal();
        alert('Thêm nhân viên thành công!');
    }
}

function deleteEmployee(id) {
    employeesData = employeesData.filter(emp => emp.id !== id);
    currentEmployees = [...employeesData];
    loadTable();
}

$(document).ready(function () {
    loadTable();

    $('#employeeForm').on('submit', function (e) {
        e.preventDefault();
        addEmployee();
    });

    $('#employeeTableBody').on('click', '.btn-delete', function () {
        const id = parseInt($(this).data('id'));
        deleteEmployee(id);
    });

    $('.btn-success').on('click', showAddForm);
    $('.btn-cancel, .close-btn').on('click', closeModal);
});
