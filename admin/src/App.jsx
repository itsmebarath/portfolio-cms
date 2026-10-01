import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Experience from "./pages/Experience";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import Messages from "./pages/Messages";    

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* About */}
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />

                {/* Skills */}
                <Route
                    path="/skills"
                    element={
                        <ProtectedRoute>
                            <Skills />
                        </ProtectedRoute>
                    }
                />

                {/* Projects */}
                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />

                {/* Blogs */}
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoute>
                            <Blogs />
                        </ProtectedRoute>
                    }
                />

                {/* Experience */}
                <Route
                    path="/experience"
                    element={
                        <ProtectedRoute>
                            <Experience />
                        </ProtectedRoute>
                    }
                />

                {/* Testimonials */}
                <Route
                    path="/testimonials"
                    element={
                        <ProtectedRoute>
                            <Testimonials />
                        </ProtectedRoute>
                    }
                />

                {/* Services */}
                <Route
                    path="/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/messages"
    element={
        <ProtectedRoute>
            <Messages />
        </ProtectedRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;