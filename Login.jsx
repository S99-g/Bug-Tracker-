import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.login({
        username: username,
        password: password
      });

      console.log('Login response:', response); // Debug log
      console.log('User role:', response.user?.role); // Debug log

      // Store the token and user info
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Normalize role to lowercase for comparison
      const userRole = response.user.role?.toLowerCase();
      console.log('Normalized role:', userRole); // Debug log

      // Navigate based on actual user role (case-insensitive)
      if (userRole === 'developer') {
        console.log('Navigating to developer dashboard'); // Debug log
        navigate('/developer');
      } else if (userRole === 'admin') {
        console.log('Navigating to admin dashboard'); // Debug log
        navigate('/admin');
      } else {
        console.log('Unknown role, defaulting to admin dashboard'); // Debug log
        navigate('/admin');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full p-2 border mb-4 rounded"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border mb-4 rounded"
        />
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/signup" className="text-blue-500">Don't have an account? Sign Up</Link>
          <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}