import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trash, 
  Edit, 
  Share2,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BatchListPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const batches = [
    { 
      id: 1, 
      name: 'Summer Collection 2024', 
      date: '2024-03-01', 
      status: 'Completed', 
      productCount: 156, 
      brand: 'Nike',
      progress: 100
    },
    { 
      id: 2, 
      name: 'Winter Essentials', 
      date: '2024-02-28', 
      status: 'Processing', 
      productCount: 89, 
      brand: 'Adidas',
      progress: 45
    },
    { 
      id: 3, 
      name: 'Spring Fashion', 
      date: '2024-02-25', 
      status: 'Failed', 
      productCount: 234, 
      brand: 'Puma',
      progress: 80
    },
    { 
      id: 4, 
      name: 'Home Decor Items', 
      date: '2024-02-20', 
      status: 'Completed', 
      productCount: 67, 
      brand: 'IKEA',
      progress: 100
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Failed': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getBrandColor = (brand) => {
    const colors = {
      Nike: 'bg-purple-100 text-purple-800 border border-purple-200',
      Adidas: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      Puma: 'bg-pink-100 text-pink-800 border border-pink-200',
      IKEA: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    };
    return colors[brand] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const filteredBatches = batches
    .filter(batch => {
      if (selectedFilter === 'all') {
        return true;
      }
      return batch.status.toLowerCase() === selectedFilter.toLowerCase();
    })
    .filter(batch => batch.name.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <header className="bg-white shadow-sm rounded-xl mb-8">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200">
              <Plus size={20} className="mr-2" />
              New Batch
            </button>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search batches..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                ${selectedFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                ${selectedFilter === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                ${selectedFilter === 'processing' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedFilter('processing')}
            >
              Processing
            </button>
            <button
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Batch Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{batch.name}</div>
                    <div className="text-xs text-gray-500">ID: #{batch.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBrandColor(batch.brand)}`}>
                      {batch.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(batch.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-gray-500">2:30 PM</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${batch.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{batch.progress}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{batch.productCount}</div>
                    <div className="text-xs text-gray-500">items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/batches/${batch.id}`}>
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                          <Eye size={16} className="mr-2" />
                          View Batch
                        </button>
                      </Link>
                      <div className="relative">
                        <button 
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(isDropdownOpen === batch.id ? null : batch.id)}
                        >
                          <MoreVertical size={18} />
                        </button>
                        {isDropdownOpen === batch.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                              <Edit size={16} className="mr-2" /> Edit Batch
                            </button>
                            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                              <Share2 size={16} className="mr-2" /> Share Batch
                            </button>
                            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                              <Download size={16} className="mr-2" /> Export
                            </button>
                            <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                              <Trash size={16} className="mr-2" /> Delete Batch
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {filteredBatches.length} of {filteredBatches.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50">
                <ChevronLeft size={20} />
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">1</button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchListPage;
