import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const UploadSection = ({ handleFile, isProcessing, fileStatus }) => {
  const [dragActive, setDragActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    handleFile(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDragActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={`relative border-2 rounded-xl p-8 transition-all duration-300 ease-in-out
        ${dragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-dashed border-gray-300'}
        ${fileStatus?.type === 'success' ? 'border-green-500 bg-green-50' : ''}
        ${fileStatus?.type === 'error' ? 'border-red-500 bg-red-50 shake' : ''}
        ${isProcessing ? 'border-blue-500 bg-blue-50' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Drag Active Overlay */}
      {dragActive && (
        <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-xl flex items-center justify-center animate-pulse">
          <div className="text-center transform scale-110 transition-transform duration-200">
            <Upload size={48} className="mx-auto text-blue-600 mb-4" />
            <p className="text-blue-600 font-medium text-lg">Release to Upload File</p>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="text-center">
          <Loader2 size={48} className="mx-auto text-blue-600 mb-4 animate-spin" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Processing your file...
          </h3>
          <p className="text-gray-500">
            This will just take a moment
          </p>
        </div>
      )}

      {/* Default Upload State */}
      {!fileStatus && !dragActive && !isProcessing && (
        <div className="text-center">
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Upload your product data
          </h3>
          <p className="text-gray-500 mb-6">
            Drag and drop your CSV file here, or click to browse
          </p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".csv"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer inline-flex items-center"
          >
            <FileText size={20} className="mr-2" />
            Select File
          </label>
        </div>
      )}

      {/* Success State */}
      {fileStatus?.type === 'success' && !isProcessing && (
        <div className="text-center">
          <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
          <div className="flex items-center justify-center space-x-2 mb-2">
            <FileText size={20} className="text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">
              {fileStatus.fileName}
            </h3>
          </div>
          <p className="text-gray-500 mb-4">
            {fileStatus.fileSize}MB - {fileStatus.message}
          </p>
          <button
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Choose a different file
          </button>
        </div>
      )}

      {/* Error State */}
      {fileStatus?.type === 'error' && (
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            {fileStatus.message}
          </h3>
          <p className="text-red-600 mb-4">
            Please try uploading a different file
          </p>
        </div>
      )}
    </div>
  );
};

UploadSection.propTypes = {
  handleFile: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  fileStatus: PropTypes.shape({
    type: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default UploadSection;
