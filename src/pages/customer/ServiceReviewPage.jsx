import { useState } from "react";
import axios from "axios";
import "../../styles/service-review.css";

const API_BASE = "http://localhost:5285";

function ServiceReviewPage() {
    const customerId = localStorage.getItem("customerId");

    const [form, setForm] = useState({
        appointmentId: "",
        rating: "5",
        comment: ""
    });

    const [reviews, setReviews] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loadingReviews, setLoadingReviews] = useState(false);

    const set = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        if (!customerId) {
            setError("Customer session not found. Please login again.");
            return;
        }

        try {
            const res = await axios.post(`${API_BASE}/api/service-reviews`, {
                customerId: Number(customerId),
                appointmentId: form.appointmentId ? Number(form.appointmentId) : null,
                rating: Number(form.rating),
                comment: form.comment,
            });

            setResult(res.data);
            setForm({
                appointmentId: "",
                rating: "5",
                comment: ""
            });

            loadReviews();
        } catch (err) {
            setError(err.response?.data || "Failed to submit review.");
        }
    };

    const loadReviews = async () => {
        if (!customerId) {
            setError("Customer session not found. Please login again.");
            return;
        }

        setLoadingReviews(true);

        try {
            const res = await axios.get(
                `${API_BASE}/api/service-reviews/customer/${customerId}`
            );
            setReviews(res.data);
        } catch {
            setError("Failed to load your reviews.");
        }

        setLoadingReviews(false);
    };

    const stars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    return (
        <section>
            <div className="page-header">
               
                <h1>Review Service</h1>
                <p className="subtitle">
                    Rate and review a service you received at Veaco.
                </p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Submit Review</h3>

                <label>Appointment ID (optional)</label>
                <input
                    name="appointmentId"
                    value={form.appointmentId}
                    onChange={set}
                    placeholder="Leave blank for general review"
                />

                <label>Rating</label>
                <select
                    name="rating"
                    value={form.rating}
                    onChange={set}
                    className="select-input"
                >
                    <option value="5">Excellent</option>
                    <option value="4">Good</option>
                    <option value="3">Average</option>
                    <option value="2">Poor</option>
                    <option value="1">Very Poor</option>
                </select>

                <label>Comment</label>
                <textarea
                    name="comment"
                    value={form.comment}
                    onChange={set}
                    placeholder="Share your experience..."
                    rows={3}
                />

                <button type="submit" className="btn-primary">
                    Submit Review
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="success-msg">
                    ✓ Review submitted. Thank you for your feedback.
                </div>
            )}

            <div className="card">
                <div className="card-title-row">
                    <h3 className="card-title">My Reviews</h3>
                    <button
                        type="button"
                        onClick={loadReviews}
                        className="btn-ghost btn-sm"
                    >
                        {loadingReviews ? "Loading..." : "Load My Reviews"}
                    </button>
                </div>

                {reviews.length === 0 && (
                    <p className="muted">No reviews submitted yet.</p>
                )}

                {reviews.map((r) => (
                    <div key={r.id} className="review-box">
                        <div className="review-stars">{stars(r.rating)}</div>

                        <p className="review-comment">
                            {r.comment || <em>No comment</em>}
                        </p>

                        <p className="review-meta">
                            {new Date(r.reviewDate).toLocaleDateString()}
                        </p>

                        {r.serviceDescription && (
                            <p className="review-service">
                                Service: {r.serviceDescription}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ServiceReviewPage;