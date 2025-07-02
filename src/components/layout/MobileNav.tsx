
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface MobileNavProps {
  navigationItems: any[];
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  navigationItems,
  setMobileMenuOpen
}) => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
      <div className="pt-4 space-y-4">
        {navigationItems.map((item) => (
          <div key={item.name}>
            {item.hasDropdown ? (
              <div className="space-y-2">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="pl-4 space-y-2">
                  {item.dropdownItems?.map((dropdownItem: any) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.href}
                className={`block transition-colors ${
                  location.pathname === item.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}

        {/* Mobile Social Media */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-600">Siga-nos:</span>
            <a 
              href="https://facebook.com/share/1Ejkc6Rcgv/?mibextid=wwXlfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/ango_education" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/ango-education-067842372" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="text-sm text-gray-600 mb-2">
                Olá, {user.user_metadata?.name || user.email}
              </div>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  Entrar
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Registar Instituição
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
