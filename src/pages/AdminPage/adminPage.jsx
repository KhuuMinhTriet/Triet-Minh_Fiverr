import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManage from './user'
function AdminPage() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/Quanlynguoidung" element={<UserManage />} />
      </Routes>
    </Router>
  );
}

export default AdminPage;
