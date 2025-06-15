
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
