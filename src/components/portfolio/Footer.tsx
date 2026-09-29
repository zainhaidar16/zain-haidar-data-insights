import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";
export function Footer() {
  const profile = useSiteContent();
  return (
    <footer className="site-footer">
      <div className="container footer-wordmark" aria-hidden="true">
        Data. With direction.
      </div>
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              z.
            </span>
            <span>{profile.name}</span>
          </Link>
          <p>
            Clear analysis. Reliable reporting.
            <br />
            {profile.location}
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
            Download resume
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
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <Link to="/contact" hash="privacy">
          Enquiry privacy
        </Link>
      </div>
    </footer>
  );
}
