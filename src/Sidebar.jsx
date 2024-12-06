import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Settings } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Description Gen</h1>
          </div>

          <nav className="flex space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={20} className="mr-2" />
              Home
            </Link>

            <Link
              to="/batches"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'batches'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab('batches')}
            >
              <FileText size={20} className="mr-2" />
              Batches
            </Link>

            <Link
              to="/settings"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'settings'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} className="mr-2" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
