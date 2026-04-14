import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../api/jobs";
import type { Job } from "../types/Job";

export default function Dashboard() {
    const [jobs, setJobs]= useState<Job[]>([]);
    const [status, setStatus]=useState<string>("");
    const navigate = useNavigate();
     
    useEffect(()=>{
        fetchJobs(status || undefined).then(setJobs);
    },[status]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            applied: { bg: "#e3f2fd", text: "#1976d2", border: "#1976d2" },
            interview: { bg: "#fff3e0", text: "#f57c00", border: "#f57c00" },
            offer: { bg: "#e8f5e9", text: "#388e3c", border: "#388e3c" },
            rejected: { bg: "#ffebee", text: "#d32f2f", border: "#d32f2f" },
        };
        return colors[status] || colors.applied;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const stats = {
        total: jobs.length,
        applied: jobs.filter(j => j.status === "applied").length,
        interview: jobs.filter(j => j.status === "interview").length,
        offer: jobs.filter(j => j.status === "offer").length,
    };

    return(
        <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", paddingBottom: "40px" }}>
            {/* Header Section */}
            <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "40px 20px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", flex: 1 }}>
                    <h1 style={{ margin: "0 0 10px 0", fontSize: "32px", fontWeight: "700" }}>
                        📋 Job Applications Tracker
                    </h1>
                    <p style={{ margin: "0", fontSize: "16px", opacity: "0.9" }}>
                        Track and manage all your job applications in one place
                    </p>
                </div>
                <button
                    onClick={handleLogout}                    style={{
                        padding: "10px 20px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        border: "2px solid rgba(255, 255, 255, 0.4)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap",
                        marginLeft: "20px"
                    }}
                    onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                        (e.target as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                        (e.target as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.4)";
                    }}
                >
                    🚪 Logout
                </button>
            </div>

            {/* Stats Section */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                maxWidth: "1200px",
                margin: "-30px auto 40px",
                padding: "0 20px",
                position: "relative",
                zIndex: "1"
            }}>
                <StatCard label="Total Applications" value={stats.total} icon="📊" color="#667eea" />
                <StatCard label="Applied" value={stats.applied} icon="📤" color="#3b82f6" />
                <StatCard label="Interviews" value={stats.interview} icon="🎤" color="#f59e0b" />
                <StatCard label="Offers" value={stats.offer} icon="🎉" color="#10b981" />
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
                {/* Filter Section */}
                <div style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "30px",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <label style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333"
                    }}>Filter by Status:</label>
                    <select 
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        style={{
                            padding: "10px 15px",
                            borderRadius: "8px",
                            border: "2px solid #e0e0e0",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            backgroundColor: "white",
                            color: "#333"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#667eea"}
                        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                    >
                        <option value="">All Applications</option>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Jobs Grid */}
                {jobs.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                        <div style={{ fontSize: "48px", marginBottom: "10px" }}>🔍</div>
                        <h3 style={{ color: "#666", marginBottom: "10px" }}>No applications found</h3>
                        <p style={{ color: "#999" }}>Start tracking your job applications to see them here</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "20px"
                    }}>
                        {jobs.map(job => {
                            const colors = getStatusColor(job.status);
                            return (
                                <div
                                    key={job.id}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "12px",
                                        padding: "24px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        transition: "all 0.3s ease",
                                        border: "1px solid #e0e0e0",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* Company & Role */}
                                    <div style={{ marginBottom: "16px" }}>
                                        <h3 style={{
                                            margin: "0 0 8px 0",
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            color: "#1a1a1a"
                                        }}>
                                            {job.company}
                                        </h3>
                                        <p style={{
                                            margin: "0",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#667eea"
                                        }}>
                                            {job.role}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    <div style={{ marginBottom: "16px" }}>
                                        <span style={{
                                            display: "inline-block",
                                            padding: "6px 12px",
                                            backgroundColor: colors.bg,
                                            color: colors.text,
                                            borderRadius: "20px",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            border: `2px solid ${colors.border}`,
                                            textTransform: "capitalize"
                                        }}>
                                            {job.status}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div style={{
                                        marginBottom: "16px",
                                        paddingBottom: "16px",
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                        <p style={{
                                            margin: "0",
                                            fontSize: "12px",
                                            color: "#999",
                                            fontWeight: "500"
                                        }}>
                                            📅 {formatDate(job.created_at)}
                                        </p>
                                    </div>

                                    {/* Notes */}
                                    {job.notes && (
                                        <div style={{ marginBottom: "16px" }}>
                                            <p style={{
                                                margin: "0 0 8px 0",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#666",
                                                textTransform: "uppercase"
                                            }}>
                                                Notes
                                            </p>
                                            <p style={{
                                                margin: "0",
                                                fontSize: "14px",
                                                color: "#555",
                                                lineHeight: "1.5",
                                                maxHeight: "80px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>
                                                {job.notes}
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            backgroundColor: "#667eea",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            marginTop: "12px"
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLButtonElement).style.backgroundColor = "#764ba2";
                                            (e.target as HTMLButtonElement).style.transform = "scale(1.02)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.target as HTMLButtonElement).style.backgroundColor = "#667eea";
                                            (e.target as HTMLButtonElement).style.transform = "scale(1)";
                                        }}
                                    >
                                        ✏️ Update
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
    return (
        <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: `2px solid ${color}20`,
            transition: "all 0.3s ease"
        }}>
            <div style={{
                fontSize: "28px",
                marginBottom: "12px"
            }}>
                {icon}
            </div>
            <p style={{
                margin: "0 0 8px 0",
                fontSize: "12px",
                color: "#999",
                fontWeight: "600",
                textTransform: "uppercase"
            }}>
                {label}
            </p>
            <h3 style={{
                margin: "0",
                fontSize: "24px",
                fontWeight: "700",
                color: color
            }}>
                {value}
            </h3>
        </div>
    );
}