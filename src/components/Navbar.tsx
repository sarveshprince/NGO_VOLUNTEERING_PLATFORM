import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center transition-smooth group-hover:shadow-glow">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-foreground">VolunteerHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/opportunities" className="text-foreground hover:text-primary transition-smooth font-medium">
              Find Opportunities
            </Link>
            <Link to="/NGORegister" className="text-foreground hover:text-primary transition-smooth font-medium">
              Register NGO
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth font-medium">
              About Us
            </Link>
            <Link to="/donate" className="text-foreground hover:text-primary transition-smooth font-medium">
              Donate
            </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-smooth font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="hero" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/opportunities"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Opportunities
              </Link>
              <Link
                to="/NGORegister"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register NGO
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/donate"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" onClick={() => navigate("/login")} className="w-full">
                  Sign In
                </Button>
                <Button variant="hero" onClick={() => navigate("/register")} className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
