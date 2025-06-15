
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

interface LayoutHeaderProps {
  navigationItems: any[];
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ navigationItems }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Ango Education
              </h1>
              <p className="text-sm text-gray-600">A rede digital do ensino angolano</p>
            </div>
          </Link>
          {/* Desktop nav */}
          <DesktopNav 
            navigationItems={navigationItems}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          {/* Social and login/register */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-4">
              <a 
                href="https://facebook.com/share/1Ejkc6Rcgv/?mibextid=wwXlfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Siga-nos no Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/ango_education" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                title="Siga-nos no Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <Link to="/login">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Registar Instituição
              </Button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <MobileNav 
            navigationItems={navigationItems}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;
