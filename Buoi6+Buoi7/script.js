let selectedRow = null;

document.getElementById("submitBtn").addEventListener("click", function (event) {
  event.preventDefault(); 
  alert("Đã nhấn nút Thêm");


  let stdId = document.getElementById("stdId").value.trim();
  let fname = document.getElementById("fname").value.trim();
  let email = document.getElementById("email").value.trim();
  let birthDate = document.getElementById("BirthDate").value.trim();
  let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
  let note = document.getElementById("note").value.trim();

  if (!stdId) {
    alert("Mã sinh viên không được để trống");
    return;
  }
  if (!fname) {
    alert("Họ và tên không được để trống");
    return;
  }
  if (!email) {
    alert("Email không được để trống");
    return;
  }
  let regexEmail = /^\S+@\S+\.\S+$/;
  if (!regexEmail.test(email)) {
    alert("Email không hợp lệ");
    return;
  }
  if (!birthDate) {
    alert("Ngày sinh không được để trống");
    return;
  }
  if (!gender) {
    alert("Vui lòng chọn giới tính");
    return;
  }

  let table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];

  if (selectedRow) {

    selectedRow.cells[1].innerText = stdId;
    selectedRow.cells[2].innerText = fname;
    selectedRow.cells[3].innerText = email;
    selectedRow.cells[4].innerText = gender === "male" ? "Nam" : "Nữ";
    selectedRow.cells[5].innerText = birthDate;
    thongBao("Cập nhật thành công!");
    selectedRow = null;
    document.getElementById("submitText").innerText = "Thêm sinh viên";
  } else {

    let stt = table.rows.length + 1;
    let sttFormatted = stt < 10 ? "0" + stt : stt;

    let newRow = table.insertRow();
    newRow.insertCell(0).innerText = sttFormatted;
    newRow.insertCell(1).innerText = stdId;
    newRow.insertCell(2).innerText = fname;
    newRow.insertCell(3).innerText = email;
    newRow.insertCell(4).innerText = gender === "male" ? "Nam" : "Nữ";
    newRow.insertCell(5).innerText = birthDate;
    newRow.insertCell(6).innerHTML = `<button class="editBtn" onclick="suaDong(this)">Sửa</button> <button class="deleteBtn" onclick="xoaDong(this)">Xóa</button>`;
    
    thongBao("Thêm sinh viên thành công!");
    thongBao.style.color = "red";
  }

  document.getElementById("studentForm").reset();
});


function xoaDong(btn) {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    btn.parentElement.parentElement.remove();
    thongBao("Xóa thành công!");
    let table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    for (let i = 0; i < table.rows.length; i++) {
      let stt = i + 1;
      table.rows[i].cells[0].innerText = stt < 10 ? "0" + stt : stt;
    }
  }
}

function suaDong(btn) {
  selectedRow = btn.parentElement.parentElement;
  document.getElementById("stdId").value = selectedRow.cells[1].innerText;
  document.getElementById("fname").value = selectedRow.cells[2].innerText;
  document.getElementById("email").value = selectedRow.cells[3].innerText;
  document.getElementById("BirthDate").value = selectedRow.cells[5].innerText;
  let gender = selectedRow.cells[4].innerText === "Nam" ? "male" : "female";
  document.getElementById(gender).checked = true;
  document.getElementById("note").value = "";
  document.getElementById("submitText").innerText = "Cập nhật";
}

// Success message function
function thongBao(message) {
  let thongBao = document.getElementById("thongBao");
  thongBao.innerText = message;
  setTimeout(() => {
    thongBao.innerText = "";
  }, 3000);
}