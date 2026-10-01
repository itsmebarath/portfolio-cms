import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Services() {
    const [services, setServices] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        icon: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
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
                    `/services/${editingId}`,
                    form
                );

                alert("Service updated successfully!");
            } else {
                await api.post(
                    "/services",
                    form
                );

                alert("Service added successfully!");
            }

            resetForm();
            await fetchServices();

        } catch (error) {
            console.error("Error saving service:", error);
            alert("Failed to save service.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (service) => {
        setEditingId(service.id);

        setForm({
            title: service.title || "",
            description: service.description || "",
            icon: service.icon || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/services/${id}`);

            alert("Service deleted successfully!");

            await fetchServices();

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete service.");
        }
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            icon: ""
        });

        setEditingId(null);
    };

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        OFFERINGS
                    </span>

                    <h1>
                        Services
                    </h1>

                    <p>
                        Manage the services you offer through your portfolio.
                    </p>

                </div>

                <div className="content-header-badge">
                    {services.length} Services
                </div>

            </div>


            {/* EDITOR */}

            <section className="services-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon service-heading-icon">
                        ◆
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Service"
                                : "Add New Service"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your service information."
                                : "Add a service to your portfolio."}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="services-form-grid">

                        <div className="modern-field">

                            <label>
                                Service Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Web Development"
                                required
                            />

                        </div>


                        <div className="modern-field">

                            <label>
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={form.icon}
                                onChange={handleChange}
                                placeholder="e.g. 💻"
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
                                placeholder="Describe the service you provide..."
                                rows="6"
                                required
                            />

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="services-form-footer">

                        <div>

                            <strong>
                                Portfolio service
                            </strong>

                            <span>
                                This service will appear on your public portfolio.
                            </span>

                        </div>


                        <div className="services-form-actions">

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
                                        ? "Update Service"
                                        : "Add Service"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* LIST */}

            <div className="services-list-header">

                <div>

                    <h2>
                        Your Services
                    </h2>

                    <p>
                        Services currently stored in your CMS.
                    </p>

                </div>

                <span className="services-total">
                    {services.length} total
                </span>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading services...
                </div>

            ) : services.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        ◆
                    </div>

                    <h2>
                        No Services Added
                    </h2>

                    <p>
                        Add your first service above.
                    </p>

                </div>

            ) : (

                <div className="services-modern-grid">

                    {services.map((service) => (

                        <article
                            className="modern-service-card"
                            key={service.id}
                        >

                            <div className="service-card-top">

                                <div className="service-icon-box">

                                    {service.icon || "◆"}

                                </div>

                                <span className="service-number">
                                    #{String(service.id).padStart(2, "0")}
                                </span>

                            </div>


                            <div className="service-card-content">

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                            </div>


                            <div className="service-card-actions">

                                <button
                                    onClick={() =>
                                        handleEdit(service)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="service-delete"
                                    onClick={() =>
                                        handleDelete(service.id)
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

export default Services;