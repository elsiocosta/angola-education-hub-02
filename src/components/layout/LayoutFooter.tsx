import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, Instagram, Youtube } from "lucide-react";

const LayoutFooter = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e Informações */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Angola Education Hub</h3>
            </div>
          </div>
          <div className="space-y-2 text-gray-400 text-sm">
            <p><strong className="text-white">Fundador:</strong> Elsio Costa</p>
            <p><strong className="text-white">Missão:</strong> Democratizar educação através da tecnologia</p>
          </div>
        </div>

        {/* Links Úteis */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Links Úteis</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contato</Link></li>
          </ul>
        </div>

        {/* Páginas Principais */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Navegação</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Sobre</Link></li>
            <li><Link to="/discover" className="hover:text-white transition-colors">Descobrir Instituições</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Preços</Link></li>
          </ul>
        </div>

        {/* Contatos */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Contatos</h4>
          <div className="space-y-3">
            <a 
              href="mailto:angoeducation@gmail.com" 
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              angoeducation@gmail.com
            </a>
            <a 
              href="https://wa.me/244954789965" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              +244 954 789 965
            </a>
            <a 
              href="https://instagram.com/ango_education" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-4 w-4 mr-2" />
              @ango_education
            </a>
            <a 
              href="https://youtube.com/@AngoEducation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4 mr-2" />
              @AngoEducation
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-8">
        <div className="text-center text-gray-400">
          <p>© 2024 Angola Education Hub. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default LayoutFooter;