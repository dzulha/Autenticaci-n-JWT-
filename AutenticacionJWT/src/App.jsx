import { Link } from 'react-router-dom';
import Navbar from './Frontend/components/Navbar.jsx';

export default function App() {
  const token = sessionStorage.getItem('token');

  return (
    <>
      <Navbar />
      <main
        className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center"
        style={{ paddingTop: '72px' }}
      >
        <h1 className="display-3 fw-bold mb-3">Bienvenido</h1>
        <p className="lead mb-4">Demo de autenticación JWT con Flask + React.</p>

        <div className="d-flex gap-2 justify-content-center">
          {!token ? (
            <>
              <Link to="/signup" className="btn btn-primary">Crear cuenta</Link>
              <Link to="/login" className="btn btn-outline-secondary">Iniciar sesión</Link>
            </>
          ) : (
            <Link to="/private" className="btn btn-success">Ir a Zona Privada</Link>
          )}
        </div>
      </main>
    </>
  );
}
