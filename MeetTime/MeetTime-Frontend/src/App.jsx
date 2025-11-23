import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { MainLayout } from "@/components";
import { SignIn, SignUp, Dashboard } from "@/pages";

axios.defaults.withCredentials = true;

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
      
        setUser(res.data);

      } catch (error) {
        setUser(null);

      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/pages" element={<MainLayout user={user} setUser={setUser} replace />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/auntifikasi/sign-in" element={<SignIn setUser={setUser} />} />
          <Route path="/auntifikasi/sign-up" element={<SignUp />} />

          <Route path="/" element={<Navigate to="/auntifikasi/sign-in" replace />} />
          <Route path="*" element={<Navigate to="/auntifikasi/sign-in" replace />} />
        </Routes>
      </Router>
    </>
  )
}