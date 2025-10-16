import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = () => {
    alert(`Password reset link sent to ${email}`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-4" />
        <button onClick={handleReset} className="w-full bg-blue-500 text-white py-2 rounded">Send Reset Link</button>
        <div className="mt-4 text-sm text-center">
          <Link to="/" className="text-blue-500">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
