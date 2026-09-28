import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );

        setFormData({
          title: res.data.title || "",
          content: res.data.content || "",
          category: res.data.category || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load blog."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/blog/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update blog."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-box page-loader">
        <div className="loader"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <main className="blog-editor-page">
      <div className="editor-header">
        <span className="section-label">EDIT YOUR STORY</span>
        <h1>Make it even better.</h1>
        <p>Update your story and keep your ideas fresh.</p>
      </div>

      <div className="editor-card">
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Blog Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Technology, Travel, Lifestyle..."
              required
            />
          </div>

          <div className="form-group">
            <label>Your Story</label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your story..."
              required
            />
          </div>

          <div className="editor-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/blog/${id}`)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="auth-submit publish-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Story →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditBlog;