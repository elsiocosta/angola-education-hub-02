
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Users, MapPin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 opacity-95"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">🚀 Plataforma Beta Disponível</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A Rede Digital do
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Ensino Angolano
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Conecte-se às melhores instituições de ensino em Angola. 
              Encontre escolas, universidades e institutos com facilidade através 
              da nossa plataforma digital moderna e intuitiva.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  <Users className="mr-2 h-5 w-5" />
                  Explorar Instituições
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Como Funciona
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1,500+</div>
                <div className="text-blue-200 text-sm">Instituições</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">21</div>
                <div className="text-blue-200 text-sm">Províncias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100K+</div>
                <div className="text-blue-200 text-sm">Estudantes</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Hero illustration placeholder */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <MapPin className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-2">Localização</h3>
                  <p className="text-blue-100 text-sm">Encontre instituições próximas de si</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-2">Cursos</h3>
                  <p className="text-blue-100 text-sm">Explore opções de formação</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <Users className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-2">Comunidade</h3>
                  <p className="text-blue-100 text-sm">Conecte-se com colegas</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <Play className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-2">Vídeos</h3>
                  <p className="text-blue-100 text-sm">Conheça as instituições</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 p-3 rounded-full shadow-lg">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
