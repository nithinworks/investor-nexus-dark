
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-8 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">TF</span>
              </div>
              <h1 className="text-base font-medium">TheFinance</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8 ml-12">
              <Link
                to="#"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/apply"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Join as Investor
              </Link>
              <Link
                to="#"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button
                variant="ghost"
                className="text-sm text-white/60 hover:text-white hover:bg-white/5 h-8 px-3"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-red-700 hover:bg-red-800 text-white text-sm h-8 px-4 rounded-md transition-all duration-200">
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
