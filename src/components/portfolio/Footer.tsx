import { ThemeToggle } from "./ThemeToggle";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";
export function Footer() {
  const profile = useSiteContent();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand" aria-label="zainhaidar, home">
            <img
              className="brand-symbol"
              src="/brand/signal-mark.svg"
              alt=""
              width="36"
              height="36"
              aria-hidden="true"
            />
            <span>zainhaidar</span>
          </Link>
          <p>
            Clear analysis. Reliable reporting.
            <br />
            {profile.location}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="footer-label">Explore</p>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About & experience</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-links">
          <p className="footer-label">Connect</p>
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
        <ThemeToggle />
        <Link to="/contact" hash="privacy">
          Enquiry privacy
        </Link>
      </div>
    </footer>
  );
}
