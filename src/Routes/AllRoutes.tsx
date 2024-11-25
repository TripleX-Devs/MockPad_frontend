import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '@/Components/Login';
import StudentDashboard from '@/Components/StudentDashboard';
import TeacherDashBoard from '@/Components/TecherDashboard';
import AdminDashBoard from '@/Components/AdminDashBoard';

import ProtectedRoute from './ProtectedRoute';

export default function AllRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Role-Based Protected Routes */}
      <Route
        path="/student-dashboard"
        element={<ProtectedRoute element={StudentDashboard} role="student" />}
      />
      <Route
        path="/teacher-dashboard"
        element={<ProtectedRoute element={TeacherDashBoard} role="teacher" />}
      />
      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute element={AdminDashBoard} role="admin" />}
      />
    </Routes>
  );
}
