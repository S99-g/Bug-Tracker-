import React from 'react';

const TestComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bug Tracker App</h1>
        <p className="text-gray-600">React is working! 🎉</p>
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">If you can see this, the app is loading correctly.</p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent; 