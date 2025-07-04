
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserRole } from "@/types/user";

const LayoutHeader = () => {
  const { user, userProfile, logout } = useAuth();
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
                      Olá, {userProfile?.name || user.user_metadata?.name || user.email}
                    </span>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={'/placeholder.svg'} alt={userProfile?.name} />
                            <AvatarFallback>
                              {userProfile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {userProfile?.name || user.user_metadata?.name || 'Usuário'}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground capitalize">
                              {userProfile?.role || 'visitante'}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard">
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/profile">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configurações</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
