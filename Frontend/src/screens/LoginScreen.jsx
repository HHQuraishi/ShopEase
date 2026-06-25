import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(email, password);
      login(data.data, data.token);
      const from = location.state?.from || '/';
      navigate(from);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#161B22', borderRadius: '8px' }}>
      <h1>Sign In</h1>
      {error && <p style={{ color: '#FF6B6B' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} required />
        <button type="submit" style={{ width: '100%', background: '#F0A500', padding: '12px', border: 'none', borderRadius: '6px', marginTop: '16px' }}>Login</button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>New customer? <Link to="/register" style={{ color: '#F0A500' }}>Register</Link></p>
    </div>
  );
}

export default LoginScreen;