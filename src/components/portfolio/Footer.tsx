import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              z.
            </span>
            <span>Zain Haidar</span>
          </Link>
          <p>
            Clear analysis. Reliable reporting.
            <br />
            Based in Vienna, Austria.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About & experience</Link>
          <Link to="/blog">Writing</Link>
        </nav>
        <div className="footer-links">
          <a href={profile.resume} download>
            Download résumé
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={"mailto:" + profile.email}>Email Zain</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Zain Haidar</span>
        <Link to="/contact" hash="privacy">
          Enquiry privacy
        </Link>
      </div>
    </footer>
  );
}
