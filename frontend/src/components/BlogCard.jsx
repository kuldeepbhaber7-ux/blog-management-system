import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <span className="category">{blog.category}</span>

      <h2>{blog.title}</h2>

      <p>{blog.content}</p>

      <div className="blog-footer">
        <span>By {blog.author?.name}</span>

        <Link to={`/blog/${blog._id}`}>Read More →</Link>
      </div>
    </div>
  );
}

export default BlogCard;