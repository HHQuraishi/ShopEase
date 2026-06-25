import { Link } from 'react-router-dom';

function NotFoundScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Jis page pe jaana chahte ho, woh exist nahi karta.</p>
      <Link to="/" style={{ color: '#F0A500' }}>Go Home</Link>
    </div>
  );
}

export default NotFoundScreen;