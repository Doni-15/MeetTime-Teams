import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/config/api";

import { MainLayout, ProtectedRoute, GuestRoute } from "@/components";

import { 
  SignIn, SignUp, Dashboard, NotFound, ServerError, InputKrs
} from "@/pages";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/user");
        setUser(res.data);
      } 
      catch (error) {
        if (!error.response) {
          setIsServerError(true);
        }
        else if (error.response.status >= 500) {
          setIsServerError(true);
        }
        else {
          setUser(null);
        }
      } 
      finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isServerError) {
      return <ServerError />;
  }

  if (loading) return null;

  return (
    <>
      <Router>
        <Routes>
          {/* --- AREA PRIVATE (Dashboard) --- */}
          <Route path="/pages" element={
            <ProtectedRoute user={user} loading={loading}>
              <MainLayout user={user} setUser={setUser} />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="input-krs" element={<InputKrs />} />
          </Route>
          {/* --- AREA PRIVATE (Dashboard) --- */}

          {/* --- AREA PUBLIC (Login/Register) --- */}
          <Route path="/autentifikasi/sign-in" element={
            <GuestRoute user={user} loading={loading}>
              <SignIn setUser={setUser} />
            </GuestRoute>
          }/>

          <Route path="/autentifikasi/sign-up" element={
            <GuestRoute user={user} loading={loading}>
              <SignUp />
            </GuestRoute>
          }/>
          {/* --- AREA PUBLIC (Login/Register) --- */}

          <Route path="/" element={<Navigate to="/autentifikasi/sign-in" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}