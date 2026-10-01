import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Skills() {
    const [skills, setSkills] = useState([]);

    const [form, setForm] = useState({
        name: "",
        category: "",
        level: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await api.get("/skills");

            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
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
                    `/skills/${editingId}`,
                    form
                );

                alert("Skill updated successfully!");
            } else {
                await api.post(
                    "/skills",
                    form
                );

                alert("Skill added successfully!");
            }

            resetForm();

            await fetchSkills();

        } catch (error) {
            console.error("Error saving skill:", error);

            alert("Failed to save skill.");

        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill.id);

        setForm({
            name: skill.name || "",
            category: skill.category || "",
            level: skill.level || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/skills/${id}`);

            alert("Skill deleted successfully!");

            await fetchSkills();

        } catch (error) {
            console.error("Error deleting skill:", error);

            alert("Failed to delete skill.");
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            category: "",
            level: ""
        });

        setEditingId(null);
    };

    const getLevelClass = (level) => {
        if (!level) return "";

        return level
            .toLowerCase()
            .replace(/\s+/g, "-");
    };

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        EXPERTISE
                    </span>

                    <h1>
                        Skills
                    </h1>

                    <p>
                        Manage the technical skills displayed
                        on your portfolio.
                    </p>

                </div>

                <div className="content-header-badge">
                    {skills.length} Skills
                </div>

            </div>


            {/* ADD / EDIT FORM */}

            <section className="skills-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon skill-heading-icon">
                        ✦
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Skill"
                                : "Add New Skill"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your skill information."
                                : "Add a technical skill to your portfolio."}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="skills-form-grid">

                        {/* NAME */}

                        <div className="modern-field">

                            <label>
                                Skill Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Java"
                                required
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="modern-field">

                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="e.g. Programming"
                                required
                            />

                        </div>


                        {/* LEVEL */}

                        <div className="modern-field">

                            <label>
                                Skill Level
                            </label>

                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select level
                                </option>

                                <option value="Beginner">
                                    Beginner
                                </option>

                                <option value="Intermediate">
                                    Intermediate
                                </option>

                                <option value="Advanced">
                                    Advanced
                                </option>

                                <option value="Expert">
                                    Expert
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* FORM FOOTER */}

                    <div className="skills-form-footer">

                        <div>

                            <strong>
                                Portfolio skill
                            </strong>

                            <span>
                                This information will appear
                                on your public portfolio.
                            </span>

                        </div>


                        <div className="skills-form-actions">

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
                                        ? "Update Skill"
                                        : "Add Skill"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* SKILLS SECTION */}

            <div className="skills-list-header">

                <div>

                    <h2>
                        Your Skills
                    </h2>

                    <p>
                        Technical expertise currently stored
                        in your CMS.
                    </p>

                </div>

                <span className="skills-total">
                    {skills.length} total
                </span>

            </div>


            {/* LOADING */}

            {loading ? (

                <div className="modern-loading">
                    Loading skills...
                </div>

            ) : skills.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        ✦
                    </div>

                    <h2>
                        No Skills Added
                    </h2>

                    <p>
                        Add your first technical skill above.
                    </p>

                </div>

            ) : (

                <div className="skills-modern-grid">

                    {skills.map((skill) => (

                        <div
                            className="modern-skill-card"
                            key={skill.id}
                        >

                            <div className="modern-skill-top">

                                <div className="skill-card-icon">
                                    ✦
                                </div>

                                <div className="skill-card-menu">
                                    •••
                                </div>

                            </div>


                            <div className="modern-skill-content">

                                <h3>
                                    {skill.name}
                                </h3>

                                <span className="skill-card-category">
                                    {skill.category}
                                </span>

                            </div>


                            <div className="modern-skill-bottom">

                                {skill.level ? (

                                    <span
                                        className={`skill-level-badge ${getLevelClass(
                                            skill.level
                                        )}`}
                                    >
                                        {skill.level}
                                    </span>

                                ) : (

                                    <span className="skill-level-badge">
                                        Level not set
                                    </span>

                                )}


                                <div className="skill-card-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(skill)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="skill-delete"
                                        onClick={() =>
                                            handleDelete(skill.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </AdminLayout>
    );
}

export default Skills;