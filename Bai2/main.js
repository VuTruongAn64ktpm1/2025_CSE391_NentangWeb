const tableBody = document.getElementById("transaction-table");

// Hàm hiển thị dữ liệu ra bảng
function renderTable() {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    tableBody.innerHTML += `
      <tr>
        <td><input type="checkbox"></td>
        <td>
          <button class="btn-view"><i class="fa-solid fa-eye"></i></button>
          <button class="btn-edit"><i class="fa-solid fa-pencil"></i></button>
          <button class="btn-deleten"><i class="fa-solid fa-circle-xmark"></i></button>
        </td>
        <td>${item.id}</td>
        <td>${item.khachHang}</td>
        <td>${item.nhanVien}</td>
        <td>${item.soTien.toLocaleString()}</td>
        <td>${item.ngayMua}</td>
      </tr>
    `;
  });
}

renderTable();

// Lấy các phần tử modal
const modal = document.getElementById("formModal");
const openBtn = document.getElementById("openForm");      // Nút mở form
const closeBtn = document.getElementById("closeModal");    // Nút X góc phải
const cancelBtn = document.getElementById("cancelBtn");    // Nút "Hủy"

// Mở form modal
openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Đóng form modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Submit form
document.getElementById("addForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const khachHang = document.getElementById("khachHang").value.trim();
  const nhanVien = document.getElementById("nhanVien").value.trim();
  const soTien = document.getElementById("soTien").value.trim();
  const errorDiv = document.getElementById("formError");

  // Kiểm tra hợp lệ
  if (!khachHang || !nhanVien || !soTien) {
    errorDiv.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }
  if (khachHang.length > 30) {
    errorDiv.textContent = "Tên khách hàng không được quá 30 ký tự.";
    return;
  }
  if (nhanVien.length > 30) {
    errorDiv.textContent = "Tên nhân viên không được quá 30 ký tự.";
    return;
  }

  // Tạo giao dịch mới
  const now = new Date();
  const ngayMua = `${now.getDate()} Tháng ${now.getMonth() + 1} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  const newId = Math.floor(1000 + Math.random() * 9000);

  data.push({
    id: newId,
    khachHang,
    nhanVien,
    soTien: parseInt(soTien),
    ngayMua
  });

  renderTable();
  this.reset();
  errorDiv.textContent = "";
  modal.style.display = "none"; // ❌ KHÔNG dùng bootstrap.Modal nữa
});
