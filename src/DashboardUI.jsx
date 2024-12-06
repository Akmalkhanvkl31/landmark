import { useState } from 'react';
import UploadSection from './UploadSection.jsx';
import RecentBatchesTable from './RecentBatchesTable.jsx';
import { DetailsModal, ResultsModal } from './BatchModals.jsx';

const DashboardUI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileStatus, setFileStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchDetails, setBatchDetails] = useState({
    id: `BATCH-${Date.now().toString().slice(-6)}`,
    name: '',
    brand: '',
    productCount: 0
  });
  const [parsedData, setParsedData] = useState([]);

  const recentBatches = [
    { id: 1, name: 'Summer Collection 2024', date: '2024-03-01', status: 'Completed', productCount: 156, brand: 'Nike' },
    { id: 2, name: 'Winter Essentials', date: '2024-02-28', status: 'Processing', productCount: 89, brand: 'Adidas' },
    { id: 3, name: 'Spring Fashion', date: '2024-02-25', status: 'Failed', productCount: 234, brand: 'Puma' },
    { id: 4, name: 'Home Decor Items', date: '2024-02-20', status: 'Completed', productCount: 67, brand: 'IKEA' },
  ];

  const convertCSVToJSON = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const result = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
    return result;
  };

  const validateFile = (file) => {
    if (file.type !== 'text/csv') {
      return {
        valid: false,
        message: 'Please upload a CSV file'
      };
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return {
        valid: false,
        message: 'File size should be less than 10MB'
      };
    }
    
    return {
      valid: true,
      message: 'File ready for processing'
    };
  };

  const handleFile = async (file) => {
    if (!file) {
      handleRemoveFile();
      return;
    }

    const validation = validateFile(file);
    
    if (validation.valid) {
      setSelectedFile(file);
      setFileStatus({
        type: 'success',
        message: validation.message,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2)
      });
      setShowModal(true);
    } else {
      setFileStatus({
        type: 'error',
        message: validation.message
      });
      
      setTimeout(() => {
        setFileStatus(null);
      }, 3000);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileStatus(null);
    setBatchDetails({
      id: `BATCH-${Date.now().toString().slice(-6)}`,
      name: '',
      brand: '',
      productCount: 0
    });
    setParsedData([]);
  };

  const handleSubmitBatch = async () => {
    if (!selectedFile || !batchDetails.name || !batchDetails.brand) {
      return;
    }

    setIsProcessing(true);

    try {
      const text = await selectedFile.text();
      const jsonData = convertCSVToJSON(text);
      setParsedData(jsonData);
      setBatchDetails(prev => ({
        ...prev,
        productCount: jsonData.length
      }));

      setShowModal(false);
      setShowResultsModal(true);
    } catch (error) {
      console.error('Error processing file:', error);
      setFileStatus({
        type: 'error',
        message: 'Error processing file'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">Product Description Generator</h2>
          <p className="text-blue-100 text-lg">
            Transform your product data into compelling descriptions in minutes.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <UploadSection 
            handleFile={handleFile} 
            isProcessing={isProcessing} 
            fileStatus={fileStatus} 
          />
        </div>

        {/* Recent Batches Table */}
        <RecentBatchesTable batches={recentBatches} />

        {/* Modals */}
        <DetailsModal 
          showModal={showModal}
          setShowModal={setShowModal}
          batchDetails={batchDetails}
          setBatchDetails={setBatchDetails}
          handleSubmitBatch={handleSubmitBatch}
        />

        <ResultsModal 
          showResultsModal={showResultsModal}
          setShowResultsModal={setShowResultsModal}
          handleRemoveFile={handleRemoveFile}
          batchDetails={batchDetails}
          parsedData={parsedData}
        />
      </div>
    </div>
  );
};

export default DashboardUI;
