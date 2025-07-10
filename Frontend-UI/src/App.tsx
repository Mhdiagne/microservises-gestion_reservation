import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Connexion from './pages/Auth/Connexion';
import Inscription from './pages/Auth/Inscription';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext'; // adapte si le chemin est différent
import { Toaster } from 'sonner';
import Reservation from './pages/Reservation';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path='/reservations' element={<Reservation />} />
        <Route
          path="/espace-entreprise"
          element={
            <ProtectedRoute>
              <Navbar />
              <LandingPage />
              {/* <Reservation/> */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
      </BrowserRouter>
      <Toaster position='top-right'/>
    </React.StrictMode>
  );
}

export default App;
