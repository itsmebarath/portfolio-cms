import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    const [form, setForm] = useState({
        name: "",
        role: "",
        message: "",
        image: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await api.get("/testimonials");
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
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
                    `/testimonials/${editingId}`,
                    form
                );

                alert("Testimonial updated successfully!");
            } else {
                await api.post(
                    "/testimonials",
                    form
                );

                alert("Testimonial added successfully!");
            }

            resetForm();
            await fetchTestimonials();

        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (testimonial) => {
        setEditingId(testimonial.id);

        setForm({
            name: testimonial.name || "",
            role: testimonial.role || "",
            message: testimonial.message || "",
            image: testimonial.image || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this testimonial?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/testimonials/${id}`);

            alert("Testimonial deleted successfully!");

            await fetchTestimonials();

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete testimonial.");
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            role: "",
            message: "",
            image: ""
        });

        setEditingId(null);
    };

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        SOCIAL PROOF
                    </span>

                    <h1>
                        Testimonials
                    </h1>

                    <p>
                        Manage the testimonials displayed on your portfolio.
                    </p>

                </div>

                <div className="content-header-badge">
                    {testimonials.length} Testimonials
                </div>

            </div>


            {/* EDITOR */}

            <section className="testimonials-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon testimonial-heading-icon">
                        “
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Testimonial"
                                : "Add New Testimonial"}
                        </h2>

                        <p>
                            Add feedback and recommendations from clients,
                            mentors or colleagues.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="testimonial-form-grid">

                        <div className="modern-field">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. John Smith"
                                required
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                Role / Position
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                placeholder="e.g. Project Manager"
                            />

                        </div>


                        <div className="modern-field testimonial-message-field">

                            <label>
                                Testimonial Message
                            </label>

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write the testimonial..."
                                rows="6"
                                required
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                Profile Image
                            </label>

                            <label className="testimonial-upload">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                                {uploading ? (

                                    <div className="testimonial-upload-content">
                                        Uploading...
                                    </div>

                                ) : form.image ? (

                                    <div className="testimonial-image-preview">

                                        <img
                                            src={form.image}
                                            alt="Profile preview"
                                        />

                                        <span>
                                            Change Image
                                        </span>

                                    </div>

                                ) : (

                                    <div className="testimonial-upload-content">

                                        <div>
                                            ↑
                                        </div>

                                        <strong>
                                            Upload Image
                                        </strong>

                                        <small>
                                            JPG, PNG or WEBP
                                        </small>

                                    </div>

                                )}

                            </label>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="testimonial-form-footer">

                        <div>

                            <strong>
                                Portfolio testimonial
                            </strong>

                            <span>
                                This feedback will appear in your portfolio.
                            </span>

                        </div>


                        <div className="testimonial-form-actions">

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
                                        ? "Update Testimonial"
                                        : "Add Testimonial"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* LIST */}

            <div className="testimonial-list-header">

                <div>

                    <h2>
                        Your Testimonials
                    </h2>

                    <p>
                        Testimonials currently stored in your CMS.
                    </p>

                </div>

                <span className="testimonial-total">
                    {testimonials.length} total
                </span>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading testimonials...
                </div>

            ) : testimonials.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        “
                    </div>

                    <h2>
                        No Testimonials Added
                    </h2>

                    <p>
                        Add your first testimonial above.
                    </p>

                </div>

            ) : (

                <div className="testimonials-modern-grid">

                    {testimonials.map((testimonial) => (

                        <article
                            className="modern-testimonial-card"
                            key={testimonial.id}
                        >

                            <div className="testimonial-quote">
                                “
                            </div>

                            <p className="testimonial-message">
                                {testimonial.message}
                            </p>


                            <div className="testimonial-person">

                                {testimonial.image ? (

                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                    />

                                ) : (

                                    <div className="testimonial-avatar">
                                        {testimonial.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                )}

                                <div>

                                    <strong>
                                        {testimonial.name}
                                    </strong>

                                    <span>
                                        {testimonial.role ||
                                            "Client"}
                                    </span>

                                </div>

                            </div>


                            <div className="testimonial-actions">

                                <button
                                    onClick={() =>
                                        handleEdit(testimonial)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="testimonial-delete"
                                    onClick={() =>
                                        handleDelete(testimonial.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </AdminLayout>
    );
}

export default Testimonials;