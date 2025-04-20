import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario') || '""');
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
        setMenuOpen(!menuOpen);
    };

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/home" onClick={() => { setMenuOpen(false); addActiveClass(); }}>Inicio</NavLink>
                    </li>
                    {userRole === 'administrador' && (
                        <li>
                            <NavLink to="/users" onClick={() => { setMenuOpen(false); addActiveClass(); }}>Usuarios</NavLink>
                        </li>
                    )}
                    {userRole === 'profesor' && (
                        <li>
                            <NavLink to="/lista-alumnos" onClick={() => { setMenuOpen(false); addActiveClass(); }}>Lista de alumnos</NavLink>
                        </li>
                    )}
                    {userRole === 'alumno' && (
                        <li>
                            <NavLink to="/notas" onClick={() => { setMenuOpen(false); addActiveClass(); }}>Mis notas</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/auth" onClick={() => { logoutSubmit(); setMenuOpen(false); }}>Cerrar sesión</NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
