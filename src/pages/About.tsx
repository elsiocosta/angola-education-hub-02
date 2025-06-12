
import React from 'react';
import { Target, Eye, Users, Heart, Award, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Democratizar o acesso à informação educacional em Angola, conectando estudantes às melhores oportunidades de ensino através de uma plataforma digital moderna e inclusiva."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser a principal rede digital de educação em Angola, transformando a forma como as instituições de ensino se conectam com estudantes e famílias em todo o país."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Transparência, inovação, inclusão e excelência educacional. Acreditamos que todos merecem acesso a informações claras sobre oportunidades educacionais."
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Conexão Nacional",
      description: "Presença em todas as 18 províncias de Angola, conectando instituições urbanas e rurais numa única plataforma."
    },
    {
      icon: Award,
      title: "Qualidade Certificada",
      description: "Todas as instituições passam por um processo rigoroso de verificação antes de serem aprovadas na plataforma."
    },
    {
      icon: Zap,
      title: "Tecnologia Avançada",
      description: "Plataforma moderna, responsiva e optimizada para funcionar em qualquer dispositivo e conexão."
    }
  ];

  const teamMembers = [
    {
      name: "Carlos Silva",
      role: "CEO & Fundador",
      description: "Engenheiro de Software com 15 anos de experiência em tecnologia educacional.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Maria Santos",
      role: "Directora de Educação",
      description: "Pedagoga com mestrado em Gestão Educacional, especialista em políticas educacionais angolanas.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "João Costa",
      role: "CTO",
      description: "Especialista em desenvolvimento de plataformas digitais e arquitectura de sistemas.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sobre a Ango Education
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Somos uma startup angolana dedicada a revolucionar o sector educacional através da tecnologia. 
              A nossa plataforma digital conecta estudantes às melhores instituições de ensino em todo o país, 
              promovendo transparência, acessibilidade e qualidade na educação.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-4">
                    <value.icon className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">A Nossa História</h2>
              <p className="text-lg leading-relaxed mb-6">
                A Ango Education nasceu da observação de uma necessidade real: a dificuldade que estudantes 
                e famílias enfrentam para encontrar informações claras e actualizadas sobre instituições de ensino em Angola.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Em 2023, nossa equipa multidisciplinar de engenheiros, educadores e especialistas em marketing digital 
                uniu forças para criar uma solução digital que aproximasse as instituições de ensino dos estudantes, 
                independentemente da sua localização geográfica.
              </p>
              <p className="text-lg leading-relaxed">
                Hoje, orgulhamo-nos de ser a primeira e maior rede digital educacional de Angola, 
                com presença em todas as províncias e milhares de estudantes conectados diariamente.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Por que Escolher a Ango Education?
              </h2>
              <p className="text-lg text-gray-600">
                Somos mais que uma plataforma, somos uma ponte para o futuro educacional de Angola
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                A Nossa Equipa
              </h2>
              <p className="text-lg text-gray-600">
                Profissionais dedicados à transformação da educação em Angola
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Numbers */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                O Nosso Impacto
              </h2>
              <p className="text-lg text-gray-600">
                Números que demonstram o crescimento e alcance da nossa missão
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1,500+</div>
                <div className="text-gray-600">Instituições Registradas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
                <div className="text-gray-600">Estudantes Conectados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">18</div>
                <div className="text-gray-600">Províncias Cobertas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfação dos Utilizadores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
