import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>✦</span>
            BlogHub
          </div>

          <p>
            A modern blogging platform built with React and MERN stack.
            Share ideas, discover stories, and connect through writing.
          </p>

          <div className="footer-role">
            Frontend Developer | React.js | MERN Stack
          </div>
        </div>

        <div className="footer-links">
          <h3>Connect</h3>

          <a href="mailto:kuldeepbhaber7@gmail.com">
            Email
          </a>

          <a
            href="https://github.com/kuldeepbhabhar7-ux"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/kuldeep-bhabhar-124a13393"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/create">
            Create Blog
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Kuldeep Bhabhar. All rights reserved.</p>
        <p>Built with React & MERN 🚀</p>
      </div>
    </footer>
  );
}

export default Footer;