import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  showLandingNav?: boolean;
}

const Header = ({ showLandingNav = false }: HeaderProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    if (isLandingPage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to landing page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-5xl px-6">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        <div className="flex justify-between items-center h-14 px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">TF</span>
              </div>
              <h1 className="text-base font-medium text-white">TheFinance</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {isLandingPage ? (
                <>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection("why-choose-us")}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Why Us
                  </button>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </>
              )}
              <Link
                to="/apply"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Join as Investor
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button
                variant="ghost"
                className="text-sm text-white/70 hover:text-white hover:bg-white/10 h-8 px-3 rounded-full"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-red-600 hover:bg-red-700 text-white text-sm h-8 px-4 rounded-full transition-all duration-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
