import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Blogs() {
    const [blogs, setBlogs] = useState([]);

    const [form, setForm] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
        publishedDate: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get("/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
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
                    `/blogs/${editingId}`,
                    form
                );

                alert("Blog updated successfully!");
            } else {
                await api.post(
                    "/blogs",
                    form
                );

                alert("Blog created successfully!");
            }

            resetForm();
            await fetchBlogs();

        } catch (error) {
            console.error("Blog save error:", error);
            alert("Failed to save blog.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (blog) => {
        setEditingId(blog.id);

        setForm({
            title: blog.title || "",
            content: blog.content || "",
            image: blog.image || "",
            category: blog.category || "",
            publishedDate: blog.publishedDate || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/blogs/${id}`);

            alert("Blog deleted successfully!");

            await fetchBlogs();

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete blog.");
        }
    };

    const resetForm = () => {
        setForm({
            title: "",
            content: "",
            image: "",
            category: "",
            publishedDate: ""
        });

        setEditingId(null);
    };

    return (
        <AdminLayout>

            {/* PAGE HEADER */}

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        CONTENT
                    </span>

                    <h1>
                        Blogs
                    </h1>

                    <p>
                        Create and manage articles for your portfolio.
                    </p>

                </div>

                <div className="content-header-badge">
                    {blogs.length} Posts
                </div>

            </div>


            {/* BLOG EDITOR */}

            <section className="blogs-editor">

                <div className="editor-heading">

                    <div className="editor-heading-icon blog-heading-icon">
                        ✎
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Blog Post"
                                : "Create New Blog Post"}
                        </h2>

                        <p>
                            Write useful content and share your
                            knowledge with visitors.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="blogs-form-layout">

                        {/* MAIN EDITOR */}

                        <div className="blog-main-editor">

                            <div className="modern-field">

                                <label>
                                    Blog Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter your blog title..."
                                    required
                                />

                            </div>


                            <div className="modern-field">

                                <label>
                                    Article Content
                                </label>

                                <textarea
                                    className="blog-content-input"
                                    name="content"
                                    value={form.content}
                                    onChange={handleChange}
                                    placeholder="Start writing your article..."
                                    rows="15"
                                    required
                                />

                                <span className="field-hint">
                                    Write clear and useful content for your readers.
                                </span>

                            </div>

                        </div>


                        {/* SIDEBAR */}

                        <aside className="blog-editor-sidebar">

                            {/* POST DETAILS */}

                            <div className="blog-settings-card">

                                <h3>
                                    Post Details
                                </h3>

                                <div className="modern-field">

                                    <label>
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="Java, AI, Career..."
                                    />

                                </div>


                                <div className="modern-field">

                                    <label>
                                        Published Date
                                    </label>

                                    <input
                                        type="date"
                                        name="publishedDate"
                                        value={form.publishedDate}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* FEATURED IMAGE */}

                            <div className="blog-settings-card">

                                <h3>
                                    Featured Image
                                </h3>

                                <label className="blog-image-upload">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />

                                    {uploading ? (

                                        <div className="blog-upload-message">
                                            <span>↑</span>
                                            <strong>
                                                Uploading...
                                            </strong>
                                        </div>

                                    ) : form.image ? (

                                        <div className="blog-image-preview">

                                            <img
                                                src={form.image}
                                                alt="Blog preview"
                                            />

                                            <div>
                                                Change Image
                                            </div>

                                        </div>

                                    ) : (

                                        <div className="blog-upload-message">

                                            <span>
                                                ↑
                                            </span>

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

                        </aside>

                    </div>


                    {/* FOOTER */}

                    <div className="blogs-form-footer">

                        <div>

                            <strong>
                                {editingId
                                    ? "Editing blog post"
                                    : "New blog post"}
                            </strong>

                            <span>
                                Your content will be stored in the CMS.
                            </span>

                        </div>


                        <div className="blogs-form-actions">

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
                                        ? "Update Post"
                                        : "Publish Post"}
                            </button>

                        </div>

                    </div>

                </form>

            </section>


            {/* BLOG LIST */}

            <div className="blogs-list-header">

                <div>

                    <h2>
                        Published Posts
                    </h2>

                    <p>
                        Manage your existing blog content.
                    </p>

                </div>

                <span className="blogs-total">
                    {blogs.length} total
                </span>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading blogs...
                </div>

            ) : blogs.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        ✎
                    </div>

                    <h2>
                        No Blog Posts
                    </h2>

                    <p>
                        Create your first blog post above.
                    </p>

                </div>

            ) : (

                <div className="blogs-modern-grid">

                    {blogs.map((blog) => (

                        <article
                            className="modern-blog-card"
                            key={blog.id}
                        >

                            {/* IMAGE */}

                            {blog.image ? (

                                <div className="blog-card-image">

                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                    />

                                </div>

                            ) : (

                                <div className="blog-card-placeholder">
                                    ✎
                                </div>

                            )}


                            {/* CONTENT */}

                            <div className="modern-blog-content">

                                <div className="blog-card-meta">

                                    <span>
                                        {blog.category || "General"}
                                    </span>

                                    <small>
                                        {blog.publishedDate || "Draft"}
                                    </small>

                                </div>


                                <h3>
                                    {blog.title}
                                </h3>


                                <p>
                                    {blog.content}
                                </p>


                                <div className="modern-blog-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(blog)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="blog-delete"
                                        onClick={() =>
                                            handleDelete(blog.id)
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

export default Blogs;