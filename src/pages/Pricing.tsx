import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Ensino Primário",
      price: "10.000",
      description: "Ideal para escolas primárias",
      features: [
        "Página no mapa interativo",
        "Vídeo institucional",
        "Até 10 publicações/mês",
        "Até 2 administradores",
        "Perfil básico da instituição",
        "Suporte por email"
      ],
      buttonText: "Começar Agora",
      featured: false
    },
    {
      name: "Ensino Secundário",
      price: "15.000",
      description: "Para escolas secundárias completas",
      features: [
        "Tudo do plano anterior",
        "Galeria de fotos",
        "Até 5 vídeos institucionais",
        "Fórum interno",
        "Contactos de coordenadores",
        "Até 3 administradores",
        "Relatórios básicos"
      ],
      buttonText: "Escolher Plano",
      featured: false
    },
    {
      name: "Ensino Médio",
      price: "18.000",
      description: "Para escolas de ensino médio",
      features: [
        "Tudo do plano anterior",
        "Sistema de notas online",
        "Portal do estudante",
        "Até 4 administradores",
        "Gestão de disciplinas",
        "Calendário de provas",
        "Comunicação com pais"
      ],
      buttonText: "Escolher Plano",
      featured: false
    },
    {
      name: "Ensino Médio Técnico",
      price: "20.000",
      description: "Para institutos técnicos profissionais",
      features: [
        "Tudo do plano anterior",
        "Calendário escolar completo",
        "Sistema de feedback",
        "Até 5 coordenadores",
        "Gestão de cursos técnicos",
        "Integração com redes sociais",
        "Suporte prioritário"
      ],
      buttonText: "Escolher Plano",
      featured: true
    },
    {
      name: "Ensino Superior",
      price: "35.000",
      description: "Para universidades e institutos superiores",
      features: [
        "Todas as funcionalidades anteriores",
        "Sistema de candidatura online",
        "Estatísticas avançadas",
        "Publicações ilimitadas",
        "Até 10 administradores",
        "API para integrações",
        "Suporte dedicado 24/7",
        "Relatórios personalizados"
      ],
      buttonText: "Plano Premium",
      featured: false
    }
  ];

  const additionalServices = [
    {
      name: "Destaque na Homepage",
      price: "7.000",
      duration: "7 dias",
      description: "Sua instituição em destaque na página inicial"
    },
    {
      name: "Vídeo Institucional Profissional",
      price: "50.000",
      duration: "único",
      description: "Produção completa pela nossa equipa"
    },
    {
      name: "Página Premium Personalizada",
      price: "25.000",
      duration: "único",
      description: "Design exclusivo para sua instituição"
    },
    {
      name: "Formulário de Candidatura Avançado",
      price: "5.000",
      duration: "mês",
      description: "Funcionalidades extras de candidatura"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Planos de Subscrição
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o nível de ensino da sua instituição. 
              Todos os planos incluem acesso completo às funcionalidades básicas.
            </p>
          </div>

          {/* Main Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.featured ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600"> KZ/mês</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Link to="/register" className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.featured 
                          ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Annual Discount */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center mb-16">
            <h3 className="text-2xl font-bold mb-4">Desconto Anual</h3>
            <p className="text-lg mb-6">
              Pague anualmente e economize <span className="font-bold">15%</span> em qualquer plano
            </p>
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              Saber Mais sobre Desconto Anual
            </Button>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Serviços Adicionais
              </h2>
              <p className="text-lg text-gray-600">
                Potencialize ainda mais a presença da sua instituição
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">
                      {service.price} KZ
                      <span className="text-sm text-gray-600 font-normal">/{service.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Adicionar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Perguntas Frequentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h4>
                <p className="text-gray-600 text-sm">
                  Sim, pode actualizar ou reduzir seu plano a qualquer momento. 
                  As alterações são aplicadas no próximo ciclo de facturação.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Como é feito o pagamento?</h4>
                <p className="text-gray-600 text-sm">
                  Aceitamos pagamentos via Multicaixa Express, transferência bancária 
                  ou pagamento presencial nas nossas instalações.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Existe período de teste gratuito?</h4>
                <p className="text-gray-600 text-sm">
                  Oferecemos 30 dias gratuitos para todas as novas instituições 
                  se registarem na plataforma.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">O que acontece se não pagar a mensalidade?</h4>
                <p className="text-gray-600 text-sm">
                  Após 7 dias de atraso, o perfil fica suspenso. Após 30 dias, 
                  os dados podem ser removidos permanentemente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
