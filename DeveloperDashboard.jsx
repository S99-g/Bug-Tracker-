import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function DeveloperDashboard() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      
      // Only fetch bugs if user is a developer
      if (user.role === 'developer') {
        fetchAssignedBugs(user.id);
      } else {
        setError('Access denied. Only developers can access this dashboard.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/');
    }
  }, [navigate]);

  const fetchAssignedBugs = async (developerId) => {
    try {
      setLoading(true);
      const assignedBugs = await api.getAssignedBugs(developerId);
      setBugs(assignedBugs);
    } catch (error) {
      setError('Failed to fetch assigned bugs');
      console.error('Error fetching assigned bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bugId, newStatus) => {
    try {
      await api.updateBug(bugId, { status: newStatus });
      // Refresh bugs after update
      if (currentUser) {
        fetchAssignedBugs(currentUser.id);
      }
    } catch (error) {
      setError('Failed to update bug status');
      console.error('Error updating bug:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Developer Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Assigned Bugs ({bugs.length})</h2>
        {bugs.length > 0 ? (
          <div className="space-y-4">
            {bugs.map((bug) => (
              <div key={bug.bug_id} className="border p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{bug.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    bug.status === 'open' ? 'bg-red-100 text-red-800' :
                    bug.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {bug.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{bug.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(bug.bug_id, 'in_progress')}
                    disabled={bug.status === 'in_progress'}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:bg-gray-300"
                  >
                    Start Work
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(bug.bug_id, 'closed')}
                    disabled={bug.status === 'closed'}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bugs assigned to you</p>
        )}
      </div>
    </div>
  );
}
