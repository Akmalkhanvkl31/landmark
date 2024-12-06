import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { 
  ChevronLeft, 
  Calendar, 
  Box, 
  CheckCircle2, 
  Building2, 
  X,
  Eye,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

const BatchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [batchDetails, setBatchDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState('');
  const [showRemarkInput, setShowRemarkInput] = useState(false);

  useEffect(() => {
    const fetchBatchDetails = () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate fetching batch details
        const batches = [
          { 
            id: 1, 
            name: 'Summer Collection 2024', 
            status: 'Completed', 
            createdAt: '2024-03-01', 
            brand: 'Nike',
            totalProducts: 156,
            completedProducts: 156,
            description: 'Summer collection including ethnic wear and casual wear',
            products: [
              {
                "id": "1000012877711",
                "title": "Men's Blue Slim Tapered Jeans",
                "category": "men-clothing-jeans",
                "design": "Washed",
                "type": "Jeans",
                "fabric": "Cotton Blend",
                "status": "Generated",
                "generatedDescription": "# Product Overview\n\nElevate your style with this sleek, lightweight puffer jacket.\n\n## Key Features\n- Mock collar design\n- Subtle chest logo\n- Full-length sleeves\n- Complete zip closure\n- Handy side pockets\n\n## Details\n* Net Quantity: 1 Number\n* Gender: Men\n* Product: Jacket\n* Type: Puffer\n* Design: Solid\n\n## Care Instructions\n- Machine Wash\n- Model Wears: Size M, has Height 6'0\" and Chest 38\"\n\n## Origin\n- Country of Origin: India\n- Manufactured By: FOUR ACES FASHION HOUSE PVT LTD.-MUMBAI"
            },
              {
                id: "1000012877712",
                title: "Women's Floral Print Maxi Dress",
                category: "women-clothing-dresses",
                design: "Printed",
                type: "Maxi Dress",
                fabric: "Polyester",
                status: "Processing",
                generatedDescription: "Add a touch of elegance to your wardrobe with this stunning floral print maxi dress. The flowing silhouette and vibrant print make it perfect for both casual outings and special occasions."
              }
            ]
          },
          { 
            id: 2, 
            name: 'Winter Essentials', 
            status: 'Processing', 
            createdAt: '2024-02-28', 
            brand: 'Adidas',
            totalProducts: 89, 
            completedProducts: 45,
            description: 'Winter essentials for the cold season',
            products: [
              {
                id: "1000012877713",
                title: "Men's Winter Coat",
                category: "men-clothing-coats",
                design: "Solid",
                type: "Coat",
                fabric: "Wool",
                status: "Generated",
                generatedDescription: "Stay warm this winter with this stylish men's coat, crafted from high-quality wool for durability and warmth."
              },
              {
                id: "1000012877714",
                title: "Women's Down Jacket",
                category: "women-clothing-jackets",
                design: "Patterned",
                type: "Jacket",
                fabric: "Down",
                status: "Processing",
                generatedDescription: "Keep warm and stylish with this down jacket, perfect for cold weather outings."
              }
            ]
          }
        ];

        const parsedId = parseInt(id);
        const batch = batches.find(b => b.id === parsedId);

        if (!batch) {
          throw new Error(`Batch with ID ${id} not found`);
        }

        setBatchDetails(batch);
        setProducts(batch.products);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching batch details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchBatchDetails();
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = () => {
    // Here you would typically make an API call to approve the description
    console.log('Approving description for product:', selectedProduct.id);
    setShowDescription(false);
    setSelectedProduct(null);
  };

  const handleAddRemark = () => {
    // Here you would typically make an API call to save the remark
    console.log('Adding remark for product:', selectedProduct.id, 'Remark:', remark);
    setRemark('');
    setShowRemarkInput(false);
    setShowDescription(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading batch details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate('/batches')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back to Batches
        </button>
      </div>
    );
  }

  if (!batchDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg text-gray-600 mb-4">Batch not found</div>
        <button
          onClick={() => navigate('/batches')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back to Batches
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Batch Info Card */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{batchDetails.name}</h2>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {batchDetails.status}
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={20} />
                <span>Created {batchDetails.createdAt}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 size={20} />
                <span>Brand: {batchDetails.brand}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Box size={20} />
                <span>{batchDetails.totalProducts} Products</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle2 size={20} />
                <span>{batchDetails.completedProducts} Completed</span>
              </div>
            </div>

            <div>
              <p className="text-gray-600">{batchDetails.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Design</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fabric</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                    <div className="text-xs text-gray-500">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.design}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.fabric}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDescription(true);
                      }}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                      <Eye size={16} className="mr-2" />
                      View Description
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDescription && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedProduct.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {selectedProduct.id}</p>
                </div>
                <button 
                  onClick={() => {
                    setShowDescription(false);
                    setSelectedProduct(null);
                    setShowRemarkInput(false);
                    setRemark('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="prose max-w-none mb-6">
                <ReactMarkdown>{selectedProduct.generatedDescription}</ReactMarkdown>
              </div>

              {showRemarkInput && (
                <div className="mb-6">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter your remark here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => setShowRemarkInput(false)}
                      className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRemark}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      disabled={!remark.trim()}
                    >
                      Submit Remark
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowRemarkInput(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Add Remark
                </button>
                <button
                  onClick={handleApprove}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <ThumbsUp size={16} className="mr-2" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchDetailPage;
