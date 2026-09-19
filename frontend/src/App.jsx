import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import StudentLayout from './layouts/StudentLayout/StudentLayout';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Formations from './pages/Formations/Formations';
import CourseDetail from './pages/CourseDetail/CourseDetail';

import AdminDashboard from './pages/admin/Dashboard/Dashboard';
import AdminFormations from './pages/admin/Formations/Formations';
import AdminEtudiants from './pages/admin/Etudiants/Etudiants';
import AdminInstructeurs from './pages/admin/Instructeurs/Instructeurs';

import StudentDashboard from './pages/student/Dashboard/Dashboard';
import MesFormations from './pages/student/MesFormations/MesFormations';
import Catalogue from './pages/student/Catalogue/Catalogue';
import Profil from './pages/student/Profil/Profil';
import Certificats from './pages/student/Certificats/Certificats';

import './styles/global.css';

/**
 * Composant racine. Remplace le systeme showPage() / .page.active
 * (utilise dans index.html, dashboard admin et dashboard etudiant)
 * par un vrai routing React Router avec 3 zones :
 * - PublicLayout  : site vitrine (Navbar)
 * - AdminLayout   : /admin/*    (sidebar admin)
 * - StudentLayout : /dashboard/* (sidebar etudiant)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:id" element={<CourseDetail />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="formations" element={<AdminFormations />} />
          <Route path="etudiants" element={<AdminEtudiants />} />
          <Route path="instructeurs" element={<AdminInstructeurs />} />
          {/* À venir : pipeline, finances, calendrier, rapports, parametres */}
        </Route>

        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="mes-formations" element={<MesFormations />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="profil" element={<Profil />} />
          <Route path="certificats" element={<Certificats />} />
          {/* À venir : progression, agenda, achievements, notes, parametres */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}