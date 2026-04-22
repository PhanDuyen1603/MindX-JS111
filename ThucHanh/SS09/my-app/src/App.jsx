import { Routes, Route } from 'react-router-dom'
import KanbanPage from './pages/KanbanPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><KanbanPage /></ProtectedRoute>} /> //Trang ứng dụng

      <Route path="/login" element={<LoginPage />} /> //Trang đăng nhập
    </Routes>
  )
}

export default App