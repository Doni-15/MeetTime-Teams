import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components";
import { SignIn, SignUp, Dashboard } from "@/pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/pages" element={<MainLayout replace />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/auntifikasi/sign-in" element={<SignIn />} />
          <Route path="/auntifikasi/sign-up" element={<SignUp />} />

          <Route path="/" element={<Navigate to="/pages/dashboard" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App