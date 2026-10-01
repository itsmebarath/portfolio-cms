import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        techStack: "",
        githubUrl: "",
        liveUrl: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await api.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setForm((previous) => ({
                ...previous,
                image: response.data.url
            }));

        } catch (error) {
            console.error("Image upload error:", error);
            alert("Image upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            if (editingId) {

                await api.put(
                    `/projects/${editingId}`,
                    form
                );

                alert("Project updated successfully!");

            } else {

                await api.post(
                    "/projects",
                    form
                );

                alert("Project added successfully!");
            }

            resetForm();

            await fetchProjects();

        } catch (error) {
            console.error("Error saving project:", error);

            alert("Failed to save project.");

        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project.id);

        setForm({
            title: project.title || "",
            description: project.description || "",
            image: project.image || "",
            techStack: project.techStack || "",
            githubUrl: project.githubUrl || "",
            liveUrl: project.liveUrl || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/projects/${id}`);

            alert("Project deleted successfully!");

            await fetchProjects();

        } catch (error) {
            console.error("Delete error:", error);

            alert("Failed to delete project.");
        }
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            image: "",
            techStack: "",
            githubUrl: "",
            liveUrl: ""
        });

        setEditingId(null);
    };

    return (
        <AdminLayout>

            {/* PAGE HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        PORTFOLIO
                    </span>

                    <h1>
                        Projects
                    </h1>

                    <p>
                        Manage the projects displayed on your
                        portfolio.
                    </p>

                </div>

                <div className="content-header-badge">
                    {projects.length} Projects
                </div>

            </div>


            {/* PROJECT EDITOR */}

            <section className="projects-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon project-heading-icon">
                        ▣
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Project"
                                : "Add New Project"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your project information."
                                : "Add a new project to your portfolio."}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="projects-form-grid">

                        {/* TITLE */}

                        <div className="modern-field">

                            <label>
                                Project Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Student Management System"
                                required
                            />

                        </div>


                        {/* TECH STACK */}

                        <div className="modern-field">

                            <label>
                                Technology Stack
                            </label>

                            <input
                                type="text"
                                name="techStack"
                                value={form.techStack}
                                onChange={handleChange}
                                placeholder="Java, Spring Boot, PostgreSQL"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="modern-field full-width">

                            <label>
                                Project Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe what the project does..."
                                rows="5"
                            />

                        </div>


                        {/* IMAGE */}

                        <div className="modern-field full-width">

                            <label>
                                Project Image
                            </label>

                            <div className="project-upload-area">

                                <label className="project-upload-box">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />

                                    {uploading ? (

                                        <div className="upload-content">

                                            <span className="upload-icon">
                                                ↑
                                            </span>

                                            <strong>
                                                Uploading image...
                                            </strong>

                                            <small>
                                                Please wait
                                            </small>

                                        </div>

                                    ) : form.image ? (

                                        <div className="project-upload-preview">

                                            <img
                                                src={form.image}
                                                alt="Project preview"
                                            />

                                            <div className="preview-overlay">
                                                Change Image
                                            </div>

                                        </div>

                                    ) : (

                                        <div className="upload-content">

                                            <span className="upload-icon">
                                                ↑
                                            </span>

                                            <strong>
                                                Upload project image
                                            </strong>

                                            <small>
                                                PNG, JPG or WEBP
                                            </small>

                                        </div>

                                    )}

                                </label>

                            </div>

                        </div>


                        {/* GITHUB */}

                        <div className="modern-field">

                            <label>
                                GitHub URL
                            </label>

                            <input
                                type="url"
                                name="githubUrl"
                                value={form.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                            />

                        </div>


                        {/* LIVE */}

                        <div className="modern-field">

                            <label>
                                Live Project URL
                            </label>

                            <input
                                type="url"
                                name="liveUrl"
                                value={form.liveUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                            />

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="projects-form-footer">

                        <div>

                            <strong>
                                Portfolio project
                            </strong>

                            <span>
                                This project will appear on your
                                public portfolio.
                            </span>

                        </div>


                        <div className="projects-form-actions">

                            {editingId && (

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            )}

                            <button
                                type="submit"
                                className="modern-save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Project"
                                        : "Add Project"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* PROJECT LIST */}

            <div className="projects-list-header">

                <div>

                    <h2>
                        Your Projects
                    </h2>

                    <p>
                        Projects currently stored in your CMS.
                    </p>

                </div>

                <span className="projects-total">
                    {projects.length} total
                </span>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading projects...
                </div>

            ) : projects.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        ▣
                    </div>

                    <h2>
                        No Projects Added
                    </h2>

                    <p>
                        Add your first project above.
                    </p>

                </div>

            ) : (

                <div className="projects-modern-grid">

                    {projects.map((project) => (

                        <article
                            className="modern-project-card"
                            key={project.id}
                        >

                            {/* IMAGE */}

                            {project.image ? (

                                <div className="project-card-image-wrapper">

                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="modern-project-image"
                                    />

                                </div>

                            ) : (

                                <div className="project-card-placeholder">
                                    ▣
                                </div>

                            )}


                            {/* CONTENT */}

                            <div className="modern-project-content">

                                <div className="project-card-top">

                                    <div>

                                        <h3>
                                            {project.title}
                                        </h3>

                                        <span>
                                            {project.techStack ||
                                                "Technology stack not added"}
                                        </span>

                                    </div>

                                    <span className="project-card-number">
                                        #{String(project.id).padStart(2, "0")}
                                    </span>

                                </div>


                                <p>
                                    {project.description ||
                                        "No project description added."}
                                </p>


                                {/* LINKS */}

                                <div className="project-card-links">

                                    {project.githubUrl && (

                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub ↗
                                        </a>

                                    )}

                                    {project.liveUrl && (

                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Live Demo ↗
                                        </a>

                                    )}

                                </div>


                                {/* ACTIONS */}

                                <div className="modern-project-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(project)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="project-delete"
                                        onClick={() =>
                                            handleDelete(project.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </AdminLayout>
    );
}

export default Projects;