import React from "react";

export default function StudentTable({ students, onShowForm, message, messageColor }) {
  return (
    <div className="table-container" id="tableContainer">
      {message && (
        <div id="thongBao" style={{ color: messageColor }}>
          {message}
        </div>
      )}
      <h2>Danh sách sinh viên</h2>
      <button onClick={onShowForm} >+ Thêm sinh viên</button>
      <table border="1" id="studentTable">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
          </tr>
        </thead>
        <tbody id="studentTableBody">
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.stdId}</td>
              <td>{s.fname}</td>
              <td>{s.email}</td>
              <td>{s.gender === "male" ? "Nam" : "Nữ"}</td>
              <td>{s.birthDate}</td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="6">Chưa có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
