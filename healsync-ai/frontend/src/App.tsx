import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PharmacistSidebar from './components/PharmacistSidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PrescriptionUpload from './pages/PrescriptionUpload';
import History from './pages/History';
import Poster from './pages/Poster';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import PharmacistDashboard from './pages/PharmacistDashboard';
import PharmacistUpload from './pages/PharmacistUpload';

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden print:block print:h-auto print:bg-white print:text-black print:overflow-visible">
      <div className="print:hidden">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden print:block print:h-auto print:overflow-visible">
        <div className="print:hidden">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-8 relative transition-colors duration-300 print:overflow-visible print:bg-white print:p-0">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none print:hidden"></div>
          {children}
        </main>
      </div>
    </div>
  );
};

const PharmacistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <PharmacistSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-8 relative transition-colors duration-300">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'pharmacist' | null>(null);
  const [globalExtractedData, setGlobalExtractedData] = useState<any[] | null>(() => {
    // Try to load initial state from localStorage
    const saved = localStorage.getItem('healsync_extracted_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const handleUpdateExtractedData = (data: any[] | null) => {
    setGlobalExtractedData(data);
    if (data) {
      localStorage.setItem('healsync_extracted_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('healsync_extracted_data');
    }
  };

  // In a real application, you would check session/local storage here

  const handleLogin = (role: 'patient' | 'pharmacist') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : userRole === 'pharmacist' ? (
          <>
            <Route path="/" element={<Navigate to="/pharmacist/dashboard" replace />} />
            <Route path="/pharmacist/dashboard" element={<PharmacistLayout><PharmacistDashboard /></PharmacistLayout>} />
            <Route path="/pharmacist/upload" element={<PharmacistLayout><PharmacistUpload /></PharmacistLayout>} />
            <Route path="/settings" element={<PharmacistLayout><Settings onLogout={handleLogout} /></PharmacistLayout>} />
            <Route path="*" element={<Navigate to="/pharmacist/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PatientLayout><Dashboard extractedData={globalExtractedData} /></PatientLayout>} />
            <Route path="/upload" element={<PatientLayout><PrescriptionUpload
              globalExtractedData={globalExtractedData}
              onUpdateExtractedData={handleUpdateExtractedData}
            /></PatientLayout>} />
            <Route path="/history" element={<PatientLayout><History /></PatientLayout>} />
            <Route path="/poster" element={<PatientLayout><Poster extractedData={globalExtractedData} /></PatientLayout>} />
            <Route path="/settings" element={<PatientLayout><Settings onLogout={handleLogout} /></PatientLayout>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
