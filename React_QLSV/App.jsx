import React, { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

export default function App() {
  const STORAGE_KEY = "students";
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#4c90af");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setStudents(JSON.parse(raw));
      } catch (err) {
        console.error("Lỗi parse localStorage:", err);
      }
    }
  }, []);

  const showMessage = (text, color = "#4c90af") => {
    setMessage(text);
    setMessageColor(color);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddStudent = (student) => {
    const updated = [...students, student];
    setStudents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // Lưu vào localStorage
    showMessage("Thêm sinh viên thành công!", "green");
    setShowForm(false);
  };

  return (
    <>
      <nav className="navbar" id="navbar">
        <h1>Quản lý sinh viên</h1>
      </nav>

      <div className="container" id="container">
        {showForm ? (
          <StudentForm
            onAdd={handleAddStudent}
            onClose={() => setShowForm(false)}
          />
        ) : (
          <StudentTable
            students={students}
            onShowForm={() => setShowForm(true)}
            message={message}
            messageColor={messageColor}
          />
        )}
      </div>
    </>
  );
}
