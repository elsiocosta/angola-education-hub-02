
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const LayoutHeader = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Início',
      href: '/',
      hasDropdown: false
    },
    {
      name: 'Instituições',
      href: '/search',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Buscar Instituições',
          href: '/search',
          description: 'Encontre a instituição ideal para você'
        },
        {
          name: 'Registrar Instituição',
          href: '/register',
          description: 'Cadastre sua instituição na plataforma'
        }
      ]
    },
    {
      name: 'Feed',
      href: '/feed',
      hasDropdown: false
    },
    {
      name: 'Sobre',
      href: '/about',
      hasDropdown: false
    },
    {
      name: 'Suporte',
      href: '/support',
      hasDropdown: false
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Ango Education</h1>
              <p className="text-xs text-gray-500 hidden md:block">A rede digital do ensino angolano</p>
            </div>
          </Link>

          {/* Navigation - responsive */}
          {isMobile ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <DesktopNav 
                navigationItems={navigationItems}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 hidden md:inline">
                      Olá, {user.user_metadata?.name || user.email}
                    </span>
                    <Link to="/dashboard">
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">
                        Entrar
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                        Cadastrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isMobile && (
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
