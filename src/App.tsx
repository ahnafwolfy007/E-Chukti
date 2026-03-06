import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/Dashboard'
import ContractsPage from './pages/Contracts'
import AIGeneratorPage from './pages/AIGenerator'
import ContractEditorPage from './pages/ContractEditor'
import TemplatesPage from './pages/Templates'
import SettingsPage from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contracts/:id/edit" element={<ContractEditorPage />} />
        <Route path="/ai-generator" element={<AIGeneratorPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
