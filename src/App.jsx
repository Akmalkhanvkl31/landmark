import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Sidebar.jsx'
import LoginPage from './LoginPage.jsx'
import DashboardUI from './DashboardUI.jsx'
import BatchListPage from './BatchListPage.jsx'
import BatchDetailPage from './BatchDetailPage.jsx'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="pt-16">
                <Routes>
                  <Route path="/dashboard" element={<DashboardUI />} />
                  <Route path="/batches" element={<BatchListPage />} />
                  <Route path="/batches/:id" element={<BatchDetailPage />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
