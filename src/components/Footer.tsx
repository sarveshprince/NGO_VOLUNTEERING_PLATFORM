import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-foreground">VolunteerHub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting passionate volunteers with meaningful opportunities to create lasting impact in communities worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* For Volunteers */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Volunteers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/opportunities" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Track Your Impact
                </Link>
              </li>
              <li>
                <Link to="/volunteer-stories" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Volunteer Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* For NGOs */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Organizations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ngo-register" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Register Your NGO
                </Link>
              </li>
              <li>
                <Link to="/post-opportunity" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Post Opportunities
                </Link>
              </li>
              <li>
                <Link to="/manage-volunteers" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Manage Volunteers
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Analytics & Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="mailto:info@volunteerhub.org" className="text-muted-foreground hover:text-primary transition-smooth text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@volunteerhub.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 VolunteerHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
