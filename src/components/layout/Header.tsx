import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-8 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TF</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">TheFinance</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/5 h-8 px-3 text-sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-white/10"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-red-600 text-white font-semibold">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-black/90 border-white/10 text-white backdrop-blur-sm"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        My Account
                      </p>
                      <p className="text-xs leading-none text-white/60">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="focus:bg-red-500/20 cursor-pointer text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 h-8 px-3 text-sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-red-700 hover:bg-red-800 text-white text-sm h-8 px-4 rounded-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
