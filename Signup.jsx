import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'developer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.register(formData);
      console.log('Registration successful:', response);
      
      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <input 
          type="text" 
          name="username"
          placeholder="Username" 
          value={formData.username} 
          onChange={handleInputChange} 
          className="w-full p-2 border mb-4 rounded"
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email} 
          onChange={handleInputChange} 
          className="w-full p-2 border mb-4 rounded"
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password} 
          onChange={handleInputChange} 
          className="w-full p-2 border mb-4 rounded"
        />
        <select 
          name="role"
          value={formData.role} 
          onChange={handleInputChange} 
          className="w-full p-2 border mb-4 rounded"
        >
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
        </select>
        <button 
          onClick={handleSignup} 
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        <div className="mt-4 text-sm text-center">
          <Link to="/" className="text-blue-500">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}