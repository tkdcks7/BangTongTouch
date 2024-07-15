import React from 'react';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Welcome to React with TypeScript and Tailwind CSS!</h1>
        <p className="text-gray-500">This is a basic setup for a React project using TypeScript and Tailwind CSS.</p>
      </div>
    </div>
  );
}

export default App;