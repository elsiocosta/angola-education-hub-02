
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Em vez de um booleano para cada dropdown, usa-se uma string indicando qual está aberto.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigationItems = [
    {
      name: 'Instituições',
      href: '/search',
      description: 'Pesquisar escolas e universidades'
    },
    {
      name: 'Feed Educacional',
      href: '/feed',
      description: 'Publicações das instituições'
    },
    {
      name: 'Níveis de Ensino',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Universidades', href: '/search?level=university', description: 'Ensino Superior e Universitário' },
        { name: 'Ensino Médio', href: '/search?level=high-school', description: 'Ensino Médio e Técnico' },
        { name: 'Ensino Secundário', href: '/search?level=secondary', description: 'Ensino Secundário (9ª-12ª classe)' },
        { name: 'Ensino Primário', href: '/search?level=primary', description: 'Ensino Primário (1ª-6ª classe)' }
      ]
    },
    {
      name: 'Recursos',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Sobre a Plataforma', href: '/about', description: 'Conheça nossa missão' },
        { name: 'Blog Educacional', href: '/blog', description: 'Artigos sobre educação' },
        { name: 'Central de Ajuda', href: '/support', description: 'Suporte e tutoriais' },
        { name: 'Relatórios', href: '/report', description: 'Estatísticas da plataforma' }
      ]
    },
    {
      name: 'Gestão',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Painel do Estudante', href: '/dashboard/student', description: 'Dashboard do estudante' },
        { name: 'Painel Institucional', href: '/dashboard/institution', description: 'Dashboard da instituição' },
        { name: 'Gestão de Convites', href: '/invites', description: 'Convidar membros' },
        { name: 'Gestão de Cursos', href: '/courses', description: 'Gerir cursos e turmas' },
        { name: 'Mensagens Internas', href: '/messages', description: 'Comunicação interna' }
      ]
    },
    {
      name: 'Preços',
      href: '/pricing',
      description: 'Planos para instituições'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.name ? null : item.name)
                        }
                        className={`flex items-center space-x-1 transition-colors ${
                          location.pathname.includes(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="font-medium text-gray-900">{dropdownItem.name}</div>
                              <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`transition-colors ${
                        location.pathname === item.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Social Media Icons & Action Buttons */}
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

            {/* Mobile Menu Button */}
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="pt-4 space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="pl-4 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
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
                  </div>
                </div>
                
                <div className="space-y-2">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ango Education</h3>
                  <p className="text-gray-400 text-sm">A rede digital do ensino angolano</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Conectando estudantes às melhores instituições de ensino em todo Angola através 
                de uma plataforma digital moderna e transparente. Desde o ensino primário até ao universitário.
              </p>
              
              {/* Social Media Footer */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Siga-nos:</span>
                <a 
                  href="https://facebook.com/share/1Ejkc6Rcgv/?mibextid=wwXlfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                  title="Facebook Oficial da Ango Education"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a 
                  href="https://instagram.com/ango_education" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-3 py-2 rounded-lg transition-colors"
                  title="Instagram Oficial da Ango Education"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="text-sm">@ango_education</span>
                </a>
              </div>
            </div>
            
            {/* Coluna única, agora centralizada ou à direita, para TODOS os links institucionais, unificando o conteúdo antes duplicado */}
            <div className="md:col-span-2 flex flex-wrap gap-8 justify-center md:justify-end">
              <div>
                <h4 className="font-semibold mb-4">Níveis de Ensino</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/search?level=university" className="hover:text-white transition-colors">Universidades</Link></li>
                  <li><Link to="/search?level=high-school" className="hover:text-white transition-colors">Ensino Médio</Link></li>
                  <li><Link to="/search?level=secondary" className="hover:text-white transition-colors">Ensino Secundário</Link></li>
                  <li><Link to="/search?level=primary" className="hover:text-white transition-colors">Ensino Primário</Link></li>
                  <li><Link to="/feed" className="hover:text-white transition-colors">Feed Educacional</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Plataforma</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/search" className="hover:text-white transition-colors">Buscar Instituições</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Preços</Link></li>
                  <li><Link to="/register" className="hover:text-white transition-colors">Registar Instituição</Link></li>
                  <li><Link to="/application/example" className="hover:text-white transition-colors">Candidaturas</Link></li>
                  <li><Link to="/admin" className="hover:text-white transition-colors">Administração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Gestão & Recursos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/dashboard/student" className="hover:text-white transition-colors">Dashboard Estudante</Link></li>
                  <li><Link to="/dashboard/institution" className="hover:text-white transition-colors">Dashboard Instituição</Link></li>
                  <li><Link to="/invites" className="hover:text-white transition-colors">Gestão de Convites</Link></li>
                  <li><Link to="/courses" className="hover:text-white transition-colors">Gestão de Cursos</Link></li>
                  <li><Link to="/messages" className="hover:text-white transition-colors">Mensagens</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/support" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                  <li><Link to="/report" className="hover:text-white transition-colors">Relatórios</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 Ango Education. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link>
                <Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

