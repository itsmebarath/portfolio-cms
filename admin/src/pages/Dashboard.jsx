import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import api from "../services/api";


function Dashboard() {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [stats, setStats] = useState({

        about: 0,

        skills: 0,

        projects: 0,

        blogs: 0,

        experience: 0,

        testimonials: 0,

        services: 0,

        messages: 0

    });


    const [loading, setLoading] = useState(true);


    // =========================================================
    // FETCH DASHBOARD DATA
    // =========================================================

    useEffect(() => {

        fetchDashboardData();

    }, []);


    const fetchDashboardData = async () => {

        try {

            const results = await Promise.allSettled([

                api.get("/about"),

                api.get("/skills"),

                api.get("/projects"),

                api.get("/blogs"),

                api.get("/experiences"),

                api.get("/testimonials"),

                api.get("/services"),

                api.get("/contact")

            ]);


            // -------------------------------------------------
            // ABOUT
            // -------------------------------------------------

            const aboutData =
                results[0].status === "fulfilled"
                    ? results[0].value.data
                    : null;


            let aboutCount = 0;


            if (Array.isArray(aboutData)) {

                aboutCount = aboutData.length;

            } else if (aboutData) {

                aboutCount = 1;

            }


            // -------------------------------------------------
            // SKILLS
            // -------------------------------------------------

            const skillsData =
                results[1].status === "fulfilled"
                    ? results[1].value.data
                    : [];


            const skillsCount =
                Array.isArray(skillsData)
                    ? skillsData.length
                    : 0;


            // -------------------------------------------------
            // PROJECTS
            // -------------------------------------------------

            const projectsData =
                results[2].status === "fulfilled"
                    ? results[2].value.data
                    : [];


            const projectsCount =
                Array.isArray(projectsData)
                    ? projectsData.length
                    : 0;


            // -------------------------------------------------
            // BLOGS
            // -------------------------------------------------

            const blogsData =
                results[3].status === "fulfilled"
                    ? results[3].value.data
                    : [];


            const blogsCount =
                Array.isArray(blogsData)
                    ? blogsData.length
                    : 0;


            // -------------------------------------------------
            // EXPERIENCE
            // -------------------------------------------------

            const experienceData =
                results[4].status === "fulfilled"
                    ? results[4].value.data
                    : [];


            const experienceCount =
                Array.isArray(experienceData)
                    ? experienceData.length
                    : 0;


            // -------------------------------------------------
            // TESTIMONIALS
            // -------------------------------------------------

            const testimonialsData =
                results[5].status === "fulfilled"
                    ? results[5].value.data
                    : [];


            const testimonialsCount =
                Array.isArray(testimonialsData)
                    ? testimonialsData.length
                    : 0;


            // -------------------------------------------------
            // SERVICES
            // -------------------------------------------------

            const servicesData =
                results[6].status === "fulfilled"
                    ? results[6].value.data
                    : [];


            const servicesCount =
                Array.isArray(servicesData)
                    ? servicesData.length
                    : 0;


            // -------------------------------------------------
            // MESSAGES
            // -------------------------------------------------

            const messagesData =
                results[7].status === "fulfilled"
                    ? results[7].value.data
                    : [];


            const messagesCount =
                Array.isArray(messagesData)
                    ? messagesData.length
                    : 0;


            // -------------------------------------------------
            // UPDATE STATE
            // -------------------------------------------------

            setStats({

                about: aboutCount,

                skills: skillsCount,

                projects: projectsCount,

                blogs: blogsCount,

                experience: experienceCount,

                testimonials: testimonialsCount,

                services: servicesCount,

                messages: messagesCount

            });


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // STAT CARD
    // =========================================================

    const StatCard = ({
        title,
        count,
        description,
        icon,
        className,
        path
    }) => {

        return (

            <button
                className={`dashboard-stat-card ${className}`}
                onClick={() => navigate(path)}
            >

                <div className="dashboard-stat-top">

                    <div className="dashboard-stat-icon">
                        {icon}
                    </div>

                    <span className="dashboard-stat-more">
                        •••
                    </span>

                </div>


                <div className="dashboard-stat-number">
                    {loading ? "—" : count}
                </div>


                <div className="dashboard-stat-title">
                    {title}
                </div>


                <div className="dashboard-stat-description">
                    {description}
                </div>

            </button>

        );

    };


    // =========================================================
    // TOTAL CONTENT
    // =========================================================

    const totalSections = 9;


    const availableSections = [

        stats.about > 0,

        stats.skills >= 0,

        stats.projects >= 0,

        stats.blogs >= 0,

        stats.experience >= 0,

        stats.testimonials >= 0,

        stats.services >= 0,

        stats.messages >= 0,

        true

    ].filter(Boolean).length;


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <AdminLayout>


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dashboard-header">


                <div>

                    <span className="dashboard-eyebrow">
                        Welcome back 👋
                    </span>


                    <h1>
                        Hello, Barath
                    </h1>


                    <p>
                        Manage your portfolio content and keep your
                        professional profile up to date.
                    </p>

                </div>


                <button
                    className="dashboard-primary-button"
                    onClick={() =>
                        navigate("/projects")
                    }
                >

                    <span>
                        +
                    </span>

                    Add New Project

                </button>

            </div>


            {/* =================================================
                TOP STAT CARDS
            ================================================= */}

            <div className="dashboard-stat-grid">


                <StatCard

                    title="Projects"

                    count={stats.projects}

                    description="Portfolio projects"

                    icon="▣"

                    className="stat-projects"

                    path="/projects"

                />


                <StatCard

                    title="Skills"

                    count={stats.skills}

                    description="Technical expertise"

                    icon="✦"

                    className="stat-skills"

                    path="/skills"

                />


                <StatCard

                    title="Blog Posts"

                    count={stats.blogs}

                    description="Published articles"

                    icon="✎"

                    className="stat-blogs"

                    path="/blogs"

                />

            </div>


            {/* =================================================
                PORTFOLIO OVERVIEW
            ================================================= */}

            <div className="dashboard-overview-layout">


                <div className="dashboard-overview">


                    <div className="dashboard-section-header">

                        <div>

                            <h2>
                                Portfolio Overview
                            </h2>

                            <p>
                                Your portfolio content at a glance.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/projects")
                            }
                        >
                            View Projects →
                        </button>

                    </div>


                    {/* =================================================
                        OVERVIEW CARDS
                    ================================================= */}

                    <div className="dashboard-overview-grid">


                        {/* PROJECTS */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/projects")
                            }
                        >

                            <div className="overview-icon overview-purple">
                                ▣
                            </div>


                            <div>

                                <span>
                                    Projects
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.projects}
                                </strong>

                                <small>
                                    Portfolio work
                                </small>

                            </div>

                        </button>


                        {/* SKILLS */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/skills")
                            }
                        >

                            <div className="overview-icon overview-blue">
                                ✦
                            </div>


                            <div>

                                <span>
                                    Skills
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.skills}
                                </strong>

                                <small>
                                    Technical skills
                                </small>

                            </div>

                        </button>


                        {/* BLOGS */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/blogs")
                            }
                        >

                            <div className="overview-icon overview-orange">
                                ✎
                            </div>


                            <div>

                                <span>
                                    Blogs
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.blogs}
                                </strong>

                                <small>
                                    Articles
                                </small>

                            </div>

                        </button>


                        {/* EXPERIENCE */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/experience")
                            }
                        >

                            <div className="overview-icon overview-green">
                                ▤
                            </div>


                            <div>

                                <span>
                                    Experience
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.experience}
                                </strong>

                                <small>
                                    Professional experience
                                </small>

                            </div>

                        </button>


                        {/* TESTIMONIALS */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/testimonials")
                            }
                        >

                            <div className="overview-icon overview-pink">
                                ♡
                            </div>


                            <div>

                                <span>
                                    Testimonials
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.testimonials}
                                </strong>

                                <small>
                                    Client feedback
                                </small>

                            </div>

                        </button>


                        {/* SERVICES */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/services")
                            }
                        >

                            <div className="overview-icon overview-yellow">
                                ◆
                            </div>


                            <div>

                                <span>
                                    Services
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.services}
                                </strong>

                                <small>
                                    Services offered
                                </small>

                            </div>

                        </button>


                        {/* MESSAGES */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/messages")
                            }
                        >

                            <div className="overview-icon overview-message">
                                ♡
                            </div>


                            <div>

                                <span>
                                    Messages
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.messages}
                                </strong>

                                <small>
                                    Contact messages
                                </small>

                            </div>

                        </button>


                        {/* ABOUT */}

                        <button
                            className="overview-card"
                            onClick={() =>
                                navigate("/about")
                            }
                        >

                            <div className="overview-icon overview-about">
                                ◎
                            </div>


                            <div>

                                <span>
                                    About
                                </span>

                                <strong>
                                    {loading
                                        ? "—"
                                        : stats.about}
                                </strong>

                                <small>
                                    Profile information
                                </small>

                            </div>

                        </button>

                    </div>


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <div className="dashboard-quick-actions">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Quickly manage your portfolio.
                            </p>

                        </div>


                        <div className="quick-action-grid">


                            <button
                                onClick={() =>
                                    navigate("/projects")
                                }
                            >
                                <span>▣</span>
                                Add Project
                            </button>


                            <button
                                onClick={() =>
                                    navigate("/blogs")
                                }
                            >
                                <span>✎</span>
                                Write Blog
                            </button>


                            <button
                                onClick={() =>
                                    navigate("/experience")
                                }
                            >
                                <span>▤</span>
                                Add Experience
                            </button>


                            <button
                                onClick={() =>
                                    navigate("/messages")
                                }
                            >
                                <span>♡</span>
                                View Messages
                            </button>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT PORTFOLIO STATUS
                ================================================= */}

                <aside className="dashboard-status-card">


                    <div className="status-card-header">

                        <div>

                            <h2>
                                Portfolio
                            </h2>

                            <p>
                                Content status
                            </p>

                        </div>


                        <span className="status-active">
                            Active
                        </span>

                    </div>


                    {/* PROGRESS */}

                    <div className="status-progress-section">

                        <div className="status-progress-title">

                            <span>
                                Content sections
                            </span>

                            <strong>
                                {availableSections} / {totalSections}
                            </strong>

                        </div>


                        <div className="status-progress-bar">

                            <div
                                style={{
                                    width: `${
                                        (
                                            availableSections /
                                            totalSections
                                        ) * 100
                                    }%`
                                }}
                            />

                        </div>


                        <p>
                            All major CMS sections are available.
                        </p>

                    </div>


                    {/* STATUS LIST */}

                    <div className="status-list">


                        <div className="status-item">

                            <span className="status-dot purple" />

                            <div>

                                <strong>
                                    Projects
                                </strong>

                                <small>
                                    {stats.projects} items
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot blue" />

                            <div>

                                <strong>
                                    Skills
                                </strong>

                                <small>
                                    {stats.skills} items
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot orange" />

                            <div>

                                <strong>
                                    Blogs
                                </strong>

                                <small>
                                    {stats.blogs} posts
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot green" />

                            <div>

                                <strong>
                                    Experience
                                </strong>

                                <small>
                                    {stats.experience} items
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot pink" />

                            <div>

                                <strong>
                                    Testimonials
                                </strong>

                                <small>
                                    {stats.testimonials} items
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot yellow" />

                            <div>

                                <strong>
                                    Services
                                </strong>

                                <small>
                                    {stats.services} items
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot message" />

                            <div>

                                <strong>
                                    Messages
                                </strong>

                                <small>
                                    {stats.messages} messages
                                </small>

                            </div>

                        </div>


                        <div className="status-item">

                            <span className="status-dot about" />

                            <div>

                                <strong>
                                    About
                                </strong>

                                <small>
                                    {stats.about} profile
                                </small>

                            </div>

                        </div>

                    </div>


                </aside>

            </div>

        </AdminLayout>

    );
}


export default Dashboard;