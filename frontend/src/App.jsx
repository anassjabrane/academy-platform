import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Formations from './pages/Formations/Formations';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import './styles/global.css';

/**
 * Composant racine. Remplace le systeme showPage() / .page.active de index.html
 * par un vrai routing React Router.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/formations/:id" element={<CourseDetail />} />
        {/* À venir : /dashboard/*, /admin/* */}
      </Routes>
    </BrowserRouter>
  );
}