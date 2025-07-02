
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Play, ArrowRight, Users, MapPin, GraduationCap, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-education.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Angola Education Platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-1000"></div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/3 animate-bounce">
          <Star className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-500">
          <Zap className="h-8 w-8 text-white" />
        </div>
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
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/search" className="group">
                <EnhancedButton 
                  size="xl" 
                  variant="glass"
                  leftIcon={<Users className="h-6 w-6" />}
                  rightIcon={<ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />}
                  className="w-full sm:w-auto"
                >
                  Explorar Instituições
                </EnhancedButton>
              </Link>
              
              <Link to="/about" className="group">
                <EnhancedButton 
                  size="xl" 
                  variant="outline"
                  leftIcon={<Play className="h-6 w-6" />}
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  Ver Como Funciona
                </EnhancedButton>
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
          
          <div className="relative lg:block hidden">
            {/* Interactive feature grid */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group cursor-pointer">
                  <MapPin className="h-10 w-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">Mapa Interativo</h3>
                  <p className="text-blue-100 text-sm">Encontre instituições próximas com geolocalização precisa</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group cursor-pointer">
                  <GraduationCap className="h-10 w-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">Cursos Diversos</h3>
                  <p className="text-blue-100 text-sm">Explore cursos primários, secundários e superiores</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group cursor-pointer">
                  <Users className="h-10 w-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">Rede Social</h3>
                  <p className="text-blue-100 text-sm">Conecte-se com estudantes e instituições</p>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105 group cursor-pointer">
                  <Play className="h-10 w-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">Conteúdo Rica</h3>
                  <p className="text-blue-100 text-sm">Vídeos e materiais informativos</p>
                </div>
              </div>
            </div>
            
            {/* Floating action elements */}
            <div className="absolute -top-6 -right-6 bg-accent text-white p-4 rounded-2xl shadow-xl animate-bounce">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-4 rounded-2xl shadow-xl animate-bounce delay-500">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="absolute top-1/2 -right-4 bg-success text-white p-3 rounded-xl shadow-lg animate-pulse">
              <Star className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
