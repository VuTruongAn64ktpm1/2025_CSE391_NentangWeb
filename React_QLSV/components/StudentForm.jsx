import React, { useState } from "react";

export default function StudentForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    stdId: "",
    fname: "",
    email: "",
    birthDate: "",
    gender: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      if (checked) setFormData((s) => ({ ...s, [name]: value }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const validate = () => {
    if (!formData.stdId.trim()) return alert("Mã sinh viên không được để trống");
    if (!formData.fname.trim()) return alert("Họ và tên không được để trống");
    if (!formData.email.trim()) return alert("Email không được để trống");
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return alert("Email không hợp lệ");
    if (!formData.birthDate.trim()) return alert("Ngày sinh không được để trống");
    if (!formData.gender) return alert("Vui lòng chọn giới tính");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newStudent = { ...formData, id: Date.now() };
    onAdd(newStudent);
    setFormData({
      stdId: "",
      fname: "",
      email: "",
      birthDate: "",
      gender: "",
      note: "",
    });
  };

  return (
    <form className="form" id="studentForm" onSubmit={handleSubmit}>
      <h2>Form thêm sinh viên</h2>
      <p>
        <label htmlFor="stdId">Mã sinh viên</label>
        <input
          id="stdId"
          name="stdId"
          type="text"
          value={formData.stdId}
          onChange={handleChange}
          required
        />
      </p>
      <p>
        <label>Họ và tên</label>
        <input
          id="fname"
          name="fname"
          type="text"
          value={formData.fname}
          onChange={handleChange}
          required
        />
      </p>
      <p>
        <label >Email</label><br />
        <input
          id="email"
          name="email"
          type="text"
          placeholder="@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </p>
      <p>
        <label >Sinh nhật</label>
        <input
          id="BirthDate"
          name="birthDate"
          type="text"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </p>
      <p>
        <label>Giới tính:</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />
        <label htmlFor="male">Nam</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />
        <label htmlFor="female">Nữ</label>
      </p>
      <p>
        <label htmlFor="note">Ghi chú</label><br />
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
      </p>
      <p>
        <input type="submit" value="Thêm sinh viên" className="submit-btn" />
      </p>
      <button type="button" onClick={onClose}>Đóng form</button>
    </form>
  );
}
