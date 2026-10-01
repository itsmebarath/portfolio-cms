import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Experience() {
    const [experiences, setExperiences] = useState([]);

    const [form, setForm] = useState({
        company: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
        location: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await api.get("/experiences");
            setExperiences(response.data);
        } catch (error) {
            console.error("Error fetching experience:", error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            if (editingId) {
                await api.put(
                    `/experiences/${editingId}`,
                    form
                );

                alert("Experience updated successfully!");
            } else {
                await api.post(
                    "/experiences",
                    form
                );

                alert("Experience added successfully!");
            }

            resetForm();
            await fetchExperiences();

        } catch (error) {
            console.error("Error saving experience:", error);
            alert("Failed to save experience.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (experience) => {
        setEditingId(experience.id);

        setForm({
            company: experience.company || "",
            role: experience.role || "",
            description: experience.description || "",
            startDate: experience.startDate || "",
            endDate: experience.endDate || "",
            location: experience.location || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/experiences/${id}`);

            alert("Experience deleted successfully!");

            await fetchExperiences();

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete experience.");
        }
    };

    const resetForm = () => {
        setForm({
            company: "",
            role: "",
            description: "",
            startDate: "",
            endDate: "",
            location: ""
        });

        setEditingId(null);
    };

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        CAREER
                    </span>

                    <h1>
                        Experience
                    </h1>

                    <p>
                        Manage your professional experience and career history.
                    </p>

                </div>

                <div className="content-header-badge">
                    {experiences.length} Experiences
                </div>

            </div>


            {/* EDITOR */}

            <section className="experience-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon experience-heading-icon">
                        💼
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Experience"
                                : "Add New Experience"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your professional experience."
                                : "Add your latest professional experience."}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="experience-form-grid">

                        <div className="modern-field">

                            <label>
                                Company
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                placeholder="e.g. Amazon"
                                required
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                placeholder="e.g. Java Developer Intern"
                                required
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                Start Date
                            </label>

                            <input
                                type="text"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                placeholder="e.g. June 2026"
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                End Date
                            </label>

                            <input
                                type="text"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                placeholder="e.g. August 2026 or Present"
                            />

                        </div>


                        <div className="modern-field full-width">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Chennai, India / Remote"
                            />

                        </div>


                        <div className="modern-field full-width">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe your responsibilities, achievements and technologies..."
                                rows="6"
                            />

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="experience-form-footer">

                        <div>

                            <strong>
                                Professional experience
                            </strong>

                            <span>
                                This information will appear in your portfolio.
                            </span>

                        </div>


                        <div className="experience-form-actions">

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
                                        ? "Update Experience"
                                        : "Add Experience"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* LIST */}

            <div className="experience-list-header">

                <div>

                    <h2>
                        Work Experience
                    </h2>

                    <p>
                        Professional experience currently stored in your CMS.
                    </p>

                </div>

                <span className="experience-total">
                    {experiences.length} total
                </span>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading experience...
                </div>

            ) : experiences.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        💼
                    </div>

                    <h2>
                        No Experience Added
                    </h2>

                    <p>
                        Add your first professional experience above.
                    </p>

                </div>

            ) : (

                <div className="experience-modern-list">

                    {experiences.map((experience) => (

                        <article
                            className="modern-experience-card"
                            key={experience.id}
                        >

                            <div className="experience-timeline">

                                <div className="experience-dot">
                                </div>

                                <div className="experience-line">
                                </div>

                            </div>


                            <div className="experience-card-content">

                                <div className="experience-card-header">

                                    <div>

                                        <span className="experience-role">
                                            {experience.role}
                                        </span>

                                        <h3>
                                            {experience.company}
                                        </h3>

                                    </div>

                                    <span className="experience-number">
                                        #{String(experience.id).padStart(2, "0")}
                                    </span>

                                </div>


                                <div className="experience-meta">

                                    {experience.startDate && (
                                        <span>
                                            {experience.startDate}
                                            {" — "}
                                            {experience.endDate || "Present"}
                                        </span>
                                    )}

                                    {experience.location && (
                                        <span>
                                            📍 {experience.location}
                                        </span>
                                    )}

                                </div>


                                {experience.description && (

                                    <p>
                                        {experience.description}
                                    </p>

                                )}


                                <div className="experience-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(experience)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="experience-delete"
                                        onClick={() =>
                                            handleDelete(experience.id)
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

export default Experience;