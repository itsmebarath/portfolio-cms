import { useLocation, useNavigate } from "react-router-dom";

function AdminLayout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/");
    };


    const isActive = (path) => {
        return location.pathname === path;
    };


    return (

        <div className="admin-layout">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="sidebar">


                {/* LOGO */}

                <div className="sidebar-header">

                    <div className="sidebar-logo">
                        P
                    </div>

                    <div className="sidebar-brand">

                        <h2>
                            Portfolio <span>CMS</span>
                        </h2>

                    </div>

                </div>


                {/* PROFILE */}

                <div className="sidebar-profile">

                    <div className="profile-avatar">
                        B
                    </div>

                    <div className="profile-info">

                        <strong>
                            Barath Raj
                        </strong>

                        <span>
                            Administrator
                        </span>

                    </div>

                    <button
                        className="profile-more"
                        type="button"
                    >
                        •••
                    </button>

                </div>


                {/* NAVIGATION */}

                <div className="sidebar-nav">


                    {/* WORKSPACE */}

                    <div className="nav-section">

                        <div className="nav-section-title">
                            WORKSPACE
                        </div>


                        <button
                            className={`nav-item ${
                                isActive("/dashboard")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >

                            <span className="nav-icon">
                                ⌂
                            </span>

                            <span>
                                Dashboard
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/about")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/about")
                            }
                        >

                            <span className="nav-icon">
                                ◎
                            </span>

                            <span>
                                About
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/skills")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/skills")
                            }
                        >

                            <span className="nav-icon">
                                ✦
                            </span>

                            <span>
                                Skills
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/projects")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/projects")
                            }
                        >

                            <span className="nav-icon">
                                ▣
                            </span>

                            <span>
                                Projects
                            </span>

                        </button>

                    </div>


                    {/* CONTENT */}

                    <div className="nav-section">

                        <div className="nav-section-title">
                            CONTENT
                        </div>


                        <button
                            className={`nav-item ${
                                isActive("/blogs")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/blogs")
                            }
                        >

                            <span className="nav-icon">
                                ✎
                            </span>

                            <span>
                                Blogs
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/experience")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/experience")
                            }
                        >

                            <span className="nav-icon">
                                ▤
                            </span>

                            <span>
                                Experience
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/testimonials")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/testimonials")
                            }
                        >

                            <span className="nav-icon">
                                ♡
                            </span>

                            <span>
                                Testimonials
                            </span>

                        </button>


                        <button
                            className={`nav-item ${
                                isActive("/services")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/services")
                            }
                        >

                            <span className="nav-icon">
                                ◆
                            </span>

                            <span>
                                Services
                            </span>

                        </button>


                        {/* MESSAGES */}

                        <button
                            className={`nav-item ${
                                isActive("/messages")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                navigate("/messages")
                            }
                        >

                            <span className="nav-icon">
                                ♡
                            </span>

                            <span>
                                Messages
                            </span>

                        </button>

                    </div>

                </div>


                {/* LOGOUT */}

                <div className="sidebar-bottom">

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        <span className="logout-icon">
                            ↪
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="main-content">


                {/* TOP BAR */}

                <header className="topbar">

                    <div className="breadcrumb">

                        <span>
                            Portfolio CMS
                        </span>

                        <span className="breadcrumb-separator">
                            /
                        </span>

                        <strong>
                            {location.pathname
                                .replace("/", "")
                                .replace(
                                    /^\w/,
                                    (c) => c.toUpperCase()
                                ) || "Dashboard"}
                        </strong>

                    </div>


                    <div className="topbar-right">

                        <button
                            className="topbar-icon"
                            type="button"
                        >
                            ◇
                        </button>


                        <div className="topbar-profile">

                            <div className="topbar-avatar">
                                B
                            </div>

                            <div>

                                <strong>
                                    Barath Raj
                                </strong>

                                <span>
                                    Admin
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* PAGE CONTENT */}

                <section className="content">

                    {children}

                </section>

            </main>

        </div>
    );
}

export default AdminLayout;