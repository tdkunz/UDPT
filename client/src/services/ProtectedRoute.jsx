import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles }) => {
  const role = localStorage.getItem('role');

  // Nếu role không nằm trong danh sách roles, chuyển hướng về trang chính
  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;