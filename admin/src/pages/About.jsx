import { useEffect, useRef, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function About() {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [imageError, setImageError] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const response = await api.get("/about");

            if (response.data && response.data.length > 0) {
                setAbout(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching About:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAbout((previous) => ({
            ...previous,
            [name]: value
        }));

        if (name === "profileImage") {
            setImageError(false);
        }
    };

    // ==========================================
    // IMAGE UPLOAD
    // ==========================================

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setUploadError("");
        setImageError(false);

        // Allow only image files
        if (!file.type.startsWith("image/")) {
            setUploadError("Please select a valid image file.");
            return;
        }

        // Optional 5MB limit
        if (file.size > 5 * 1024 * 1024) {
            setUploadError("Image size must be less than 5MB.");
            return;
        }

        setUploadingImage(true);

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

            const uploadedUrl = response.data?.url;

            if (!uploadedUrl) {
                throw new Error("Upload URL was not returned.");
            }

            // Store the generated Supabase URL
            // inside the About object.
            setAbout((previous) => ({
                ...previous,
                profileImage: uploadedUrl
            }));

            setImageError(false);

            alert("Profile image uploaded successfully!");

        } catch (error) {
            console.error("Error uploading image:", error);

            setUploadError(
                error.response?.data?.message ||
                "Failed to upload profile image."
            );

        } finally {
            setUploadingImage(false);

            // Allow selecting the same file again
            e.target.value = "";
        }
    };

    // ==========================================
    // SAVE ABOUT
    // ==========================================

    const handleSave = async (e) => {
        e.preventDefault();

        if (!about?.id) {
            return;
        }

        setSaving(true);

        try {
            const response = await api.put(
                `/about/${about.id}`,
                about
            );

            setAbout(response.data);
            setImageError(false);

            alert("About information updated successfully!");

        } catch (error) {
            console.error("Error updating About:", error);
            alert("Failed to update About information.");

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="modern-loading">
                    Loading profile...
                </div>
            </AdminLayout>
        );
    }

    if (!about) {
        return (
            <AdminLayout>
                <div className="modern-empty">
                    <div className="modern-empty-icon">
                        ◎
                    </div>

                    <h2>
                        No profile information
                    </h2>

                    <p>
                        No About information was found.
                    </p>
                </div>
            </AdminLayout>
        );
    }

    const firstLetter =
        about.name?.charAt(0)?.toUpperCase() || "B";

    return (
        <AdminLayout>

            {/* PAGE HEADER */}

            <div className="content-page-header">

                <div>
                    <span className="content-eyebrow">
                        PROFILE
                    </span>

                    <h1>
                        About Me
                    </h1>

                    <p>
                        Manage the personal information displayed
                        on your portfolio.
                    </p>
                </div>

                <div className="content-header-badge">
                    <span>●</span>
                    Profile Active
                </div>

            </div>


            {/* ABOUT CONTENT */}

            <div className="about-layout">

                {/* PROFILE PREVIEW */}

                <aside className="profile-preview-card">

                    <div className="preview-cover">

                        <div className="cover-decoration cover-one"></div>
                        <div className="cover-decoration cover-two"></div>

                    </div>


                    <div className="preview-avatar-wrapper">

                        {about.profileImage && !imageError ? (

                            <img
                                src={about.profileImage}
                                alt={about.name || "Profile"}
                                className="preview-avatar-image"
                                onError={() => setImageError(true)}
                            />

                        ) : (

                            <div className="preview-avatar">
                                {firstLetter}
                            </div>

                        )}

                    </div>


                    <div className="profile-preview-content">

                        <h2>
                            {about.name || "Your Name"}
                        </h2>

                        <span className="preview-title">
                            {about.title || "Professional Title"}
                        </span>


                        <p>
                            {about.description ||
                                "Add a short introduction about yourself."}
                        </p>


                        <div className="preview-details">

                            <div className="preview-detail">

                                <span className="detail-icon">
                                    @
                                </span>

                                <span className="detail-text">
                                    {about.email ||
                                        "Email not added"}
                                </span>

                            </div>


                            <div className="preview-detail">

                                <span className="detail-icon">
                                    ●
                                </span>

                                <span className="detail-text">
                                    {about.location ||
                                        "Location not added"}
                                </span>

                            </div>

                        </div>

                    </div>

                </aside>


                {/* EDITOR */}

                <section className="about-editor">

                    <div className="editor-heading">

                        <div className="editor-heading-icon">
                            ◎
                        </div>

                        <div>

                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Update the details shown on your
                                public portfolio.
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSave}>

                        <div className="about-form-grid">

                            {/* NAME */}

                            <div className="modern-field">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={about.name || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            {/* TITLE */}

                            <div className="modern-field">

                                <label>
                                    Professional Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={about.title || ""}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Full Stack Developer"
                                    required
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="modern-field full-width">

                                <label>
                                    About Description
                                </label>

                                <textarea
                                    name="description"
                                    value={about.description || ""}
                                    onChange={handleChange}
                                    placeholder="Write a short introduction about yourself..."
                                    rows="6"
                                />

                                <span className="field-hint">
                                    Keep your introduction clear and professional.
                                </span>

                            </div>


                            {/* EMAIL */}

                            <div className="modern-field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={about.email || ""}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                />

                            </div>


                            {/* LOCATION */}

                            <div className="modern-field">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={about.location || ""}
                                    onChange={handleChange}
                                    placeholder="Tamil Nadu, India"
                                />

                            </div>


                            {/* PROFILE IMAGE UPLOAD */}

                            <div className="modern-field full-width">

                                <label>
                                    Profile Image
                                </label>

                                <div
                                    style={{
                                        border: "2px dashed #d8d1e5",
                                        borderRadius: "16px",
                                        padding: "22px",
                                        background: "#faf9fc"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "20px",
                                            flexWrap: "wrap"
                                        }}
                                    >

                                        {/* IMAGE PREVIEW */}

                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "18px",
                                                overflow: "hidden",
                                                background: "#eeeaf3",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            }}
                                        >

                                            {about.profileImage && !imageError ? (

                                                <img
                                                    src={about.profileImage}
                                                    alt="Profile preview"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                    onError={() =>
                                                        setImageError(true)
                                                    }
                                                />

                                            ) : (

                                                <span
                                                    style={{
                                                        fontSize: "32px",
                                                        fontWeight: "700",
                                                        color: "#8a4b91"
                                                    }}
                                                >
                                                    {firstLetter}
                                                </span>

                                            )}

                                        </div>


                                        {/* UPLOAD AREA */}

                                        <div style={{ flex: 1 }}>

                                            <h3
                                                style={{
                                                    margin: "0 0 6px",
                                                    fontSize: "16px",
                                                    fontWeight: "700",
                                                    color: "#241b35"
                                                }}
                                            >
                                                Upload Profile Photo
                                            </h3>

                                            <p
                                                style={{
                                                    margin: "0 0 14px",
                                                    color: "#777080",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                JPG, JPEG, PNG or WEBP.
                                                Maximum size 5MB.
                                            </p>


                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                                onChange={handleImageUpload}
                                                style={{ display: "none" }}
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                disabled={uploadingImage}
                                                style={{
                                                    border: "none",
                                                    borderRadius: "10px",
                                                    padding: "11px 18px",
                                                    background: uploadingImage
                                                        ? "#c9bfd0"
                                                        : "#8a4b91",
                                                    color: "#ffffff",
                                                    fontWeight: "600",
                                                    cursor: uploadingImage
                                                        ? "not-allowed"
                                                        : "pointer"
                                                }}
                                            >
                                                {uploadingImage
                                                    ? "Uploading..."
                                                    : "Choose Image"}
                                            </button>

                                        </div>

                                    </div>


                                    {/* UPLOAD SUCCESS */}

                                    {about.profileImage && !uploadError && (
                                        <div
                                            style={{
                                                marginTop: "16px",
                                                padding: "10px 12px",
                                                borderRadius: "10px",
                                                background: "#f0fdf4",
                                                color: "#166534",
                                                fontSize: "13px"
                                            }}
                                        >
                                            ✓ Profile image uploaded
                                            successfully.
                                        </div>
                                    )}


                                    {/* UPLOAD ERROR */}

                                    {uploadError && (
                                        <div
                                            className="image-error-message"
                                            style={{
                                                marginTop: "16px"
                                            }}
                                        >
                                            ⚠ {uploadError}
                                        </div>
                                    )}

                                </div>

                                <span className="field-hint">
                                    The image will be uploaded to Supabase Storage automatically.
                                </span>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="about-form-footer">

                            <div className="save-description">

                                <strong>
                                    Portfolio profile
                                </strong>

                                <span>
                                    Your changes will be reflected
                                    on the public portfolio.
                                </span>

                            </div>

                            <button
                                type="submit"
                                className="modern-save-button"
                                disabled={saving || uploadingImage}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </section>

            </div>

        </AdminLayout>
    );
}

export default About;