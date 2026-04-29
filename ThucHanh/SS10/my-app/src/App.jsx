import { Routes, Route } from "react-router-dom";
import KanbanPage from "./pages/KanbanPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={ <ProtectedRoute><KanbanPage /></ProtectedRoute>} />

    </Routes>
  )
}

export default App;