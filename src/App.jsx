import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardWarga from './pages/warga/DashboardWarga';
import WasteHistory from './pages/warga/WasteHistory';
import MyReports from './pages/warga/MyReports';
import Schedule from './pages/warga/Schedule';
import DashboardDLH from './pages/dlh/DashboardDLH';
import ReportsManagement from './pages/dlh/ReportsManagement';
import ScheduleManagement from './pages/dlh/ScheduleManagement';
import UsersManagement from './pages/dlh/UsersManagement';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes - Warga */}
        <Route
          path="/dashboard/warga"
          element={
            <ProtectedRoute requiredRole="warga">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardWarga />} />
          <Route path="waste" element={<WasteHistory />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* Protected Routes - DLH */}
        <Route
          path="/dashboard/dlh"
          element={
            <ProtectedRoute requiredRole="dlh">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardDLH />} />
          <Route path="reports" element={<ReportsManagement />} />
          <Route path="schedule" element={<ScheduleManagement />} />
          <Route path="users" element={<UsersManagement />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
