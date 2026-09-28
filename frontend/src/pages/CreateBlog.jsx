import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/blogs",
        formData,
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
          "Unable to create blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="blog-editor-page">
      <div className="editor-header">
        <div>
          <span className="section-label">CREATE NEW STORY</span>
          <h1>Share your ideas.</h1>
          <p>
            Turn your thoughts into something worth reading.
          </p>
        </div>
      </div>

      <div className="editor-card">
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Blog Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter an interesting title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              placeholder="Technology, Travel, Lifestyle..."
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Story</label>

            <textarea
              name="content"
              placeholder="Start writing your story..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="editor-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="auth-submit publish-btn"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Story →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateBlog;