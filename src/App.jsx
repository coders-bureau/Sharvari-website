import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <Router>
            <AuthProvider>
                <SiteSettingsProvider>
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        {/* Public Routes wrapped in Layout */}
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/sys/secure/admin-dashboard" element={<AdminDashboard />} />
                        </Route>
                    </Routes>
                </SiteSettingsProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
