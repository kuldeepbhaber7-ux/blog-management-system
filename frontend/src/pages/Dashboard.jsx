import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="dashboard">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">✦ Welcome to BlogHub</span>

          <h1>
            Ideas that deserve
            <span> to be heard.</span>
          </h1>

          <p>
            Discover inspiring stories, share your ideas, and connect with
            people through the power of writing.
          </p>

          <div className="hero-actions">
            <Link to="/create" className="hero-btn">
              Start Writing →
            </Link>

            <a href="#blogs" className="explore-btn">
              Explore Blogs
            </a>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="floating-card card-one">✍️</div>
          <div className="floating-card card-two">💡</div>
          <div className="floating-card card-three">🚀</div>

          <div className="hero-circle">
            <span>Blog</span>
          </div>
        </div>
      </section>

      <section className="blogs-section" id="blogs">
        <div className="section-heading">
          <div>
            <span className="section-label">LATEST STORIES</span>
            <h2>Explore amazing blogs</h2>
          </div>

          <span className="blog-count">
            {blogs.length} {blogs.length === 1 ? "Story" : "Stories"}
          </span>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="loader"></div>
            <p>Loading stories...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No blogs yet</h3>
            <p>Be the first person to share a story with the community.</p>

            <Link to="/create" className="hero-btn">
              Create First Blog →
            </Link>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>
                <div className="blog-card-top">
                  <span>{blog.category || "General"}</span>
                  <span>✦</span>
                </div>

                <h3>{blog.title}</h3>

                <p>
                  {blog.content?.length > 150
                    ? `${blog.content.substring(0, 150)}...`
                    : blog.content}
                </p>

                <div className="blog-card-footer">
                  <span>
                    By {blog.author?.name || blog.author?.username || "Author"}
                  </span>

                  <Link to={`/blog/${blog._id}`}>Read →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;