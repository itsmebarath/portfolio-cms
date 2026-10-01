import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../services/api";

function Messages() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {

        try {

            const response = await api.get("/contact");

            setMessages(response.data);

        } catch (error) {

            console.error(
                "Error fetching messages:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const markAsRead = async (id) => {

        try {

            await api.put(`/contact/${id}/read`);

            await fetchMessages();

        } catch (error) {

            console.error(
                "Error marking message:",
                error
            );

        }
    };

    const deleteMessage = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) return;

        try {

            await api.delete(`/contact/${id}`);

            await fetchMessages();

        } catch (error) {

            console.error(
                "Error deleting message:",
                error
            );

        }
    };

    return (

        <AdminLayout>

            <div className="content-page-header">

                <div>

                    <span className="content-eyebrow">
                        INBOX
                    </span>

                    <h1>
                        Messages
                    </h1>

                    <p>
                        Messages received from your portfolio contact form.
                    </p>

                </div>

                <div className="content-header-badge">
                    {messages.length} Messages
                </div>

            </div>


            {loading ? (

                <div className="modern-loading">
                    Loading messages...
                </div>

            ) : messages.length === 0 ? (

                <div className="modern-empty">

                    <div className="modern-empty-icon">
                        ✉️
                    </div>

                    <h2>
                        No Messages
                    </h2>

                    <p>
                        Messages submitted through your portfolio
                        will appear here.
                    </p>

                </div>

            ) : (

                <div className="messages-list">

                    {messages.map((message) => (

                        <article
                            key={message.id}
                            className={`message-card ${
                                message.read
                                    ? "message-read"
                                    : "message-unread"
                            }`}
                        >

                            <div className="message-card-top">

                                <div>

                                    <div className="message-sender">

                                        <div className="message-avatar">
                                            {message.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                        <div>

                                            <h3>
                                                {message.name}
                                            </h3>

                                            <p>
                                                {message.email}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {!message.read && (

                                    <span className="unread-badge">
                                        New
                                    </span>

                                )}

                            </div>


                            <div className="message-body">

                                {message.subject && (

                                    <h4>
                                        {message.subject}
                                    </h4>

                                )}

                                <p>
                                    {message.message}
                                </p>

                            </div>


                            <div className="message-footer">

                                <span>
                                    {message.createdAt
                                        ? new Date(
                                            message.createdAt
                                        ).toLocaleString()
                                        : ""}
                                </span>


                                <div className="message-actions">

                                    {!message.read && (

                                        <button
                                            onClick={() =>
                                                markAsRead(
                                                    message.id
                                                )
                                            }
                                        >
                                            Mark as Read
                                        </button>

                                    )}

                                    <button
                                        className="message-delete"
                                        onClick={() =>
                                            deleteMessage(
                                                message.id
                                            )
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

export default Messages;