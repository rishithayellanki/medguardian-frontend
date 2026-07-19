
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Upload from './pages/Upload'
import Results from './pages/Results'
import Interactions from './pages/Interactions'
import MedicineDetail from './pages/MedicineDetail'
import { ThemeProvider } from './context/ThemeContext'
import Landing from './pages/Landing'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
            />
         <Route path="/" element={<Landing />} />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
            />
          <Route
            path="/interactions"
            element={
              <ProtectedRoute>
                <Interactions />
              </ProtectedRoute>
            }
            />
          <Route
            path="/medicine"
            element={
              <ProtectedRoute>
                <MedicineDetail />
              </ProtectedRoute>
            }
            />
        </Routes>
      </AuthProvider>
     </ThemeProvider>
    </BrowserRouter>
  )
}
export default App