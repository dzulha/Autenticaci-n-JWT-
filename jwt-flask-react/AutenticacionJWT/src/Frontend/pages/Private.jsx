import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Private() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return navigate('/login', { replace: true });

    fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error('Token inválido o expirado');
        setMe(await res.json());
      })
      .catch((err) => {
        setError(err.message);
        sessionStorage.removeItem('token');
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="container py-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="h4">Zona privada</h2>
            {me && <p className="mb-0">Hola, <strong>{me.email}</strong>. ¡Acceso concedido!</p>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </main>
    </>
  );
}
