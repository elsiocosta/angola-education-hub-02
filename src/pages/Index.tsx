import React, { useState } from 'react';
import { MapPin, Search, GraduationCap, Users, Calendar, Star, Play, ChevronRight, Shield, Video, DollarSign, Globe, Target, Zap } from 'lucide-react';
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
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 
    'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 
    'Icolo e Bengo', 'Luanda', 'Lunda Norte', 'Lunda Sul', 
    'Malanje', 'Moxico', 'Moxico Leste', 'Namibe', 'Uíge', 'Zaire'
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

      {/* Platform Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Primeira Rede Digital do Ensino Angolano
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Criamos uma plataforma digital que centraliza informações sobre todas as instituições de ensino em Angola (primário, secundário, médio e superior), promovendo transparência, conectividade e modernização educacional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mapeamento Completo</h3>
                <p className="text-gray-600">Localização geográfica de todas as instituições de ensino em Angola</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Transparência Total</h3>
                <p className="text-gray-600">Acesso a dados relevantes, propinas, cursos e estrutura organizacional</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Modernização Digital</h3>
                <p className="text-gray-600">Candidaturas online, rede social educacional e gestão moderna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
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

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um sistema completo que revoluciona a forma como as instituições de ensino se conectam com estudantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Sistema de Cadastro Duplo",
                description: "Cadastro público para visitantes e sistema interno por convite para funcionários",
                features: ["Registro de visitantes", "Convites institucionais", "Validação em 48h", "Gestão de permissões"]
              },
              {
                icon: Video,
                title: "Perfis Institucionais Completos",
                description: "Vídeos introdutórios, equipe, cursos, propinas e localização no mapa",
                features: ["Vídeo institucional", "Lista de funcionários", "Cursos e turnos", "Propinas transparentes"]
              },
              {
                icon: GraduationCap,
                title: "Candidaturas Online",
                description: "Sistema digital para exames de admissão apenas para universidades",
                features: ["Inscrição online", "Upload de documentos", "Pagamento presencial", "Acompanhamento de status"]
              },
              {
                icon: Users,
                title: "Rede Social Educacional",
                description: "Interações entre instituições e estudantes com publicações e seguidores",
                features: ["Publicações institucionais", "Curtidas e partilhas", "Sistema de seguidores", "Comentários"]
              },
              {
                icon: MapPin,
                title: "Mapeamento Geográfico",
                description: "Localização precisa de todas as instituições com integração ao Google Maps",
                features: ["Mapa interativo", "Filtros por localização", "Rotas de acesso", "Visualização por região"]
              },
              {
                icon: Calendar,
                title: "Gestão Administrativa",
                description: "Painel completo para gestão da instituição e equipe",
                features: ["Dashboard de métricas", "Gestão de equipe", "Controle de candidaturas", "Relatórios avançados"]
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Profiles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfis de Acesso por Função
            </h2>
            <p className="text-xl text-gray-600">
              Sistema de permissões estruturado para cada tipo de utilizador
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Visitante",
                description: "Acesso público",
                permissions: ["Pesquisar instituições", "Ver perfis públicos", "Seguir e curtir", "Guardar favoritos"]
              },
              {
                title: "Estudante",
                description: "Por convite",
                permissions: ["Candidatar-se", "Comentar", "Dar feedback", "Acesso a calendário"]
              },
              {
                title: "Professor",
                description: "Membro da equipe",
                permissions: ["Criar publicações", "Ver seguidores", "Gerir conteúdo", "Calendário de aulas"]
              },
              {
                title: "Administrador",
                description: "Gestão completa",
                permissions: ["Editar perfil", "Gerir equipe", "Receber candidaturas", "Acesso total"]
              }
            ].map((profile, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{profile.title}</CardTitle>
                  <CardDescription>{profile.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {profile.permissions.map((permission, idx) => (
                      <li key={idx} className="text-gray-600">• {permission}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Institutions */}
      <FeaturedInstitutions />

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos de Subscrição
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monetização baseada no nível de ensino - mensalidades acessíveis para modernizar sua instituição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Ensino Primário",
                price: "9.000",
                features: ["Página no mapa", "Vídeo institucional", "Até 10 publicações/mês", "2 administradores", "Gestão básica de equipe"]
              },
              {
                name: "Ensino Secundário",
                price: "15.000",
                features: ["Tudo anterior", "Galeria de fotos", "5 vídeos", "Fórum interno", "Contactos coordenadores", "Calendário escolar"],
                featured: true
              },
              {
                name: "Ensino Superior",
                price: "35.000",
                features: ["Tudo anterior", "Candidatura online", "Estatísticas avançadas", "Publicações ilimitadas", "10 administradores", "Relatórios PDF"]
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

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Tecnologia e Integrações
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Plataforma moderna, segura e escalável construída com as melhores tecnologias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Interface Responsiva",
                description: "Design adaptado para desktop e mobile com experiência otimizada"
              },
              {
                title: "Supabase Integration",
                description: "Base de dados robusta com autenticação e APIs em tempo real"
              },
              {
                title: "Sistema de Convites",
                description: "Links de convite institucionais com validade de 48 horas"
              },
              {
                title: "Multicaixa Express",
                description: "Integração futura para pagamentos online automáticos"
              }
            ].map((tech, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Roadmap de Desenvolvimento
            </h2>
            <p className="text-xl text-gray-600">
              Expansão planejada da plataforma em fases estruturadas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  phase: "MVP 1 - Núcleo Institucional",
                  status: "Concluído",
                  features: ["Cadastro e login", "Registro de instituições", "Painel administrativo", "Gestão de membros"],
                  color: "green"
                },
                {
                  phase: "MVP 2 - Interações e Candidaturas",
                  status: "Em Desenvolvimento",
                  features: ["Candidaturas online", "Sistema de curtidas", "Seguidores", "Upload de documentos"],
                  color: "blue"
                },
                {
                  phase: "MVP 3 - Monetização e Pagamentos",
                  status: "Planejado",
                  features: ["Cobrança automática", "Painel financeiro", "Integração Multicaixa", "Relatórios avançados"],
                  color: "yellow"
                },
                {
                  phase: "Fase 4 - Expansão e Mobile",
                  status: "Futuro",
                  features: ["App mobile", "Escolas internacionais", "Cursos técnicos", "Parcerias estratégicas"],
                  color: "gray"
                }
              ].map((roadmap, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-4 h-4 rounded-full mt-1 ${
                    roadmap.color === 'green' ? 'bg-green-500' :
                    roadmap.color === 'blue' ? 'bg-blue-500' :
                    roadmap.color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{roadmap.phase}</h3>
                      <Badge className={
                        roadmap.color === 'green' ? 'bg-green-100 text-green-800' :
                        roadmap.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        roadmap.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {roadmap.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.features.map((feature, idx) => (
                        <span key={idx} className="text-sm bg-white border border-gray-200 rounded-full px-3 py-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Faça Parte da Revolução Digital do Ensino Angolano
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Junte-se às milhares de instituições que já modernizaram sua presença digital e conectaram-se com estudantes em todo o país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Registar Minha Instituição
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Explorar Instituições
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
