
import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, FileText, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const faqs = [
    {
      question: "Como registar a minha instituição na plataforma?",
      answer: "Para registar sua instituição, clique no botão 'Registar Instituição' no topo da página, preencha o formulário com os dados da sua escola/universidade e aguarde a aprovação da nossa equipa. O processo leva normalmente 24-48 horas."
    },
    {
      question: "Quais são os métodos de pagamento aceites?",
      answer: "Aceitamos pagamentos via Multicaixa Express, transferência bancária direta e pagamento presencial nas nossas instalações em Luanda. Para pagamentos internacionais, também aceitamos transferências SWIFT."
    },
    {
      question: "Posso alterar o meu plano de subscrição?",
      answer: "Sim, pode alterar seu plano a qualquer momento através do painel de administração. As alterações são aplicadas no próximo ciclo de facturação. Para downgrades, o novo plano entra em vigor no final do período atual."
    },
    {
      question: "Como funciona o sistema de candidaturas online?",
      answer: "O sistema de candidaturas está disponível apenas para instituições de ensino superior. Os estudantes preenchem o formulário online, geram um comprovativo e devem efectuar o pagamento presencialmente para validar a candidatura."
    },
    {
      question: "Que tipos de conteúdo posso publicar?",
      answer: "Pode publicar anúncios de matrículas, eventos escolares, conquistas de estudantes, novidades da instituição, fotos de instalações e vídeos institucionais. Todo o conteúdo é moderado para garantir qualidade."
    },
    {
      question: "Como contactar o suporte técnico?",
      answer: "Pode nos contactar através do formulário abaixo, email suporte@angoeducation.ao, telefone +244 923 456 789 ou WhatsApp. Nosso horário de atendimento é das 8h às 18h, segunda a sexta-feira."
    }
  ];

  const supportCategories = [
    "Questão Técnica",
    "Pagamentos e Facturação",
    "Gestão da Conta",
    "Funcionalidades da Plataforma",
    "Candidaturas",
    "Outros"
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Reset form after submission
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Central de Ajuda
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre respostas rápidas para as suas dúvidas ou entre em contacto connosco. 
              Estamos aqui para ajudar sua instituição a ter sucesso na plataforma.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Pesquisar na central de ajuda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Links */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Acesso Rápido</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Tutorial em Vídeo</h3>
                      <p className="text-gray-600 text-sm">Como usar a plataforma passo a passo</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Guia Completo</h3>
                      <p className="text-gray-600 text-sm">Documentação detalhada em PDF</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedFaq === index && (
                        <CardContent>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Enviar Mensagem</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Não encontrou a resposta?</CardTitle>
                    <CardDescription>
                      Envie-nos uma mensagem e responderemos o mais breve possível
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleContactSubmit}>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nome Completo *</label>
                          <Input
                            placeholder="Seu nome"
                            value={contactForm.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">E-mail *</label>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={contactForm.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Categoria *</label>
                          <Select value={contactForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Assunto *</label>
                          <Input
                            placeholder="Assunto da mensagem"
                            value={contactForm.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mensagem *</label>
                        <Textarea
                          placeholder="Descreva detalhadamente sua dúvida ou problema..."
                          rows={6}
                          value={contactForm.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </CardContent>
                  </form>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contactos Diretos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">+244 923 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-gray-600">suporte@angoeducation.ao</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-gray-600">+244 923 456 789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Segunda - Sexta</span>
                      <Badge variant="outline">8h - 18h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <Badge variant="outline">9h - 13h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <Badge variant="secondary">Fechado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Tempo de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Email</span>
                        <span className="text-sm font-medium">24h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">WhatsApp</span>
                        <span className="text-sm font-medium">2h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Telefone</span>
                        <span className="text-sm font-medium">Imediato</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
