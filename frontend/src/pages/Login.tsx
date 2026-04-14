import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.dispatchEvent(new Event("auth-change"));
                navigate("/dashboard");
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "20px"
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                top: "-100px",
                left: "-100px",
                animation: "float 6s ease-in-out infinite"
            }}></div>
            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                bottom: "-50px",
                right: "-50px",
                animation: "float 8s ease-in-out infinite"
            }}></div>

            {/* Main Card */}
            <div style={{
                position: "relative",
                zIndex: "1",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                width: "100%",
                maxWidth: "420px",
                overflow: "hidden"
            }}>
                {/* Header */}
                <div style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "40px 30px",
                    color: "white",
                    textAlign: "center"
                }}>
                    <div style={{
                        fontSize: "48px",
                        marginBottom: "15px"
                    }}>
                        🚀
                    </div>
                    <h1 style={{
                        margin: "0 0 8px 0",
                        fontSize: "28px",
                        fontWeight: "700"
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        margin: "0",
                        fontSize: "14px",
                        opacity: "0.9"
                    }}>
                        Sign in to your job tracker account
                    </p>
                </div>

                {/* Form Content */}
                <div style={{
                    padding: "40px 30px"
                }}>
                    {error && (
                        <div style={{
                            backgroundColor: "#ffebee",
                            color: "#d32f2f",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            fontSize: "14px",
                            fontWeight: "500",
                            border: "1px solid #ff6b6b"
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#333",
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px"
                            }}>
                                📧 Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "2px solid #e0e0e0",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box",
                                    backgroundColor: "#f8f9fa"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#667eea";
                                    e.target.style.backgroundColor = "white";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e0e0e0";
                                    e.target.style.backgroundColor = "#f8f9fa";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        {/* Password Input */}
                        <div style={{ marginBottom: "24px" }}>
                            <label style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#333",
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px"
                            }}>
                                🔐 Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        paddingRight: "45px",
                                        border: "2px solid #e0e0e0",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#667eea";
                                        e.target.style.backgroundColor = "white";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e0e0e0";
                                        e.target.style.backgroundColor = "#f8f9fa";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        padding: "5px"
                                    }}
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "24px",
                            fontSize: "13px"
                        }}>
                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    style={{
                                        marginRight: "8px",
                                        cursor: "pointer",
                                        width: "16px",
                                        height: "16px"
                                    }}
                                />
                                <span style={{ color: "#555", fontWeight: "500" }}>Remember me</span>
                            </label>
                            <a href="#" style={{
                                color: "#667eea",
                                textDecoration: "none",
                                fontWeight: "600",
                                transition: "color 0.3s"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#764ba2"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "14px",
                                backgroundColor: loading ? "#999" : "#667eea",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "700",
                                cursor: loading ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                                marginBottom: "20px"
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    (e.target as HTMLButtonElement).style.backgroundColor = "#764ba2";
                                    (e.target as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(118, 75, 162, 0.4)";
                                    (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLButtonElement).style.backgroundColor = loading ? "#999" : "#667eea";
                                (e.target as HTMLButtonElement).style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                                (e.target as HTMLButtonElement).style.transform = "translateY(0)";
                            }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                        gap: "10px"
                    }}>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
                        <span style={{ color: "#999", fontSize: "13px", fontWeight: "500" }}>OR</span>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
                    </div>

                    {/* Social Login */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "24px"
                    }}>
                        <button style={{
                            padding: "12px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            fontSize: "20px",
                            transition: "all 0.3s ease"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#667eea";
                                e.currentTarget.style.backgroundColor = "#f8f9fa";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e0e0e0";
                                e.currentTarget.style.backgroundColor = "white";
                            }}
                        >
                            🐙
                        </button>
                        <button style={{
                            padding: "12px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            fontSize: "20px",
                            transition: "all 0.3s ease"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#667eea";
                                e.currentTarget.style.backgroundColor = "#f8f9fa";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e0e0e0";
                                e.currentTarget.style.backgroundColor = "white";
                            }}
                        >
                            📧
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div style={{
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#666"
                    }}>
                        Don't have an account?{" "}
                        <a href="/signup" style={{
                            color: "#667eea",
                            textDecoration: "none",
                            fontWeight: "700",
                            transition: "color 0.3s"
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#764ba2"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
                        >
                            Sign up here
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    );
}
