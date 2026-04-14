import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { level: 0, label: "No password", color: "#ccc" };
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.length >= 12) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;

        const levels = [
            { level: 1, label: "Weak", color: "#d32f2f" },
            { level: 2, label: "Fair", color: "#f57c00" },
            { level: 3, label: "Good", color: "#f9a825" },
            { level: 4, label: "Strong", color: "#388e3c" },
            { level: 5, label: "Very Strong", color: "#1976d2" }
        ];
        return levels[Math.min(strength, 4)];
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if(password.length<8){
            setError("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!agreedToTerms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
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
                setError(data.error || "Signup failed");
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
            padding: "20px",
            paddingTop: "40px",
            paddingBottom: "40px"
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
                maxWidth: "480px",
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
                        🎯
                    </div>
                    <h1 style={{
                        margin: "0 0 8px 0",
                        fontSize: "28px",
                        fontWeight: "700"
                    }}>
                        Create Account
                    </h1>
                    <p style={{
                        margin: "0",
                        fontSize: "14px",
                        opacity: "0.9"
                    }}>
                        Start tracking your job applications today
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
                        <div style={{ marginBottom: "16px" }}>
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
                        <div style={{ marginBottom: "16px" }}>
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
                            <div style={{ position: "relative", marginBottom: "8px" }}>
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
                            {/* Password Strength Indicator */}
                            {password && (
                                <div style={{
                                    display: "flex",
                                    gap: "4px",
                                    alignItems: "center"
                                }}>
                                    <div style={{
                                        flex: 1,
                                        height: "4px",
                                        backgroundColor: "#e0e0e0",
                                        borderRadius: "2px",
                                        overflow: "hidden"
                                    }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${(passwordStrength.level / 5) * 100}%`,
                                            backgroundColor: passwordStrength.color,
                                            transition: "all 0.3s ease"
                                        }}></div>
                                    </div>
                                    <span style={{
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        color: passwordStrength.color,
                                        minWidth: "70px"
                                    }}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
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
                                ✓ Confirm Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        backgroundColor: "#f8f9fa",
                                        borderColor: confirmPassword && password !== confirmPassword ? "#d32f2f" : "#e0e0e0"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.backgroundColor = "white";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.backgroundColor = "#f8f9fa";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p style={{
                                    margin: "8px 0 0 0",
                                    fontSize: "12px",
                                    color: "#d32f2f",
                                    fontWeight: "500"
                                }}>
                                    ⚠️ Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div style={{
                            marginBottom: "24px"
                        }}>
                            <label style={{
                                display: "flex",
                                alignItems: "flex-start",
                                cursor: "pointer",
                                gap: "10px"
                            }}>
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    style={{
                                        cursor: "pointer",
                                        width: "18px",
                                        height: "18px",
                                        marginTop: "2px",
                                        flexShrink: 0
                                    }}
                                />
                                <span style={{
                                    color: "#666",
                                    fontSize: "13px",
                                    lineHeight: "1.4"
                                }}>
                                    I agree to the{" "}
                                    <a href="#" style={{
                                        color: "#667eea",
                                        textDecoration: "none",
                                        fontWeight: "600"
                                    }}>
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" style={{
                                        color: "#667eea",
                                        textDecoration: "none",
                                        fontWeight: "600"
                                    }}>
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
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
                            {loading ? "Creating Account..." : "Create Account"}
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

                    {/* Social Signup */}
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

                    {/* Login Link */}
                    <div style={{
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#666"
                    }}>
                        Already have an account?{" "}
                        <a href="/login" style={{
                            color: "#667eea",
                            textDecoration: "none",
                            fontWeight: "700",
                            transition: "color 0.3s"
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#764ba2"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
                        >
                            Sign in here
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
