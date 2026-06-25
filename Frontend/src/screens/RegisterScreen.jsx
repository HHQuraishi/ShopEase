import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(name, email, password);
      login(data.data, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#161B22', borderRadius: '8px' }}>
      <h1>Register</h1>
      {error && <p style={{ color: '#FF6B6B' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} required />
        <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} required />
        <button type="submit" style={{ width: '100%', background: '#F0A500', padding: '12px', border: 'none', borderRadius: '6px', marginTop: '16px' }}>Register</button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>Have an account? <Link to="/login" style={{ color: '#F0A500' }}>Login</Link></p>
    </div>
  );
}

export default RegisterScreen;