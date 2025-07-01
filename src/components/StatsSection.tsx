
import React from 'react';
import { GraduationCap, Users, MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePlatformStats } from '@/hooks/usePlatformStats';

const StatsSection = () => {
  const { data: platformStats, isLoading } = usePlatformStats();

  const stats = [
    {
      icon: Building,
      value: isLoading ? "..." : `${platformStats?.total_institutions || 0}+`,
      label: "Instituições Registradas",
      description: "Escolas, institutos e universidades em toda Angola"
    },
    {
      icon: Users,
      value: isLoading ? "..." : 
        platformStats?.total_students ? 
          (platformStats.total_students >= 1000 ? 
            `${Math.floor(platformStats.total_students / 1000)}K+` : 
            `${platformStats.total_students}+`) : 
          "0+",
      label: "Estudantes Conectados",
      description: "Comunidade ativa de estudantes e educadores"
    },
    {
      icon: MapPin,
      value: "18",
      label: "Províncias Cobertas",
      description: "Presença em todo o território nacional"
    },
    {
      icon: GraduationCap,
      value: isLoading ? "..." : `${platformStats?.total_courses || 0}+`,
      label: "Cursos Disponíveis",
      description: "Diversidade de opções de formação"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Impacto da Ango Education
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Números que demonstram o crescimento e alcance da nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-blue-100 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Junte-se à Revolução Digital da Educação Angolana
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Faça parte da maior rede educacional digital de Angola e conecte sua instituição 
              a milhares de estudantes em todo o país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Registar Minha Instituição
                </button>
              </Link>
              <Link to="/about">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Saber Mais
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
