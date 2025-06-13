
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Eye, 
  Heart, 
  FileText, 
  UserPlus, 
  Calendar, 
  CreditCard,
  Settings,
  BarChart3,
  Video,
  MessageSquare,
  School,
  GraduationCap,
  Building
} from 'lucide-react';

const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const institutionData = {
    name: 'Universidade Agostinho Neto',
    type: 'Ensino Superior',
    province: 'Luanda',
    plan: 'Ensino Superior',
    monthlyFee: '35.000 KZ',
    nextPayment: '15/01/2024'
  };

  const stats = [
    { label: 'Seguidores', value: '1,234', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Visualizações', value: '45,678', icon: Eye, color: 'text-green-600', change: '+8%' },
    { label: 'Curtidas', value: '890', icon: Heart, color: 'text-red-600', change: '+15%' },
    { label: 'Publicações', value: '23', icon: FileText, color: 'text-purple-600', change: '+2' }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. António Silva',
      role: 'Diretor',
      status: 'Ativo',
      lastLogin: '2 horas',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Prof. Maria Santos',
      role: 'Coordenadora',
      status: 'Ativo',
      lastLogin: '1 dia',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'João Costa',
      role: 'Secretário',
      status: 'Inativo',
      lastLogin: '1 semana',
      avatar: '/placeholder.svg'
    }
  ];

  const applications = [
    {
      id: 1,
      studentName: 'Pedro Manuel',
      course: 'Engenharia Informática',
      date: '2024-01-15',
      status: 'Pendente',
      documents: 'Completo'
    },
    {
      id: 2,
      studentName: 'Ana Ferreira',
      course: 'Medicina',
      date: '2024-01-14',
      status: 'Aprovado',
      documents: 'Completo'
    }
  ];

  const courses = [
    {
      id: 1,
      name: 'Engenharia Informática',
      coordinator: 'Prof. Carlos Mendes',
      students: 245,
      duration: '5 anos',
      fee: '45.000 KZ'
    },
    {
      id: 2,
      name: 'Medicina',
      coordinator: 'Dr. Isabel Rodrigues',
      students: 189,
      duration: '6 anos',
      fee: '65.000 KZ'
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Institucional</h1>
              <p className="text-gray-600">{institutionData.name} - {institutionData.type}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Editar Vídeo
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="team">Equipe</TabsTrigger>
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="applications">Candidaturas</TabsTrigger>
              <TabsTrigger value="posts">Publicações</TabsTrigger>
              <TabsTrigger value="billing">Faturação</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Gerir o perfil da sua instituição</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs">Nova Publicação</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <UserPlus className="h-6 w-6 mb-2" />
                    <span className="text-xs">Convidar Membro</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <GraduationCap className="h-6 w-6 mb-2" />
                    <span className="text-xs">Gerir Cursos</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-xs">Relatórios</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Account Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status da Conta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Plano Actual</span>
                        <Badge className="bg-green-100 text-green-800">{institutionData.plan}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mensalidade</span>
                        <span className="font-semibold">{institutionData.monthlyFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Próximo Pagamento</span>
                        <span className="text-sm text-gray-600">{institutionData.nextPayment}</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Ver Detalhes Financeiros
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Candidaturas Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{app.studentName}</p>
                            <p className="text-sm text-gray-600">{app.course}</p>
                          </div>
                          <Badge variant={app.status === 'Aprovado' ? 'default' : 'secondary'}>
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestão de Equipe</CardTitle>
                      <CardDescription>Membros da instituição e suas permissões</CardDescription>
                    </div>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Convidar Membro
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={member.status === 'Ativo' ? 'default' : 'secondary'}>
                              {member.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">Último login: {member.lastLogin}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestão de Cursos</CardTitle>
                      <CardDescription>Cursos oferecidos pela instituição</CardDescription>
                    </div>
                    <Button>
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Adicionar Curso
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Coordenador:</span>
                              <span className="text-sm font-medium">{course.coordinator}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Estudantes:</span>
                              <span className="text-sm font-medium">{course.students}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Duração:</span>
                              <span className="text-sm font-medium">{course.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Propina:</span>
                              <span className="text-sm font-medium">{course.fee}</span>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button variant="outline" size="sm">Editar</Button>
                              <Button variant="outline" size="sm">Ver Turmas</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Candidaturas Recebidas</CardTitle>
                  <CardDescription>Gerir candidaturas aos cursos da instituição</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{app.studentName}</h3>
                            <p className="text-gray-600">{app.course}</p>
                            <p className="text-sm text-gray-500">Candidatura em: {app.date}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={app.status === 'Aprovado' ? 'default' : 'secondary'}>
                              {app.status}
                            </Badge>
                            <Badge variant="outline">{app.documents}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Ver Documentos</Button>
                          <Button size="sm" variant="outline">Aprovar</Button>
                          <Button size="sm" variant="outline">Rejeitar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestão de Publicações</CardTitle>
                      <CardDescription>Criar e gerir publicações da instituição</CardDescription>
                    </div>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Nova Publicação
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Funcionalidade de publicações em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão Financeira</CardTitle>
                  <CardDescription>Histórico de pagamentos e faturas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Valor Mensal</p>
                            <p className="text-2xl font-bold text-green-600">{institutionData.monthlyFee}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Próximo Pagamento</p>
                            <p className="text-lg font-semibold">{institutionData.nextPayment}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Status</p>
                            <Badge className="bg-green-100 text-green-800">Em Dia</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-4">Histórico de Pagamentos</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Dezembro 2023</span>
                          <Badge variant="default">Pago</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Novembro 2023</span>
                          <Badge variant="default">Pago</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionDashboard;
