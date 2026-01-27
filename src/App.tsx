import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { StudentLogin } from "./pages/StudentLogin";
import { Dashboard } from "./components/Dashboard";
import { Sidebar, StudentView } from "./components/Sidebar";

function StudentPortal() {
  const [currentView, setCurrentView] = useState<StudentView>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="student-portal-container flex h-screen bg-[#f6f4f1]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="student-portal-main flex-1 overflow-auto ml-64">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/dashboard" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}