import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

/**
 * Layout des pages publiques (site vitrine). Affiche la Navbar,
 * contrairement aux dashboards admin/etudiant qui ont leur propre sidebar.
 */
export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}