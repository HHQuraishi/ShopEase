import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotFoundScreen from './screens/NotFoundScreen';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<ProtectedRoute><CartScreen /></ProtectedRoute>} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;