import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            console.log("Sending login request...");

            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("LOGIN STATUS:", response.status);
            console.log("LOGIN RESPONSE:", response.data);

            const data = response.data;

            if (!data.token) {
                setError("Login response did not contain a token.");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);

            console.log("TOKEN SAVED:", !!localStorage.getItem("token"));

            navigate("/dashboard");

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA:", error.response?.data);
            console.log("ERROR MESSAGE:", error.message);

            if (error.response) {
                setError(
                    `Login failed: ${error.response.status} ${
                        error.response.data?.message || ""
                    }`
                );
            } else {
                setError(`Connection error: ${error.message}`);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h1>Admin Login</h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                {error && (
                    <p style={{
                        color: "red",
                        marginTop: "15px",
                        wordBreak: "break-word"
                    }}>
                        {error}
                    </p>
                )}

            </div>
        </div>
    );
}

export default Login;