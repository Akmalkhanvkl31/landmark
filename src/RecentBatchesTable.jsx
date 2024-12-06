import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MoreVertical, Eye, Trash, Edit, Share2 } from 'lucide-react';

const RecentBatchesTable = ({ batches }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm mt-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Batches</h3>
      </div>
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
              Products
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {batches.map((batch) => (
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
                <div className="text-sm text-gray-900 font-medium">{batch.productCount}</div>
                <div className="text-xs text-gray-500">items</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <Eye size={16} className="mr-2" />
                    View Batch
                  </button>
                  <div className="relative" ref={dropdownRef}>
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
  );
};

RecentBatchesTable.propTypes = {
  batches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      productCount: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentBatchesTable;
