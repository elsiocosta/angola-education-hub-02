
import React, { useState } from 'react';
import { MapPin, Search, GraduationCap, Users, Calendar, Star, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import FeaturedInstitutions from '@/components/FeaturedInstitutions';
import StatsSection from '@/components/StatsSection';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const provinces = [
    'Luanda', 'Benguela', 'Huíla', 'Uíge', 'Cabinda', 'Quando Cubango',
    'Cuanza Norte', 'Cuanza Sul', 'Malanje', 'Lunda Norte', 'Lunda Sul',
    'Moxico', 'Cunene', 'Namibe', 'Huambo', 'Bié', 'Zaire', 'Bengo'
  ];

  const educationLevels = [
    'Ensino Primário',
    'Ensino Secundário', 
    'Ensino Médio Técnico',
    'Ensino Superior'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Encontre a Instituição Ideal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore milhares de escolas, institutos e universidades em todo Angola
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Nome da instituição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Província" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Nível de Ensino" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Link to="/search">
                  <Button className="h-12 w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <Search className="h-5 w-5 mr-2" />
                    Pesquisar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Institutions */}
      <FeaturedInstitutions />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Funcionalidades da Plataforma
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tudo que sua instituição precisa para ter uma presença digital moderna e profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Localização Geográfica",
                description: "Mapa interativo com localização exacta e filtros avançados"
              },
              {
                icon: Play,
                title: "Vídeo Institucional",
                description: "Apresente sua escola de forma visual e moderna"
              },
              {
                icon: Users,
                title: "Perfil Completo",
                description: "Informações detalhadas sobre cursos, horários e propinas"
              },
              {
                icon: Calendar,
                title: "Gestão Interna",
                description: "Fórum interno e administração exclusiva para responsáveis"
              },
              {
                icon: Star,
                title: "Rede Social Educacional",
                description: "Publicações, curtidas, comentários e seguidores"
              },
              {
                icon: GraduationCap,
                title: "Candidatura Online",
                description: "Sistema digital de inscrição para exames de admissão"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-200 mb-4" />
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos de Subscrição
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o nível de ensino da sua instituição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Ensino Primário",
                price: "10.000",
                features: ["Página no mapa", "Vídeo institucional", "Até 10 publicações/mês", "2 administradores"]
              },
              {
                name: "Ensino Secundário",
                price: "15.000",
                features: ["Tudo anterior", "Galeria de fotos", "5 vídeos", "Fórum interno", "Contactos coordenadores"]
              },
              {
                name: "Ensino Médio Técnico",
                price: "20.000",
                features: ["Tudo anterior", "Calendário escolar", "Sistema feedback", "Até 5 coordenadores"]
              },
              {
                name: "Ensino Superior",
                price: "35.000",
                features: ["Tudo anterior", "Candidatura online", "Estatísticas", "Publicações ilimitadas", "10 administradores"],
                featured: true
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.featured ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600"> KZ/mês</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Começar Agora
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Ver Todos os Detalhes dos Planos
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
