import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error en registro');
      setMsg({ type: 'success', text: 'Usuario creado. Redirigiendo…' });
      setTimeout(() => navigate('/login'), 900);
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
            <h2 className="h4 mb-4">Crear cuenta</h2>

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
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="form-text">Mínimo 6 caracteres.</div>
              </div>

              <button className="btn btn-primary w-100" type="submit">Registrarme</button>
            </form>

            <p className="mt-3 mb-0 text-center">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
