import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error en login');
      sessionStorage.setItem('token', data.access_token);
      navigate('/private');
    } catch (err) {
      setMsg({ type: 'danger', text: err.message });
    }
  };

  return (
    <>
      <Navbar />
      <main className="container py-5 d-flex justify-content-center">
        <div className="card shadow" style={{ maxWidth: 420, width: '100%' }}>
          <div className="card-body">
            <h2 className="h4 mb-4">Iniciar sesión</h2>

            {msg.text && (
              <div className={`alert alert-${msg.type}`} role="alert">
                {msg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="vstack gap-3">
              <div>
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">Entrar</button>
            </form>

            <p className="mt-3 mb-0 text-center">
              ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
