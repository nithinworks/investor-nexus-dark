import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  showLandingNav?: boolean;
}

const Header = ({ showLandingNav = false }: HeaderProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4 md:px-6">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        <div className="flex justify-between items-center h-14 px-6">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/thefinance-logo.svg"
                alt="TheFinance"
                className="h-10 w-auto flex-shrink-0"
              />
            </Link>
            {showLandingNav && (
              <nav className="hidden md:flex items-center space-x-6">
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
                <Link
                  to="/apply"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Join as Investor
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-sm text-white/70 hover:text-white hover:bg-white/10 h-8 px-3 rounded-full"
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
