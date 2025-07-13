
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const LayoutFooter = () => (
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
        </div>
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
      
      {/* Social Media Links Section */}
      <div className="mt-16 pt-8">
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-300">Siga-nos nas redes sociais</h4>
          <p className="text-gray-400 mb-6">Mantenha-se conectado com as últimas novidades da educação em Angola</p>
        </div>
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors group-hover:scale-110 transform transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors group-hover:scale-110 transform transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 20.312c-2.135 0-3.862-1.729-3.862-3.864s1.727-3.863 3.862-3.863c2.136 0 3.863 1.728 3.863 3.863s-1.727 3.864-3.863 3.864zm7.718 0c-2.136 0-3.863-1.729-3.863-3.864s1.727-3.863 3.863-3.863c2.135 0 3.862 1.728 3.862 3.863s-1.727 3.864-3.862 3.864z"/>
              </svg>
            </div>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors group-hover:scale-110 transform transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors group-hover:scale-110 transform transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors group-hover:scale-110 transform transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </a>
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
);

export default LayoutFooter;
