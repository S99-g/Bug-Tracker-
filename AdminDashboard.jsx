import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [assigningBugId, setAssigningBugId] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [assignLoading, setAssignLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bugsData, projectsData, usersData, assignmentsData] = await Promise.all([
        api.getBugs(),
        api.getProjects(),
        api.getUsers(),
        api.getAssignmentsWithDetails()
      ]);
      setBugs(bugsData);
      setProjects(projectsData);
      const developerUsers = usersData.filter(u => u.role === 'developer');
      console.log('All users:', usersData);
      console.log('Developers filtered:', developerUsers);
      setDevelopers(developerUsers);
      setAssignments(assignmentsData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get assignment info for a bug
  const getAssignmentInfo = (bugId) => {
    return assignments.find(assignment => assignment.bug_id === bugId);
  };

  // Helper function to check if a bug is assigned
  const isBugAssigned = (bugId) => {
    return assignments.some(assignment => assignment.bug_id === bugId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAssignClick = (bugId) => {
    console.log('Assign button clicked for bug:', bugId);
    console.log('Available developers:', developers);
    setAssigningBugId(bugId);
    setSelectedDeveloper('');
  };

  const handleAssignBug = async () => {
    if (!assigningBugId || !selectedDeveloper) {
      console.log('Missing data for assignment:', { assigningBugId, selectedDeveloper });
      return;
    }
    console.log('Attempting to assign bug:', { bugId: assigningBugId, developerId: selectedDeveloper });
    setAssignLoading(true);
    setError('');
    try {
      await api.assignBug({ bug_id: assigningBugId, user_id: parseInt(selectedDeveloper) });
      console.log('Assignment successful');
      setAssigningBugId(null);
      setSelectedDeveloper('');
      fetchData();
    } catch (err) {
      console.error('Assignment error:', err);
      setError('Failed to assign bug');
    } finally {
      setAssignLoading(false);
    }
  };

  const handleDeleteDeveloper = async (developerId) => {
    if (!window.confirm('Are you sure you want to delete this developer?')) {
      return;
    }
    
    setDeleteLoading(prev => ({ ...prev, [developerId]: true }));
    setError('');
    
    try {
      await api.deleteUser(developerId);
      fetchData(); // Refresh the data
    } catch (err) {
      setError('Failed to delete developer');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [developerId]: false }));
    }
  };

  const handleDeleteAssignment = async (bugId) => {
    if (!window.confirm('Are you sure you want to remove this assignment?')) {
      return;
    }
    
    setDeleteLoading(prev => ({ ...prev, [`assignment-${bugId}`]: true }));
    setError('');
    
    try {
      await api.deleteAssignmentByBug(bugId);
      fetchData(); // Refresh the data
    } catch (err) {
      setError('Failed to remove assignment');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [`assignment-${bugId}`]: false }));
    }
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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Debug Info */}
        <div className="bg-yellow-100 p-4 rounded-lg col-span-full">
          <h3 className="font-semibold">Debug Info:</h3>
          <p>Developers count: {developers.length}</p>
          <p>Assigning bug ID: {assigningBugId || 'None'}</p>
          <p>Selected developer: {selectedDeveloper || 'None'}</p>
          <p>Developers: {developers.map(d => d.username).join(', ')}</p>
        </div>

        {/* Projects Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Projects ({projects.length})</h2>
          {projects.length > 0 ? (
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="border p-3 rounded">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No projects found</p>
          )}
        </div>

        {/* Bugs Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Bugs ({bugs.length})</h2>
          {bugs.length > 0 ? (
            <div className="space-y-2">
              {bugs.map((bug) => {
                const assignment = getAssignmentInfo(bug.id);
                const isAssigned = isBugAssigned(bug.id);
                
                return (
                  <div key={bug.id} className="border p-3 rounded">
                    <h3 className="font-medium">{bug.title}</h3>
                    <p className="text-gray-600 text-sm">{bug.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        bug.status === 'open' ? 'bg-red-100 text-red-800' :
                        bug.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {bug.status}
                      </span>
                      {isAssigned && assignment && (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          Assigned to: {assignment.developer_name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      {assigningBugId === bug.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={selectedDeveloper}
                            onChange={e => setSelectedDeveloper(e.target.value)}
                            className="border px-2 py-1 rounded"
                          >
                            <option value="">Select Developer</option>
                            {developers.map(dev => (
                              <option key={dev.id} value={dev.id}>{dev.username} ({dev.email})</option>
                            ))}
                          </select>
                          <button
                            onClick={handleAssignBug}
                            disabled={!selectedDeveloper || assignLoading}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-400"
                          >
                            {assignLoading ? 'Assigning...' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setAssigningBugId(null)}
                            className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAssignClick(bug.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            {isAssigned ? 'Reassign' : 'Assign'}
                          </button>
                          {isAssigned && (
                            <button
                              onClick={() => handleDeleteAssignment(bug.id)}
                              disabled={deleteLoading[`assignment-${bug.id}`]}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
                            >
                              {deleteLoading[`assignment-${bug.id}`] ? 'Removing...' : 'Remove Assignment'}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No bugs found</p>
          )}
        </div>

        {/* Assignments Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Assignments ({assignments.length})</h2>
          {assignments.length > 0 ? (
            <div className="space-y-2">
              {assignments.map((assignment) => (
                <div key={assignment.assignment_id} className="border p-3 rounded">
                  <h3 className="font-medium text-sm">{assignment.bug_title}</h3>
                  <p className="text-gray-600 text-xs mb-2">{assignment.bug_description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      Developer: {assignment.developer_name}
                    </span>
                    <span className={`inline-block px-1 py-0.5 text-xs rounded ${
                      assignment.bug_status === 'open' ? 'bg-red-100 text-red-800' :
                      assignment.bug_status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {assignment.bug_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No assignments found</p>
          )}
        </div>

        {/* Developers Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Developers ({developers.length})</h2>
          {developers.length > 0 ? (
            <ul className="space-y-2">
              {developers.map((dev) => (
                <li key={dev.id} className="border p-3 rounded flex items-center justify-between">
                  <span>{dev.username} ({dev.email})</span>
                  <button
                    onClick={() => handleDeleteDeveloper(dev.id)}
                    disabled={deleteLoading[dev.id]}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:bg-gray-400 text-xs"
                  >
                    {deleteLoading[dev.id] ? 'Deleting...' : 'Delete'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No developers found</p>
          )}
        </div>
      </div>
    </div>
  );
}