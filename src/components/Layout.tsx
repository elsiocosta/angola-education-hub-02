
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/search" 
                className={`transition-colors ${location.pathname === '/search' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Instituições
              </Link>
              <Link 
                to="/pricing" 
                className={`transition-colors ${location.pathname === '/pricing' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Preços
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Sobre
              </Link>
              <Link 
                to="/support" 
                className={`transition-colors ${location.pathname === '/support' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Suporte
              </Link>
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
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ango Education</h3>
                  <p className="text-gray-400 text-sm">A rede digital do ensino angolano</p>
                </div>
              </div>
              <p className="text-gray-400">
                Conectando estudantes às melhores instituições de ensino em todo Angola.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search" className="hover:text-white transition-colors">Buscar Instituições</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Registar Instituição</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Conta</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Entrar</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Painel</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Administração</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Ango Education. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
