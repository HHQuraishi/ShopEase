import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

function ProfileScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setName(data.data.name);
        setEmail(data.data.email);
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updateData = { name, email };
      if (password) updateData.password = password;
      const { data } = await updateUserProfile(updateData);
      login(data.data, data.token);
      alert('Profile updated!');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', background: '#161B22', borderRadius: '8px' }}>
      <h1>My Profile</h1>
      {error && <p style={{ color: '#FF6B6B' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password (leave empty to keep same)" style={{ width: '100%', padding: '12px', margin: '8px 0', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', color: 'white' }} />
        <button type="submit" style={{ width: '100%', background: '#F0A500', padding: '12px', border: 'none', borderRadius: '6px', marginTop: '16px' }}>Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileScreen;