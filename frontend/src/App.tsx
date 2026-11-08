import { Layout } from "@/components/layout"
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Signup } from "./pages/auth/Signup"
import { useAuthStore } from "./stores/auth"
import { IdeasPage } from "./pages/ideas"
import { Members } from "./pages/members"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><IdeasPage /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
      </Routes>
    </Layout>
  )
}

export default App
