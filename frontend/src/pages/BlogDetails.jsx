import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );

        setBlog(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Blog not found."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete blog."
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-box page-loader">
        <div className="loader"></div>
        <p>Loading story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="empty-state blog-not-found">
        <div className="empty-icon">📖</div>
        <h3>Blog not found</h3>
        <p>{error || "This story doesn't exist anymore."}</p>
        <Link to="/" className="hero-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  const authorId =
    typeof blog.author === "object"
      ? blog.author?._id
      : blog.author;

  const currentUserId = user?._id || user?.id;

  const isAuthor =
    token &&
    currentUserId &&
    authorId &&
    String(currentUserId) === String(authorId);

  return (
    <main className="details-page">
      <article className="details-card">
        <div className="details-top">
          <span className="details-category">
            {blog.category || "General"}
          </span>

          <span className="details-symbol">✦</span>
        </div>

        <h1>{blog.title}</h1>

        <div className="author-info">
          <div className="author-avatar">
            {(blog.author?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>
              {blog.author?.name ||
                blog.author?.username ||
                "Anonymous"}
            </strong>

            <span>BlogHub Writer</span>
          </div>
        </div>

        <div className="details-divider"></div>

        <div className="details-content">
          {blog.content}
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="details-actions">
          <Link to="/" className="cancel-btn">
            ← Back
          </Link>

          {isAuthor && (
            <>
              <Link
                to={`/edit/${blog._id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </article>
    </main>
  );
}

export default BlogDetails;