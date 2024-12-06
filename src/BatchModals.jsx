import { X } from 'lucide-react';
import PropTypes from 'prop-types';

export const DetailsModal = ({ 
  showModal, 
  setShowModal, 
  batchDetails, 
  setBatchDetails, 
  handleSubmitBatch 
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Batch Details</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch ID
            </label>
            <input
              type="text"
              value={batchDetails.id}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Name
            </label>
            <input
              type="text"
              value={batchDetails.name}
              onChange={(e) => setBatchDetails(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter batch name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              value={batchDetails.brand}
              onChange={(e) => setBatchDetails(prev => ({ ...prev, brand: e.target.value }))}
              placeholder="Enter brand name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitBatch}
              disabled={!batchDetails.name || !batchDetails.brand}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200
                ${(!batchDetails.name || !batchDetails.brand)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Start Processing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResultsModal = ({
  showResultsModal,
  setShowResultsModal,
  handleRemoveFile,
  batchDetails,
  parsedData
}) => {
  if (!showResultsModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 m-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Processed Data</h3>
            <p className="text-sm text-gray-500 mt-1">
              Batch: {batchDetails.name} | Brand: {batchDetails.brand} | {parsedData.length} items processed
            </p>
          </div>
          <button
            onClick={() => {
              setShowResultsModal(false);
              handleRemoveFile();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {parsedData.map((item, index) => {
              const nonEmptyFields = Object.entries(item).filter(([, value]) => 
                value !== undefined && value !== null && value.toString().trim() !== ''
              );

              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-medium text-gray-500">Item #{index + 1}</div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {nonEmptyFields.length} fields
                    </div>
                  </div>
                  <div className="space-y-2">
                    {nonEmptyFields.map(([fieldName, value], fieldIndex) => (
                      <div key={fieldIndex} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">{fieldName}</span>
                        <span className="text-sm text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setShowResultsModal(false);
              handleRemoveFile();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={() => {
              console.log('Generating descriptions for:', parsedData);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Generate Descriptions
          </button>
        </div>
      </div>
    </div>
  );
};

DetailsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  batchDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
  setBatchDetails: PropTypes.func.isRequired,
  handleSubmitBatch: PropTypes.func.isRequired,
};

ResultsModal.propTypes = {
  showResultsModal: PropTypes.bool.isRequired,
  setShowResultsModal: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  batchDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
  parsedData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
