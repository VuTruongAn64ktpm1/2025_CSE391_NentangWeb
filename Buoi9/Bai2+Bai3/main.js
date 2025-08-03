function renderTable() {
  const $tbody = $("#transaction-table");
  $tbody.empty();

  data.forEach(item => {
    $tbody.append(`
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
    `);
  });
}

$(document).ready(function () {
  renderTable();

  // Mở modal
  $("#openForm").click(function () {
    $("#formModal").show();
  });

  // Đóng modal
  $("#closeModal, #cancelBtn").click(function () {
    $("#formModal").hide();
  });

  // Xử lý submit form
  $("#addForm").submit(function (e) {
    e.preventDefault();

    const khachHang = $("#khachHang").val().trim();
    const nhanVien = $("#nhanVien").val().trim();
    const soTien = $("#soTien").val().trim();
    const $errorDiv = $("#formError");

    // Kiểm tra dữ liệu
    if (!khachHang || !nhanVien || !soTien) {
      $errorDiv.text("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (khachHang.length > 30) {
      $errorDiv.text("Tên khách hàng không được quá 30 ký tự.");
      return;
    }
    if (nhanVien.length > 30) {
      $errorDiv.text("Tên nhân viên không được quá 30 ký tự.");
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
    $("#addForm")[0].reset();
    $errorDiv.text("");
    $("#formModal").hide();
  });
});
