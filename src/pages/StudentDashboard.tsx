
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Heart, 
  School, 
  Trophy, 
  User, 
  Bell,
  Download,
  MessageSquare,
  Clock
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const studentData = {
    name: 'João Silva',
    institution: 'Universidade Agostinho Neto',
    course: 'Engenharia Informática',
    year: '3º Ano',
    semester: '1º Semestre',
    studentId: 'UAN2021001234'
  };

  const applications = [
    {
      id: 1,
      institution: 'Instituto Superior Politécnico',
      course: 'Engenharia Civil',
      status: 'Pendente',
      date: '2024-01-15',
      examDate: '2024-02-20'
    },
    {
      id: 2,
      institution: 'Universidade Católica de Angola',
      course: 'Medicina',
      status: 'Aprovado',
      date: '2024-01-10',
      examDate: '2024-02-15'
    }
  ];

  const favoriteInstitutions = [
    {
      id: 1,
      name: 'Instituto Superior de Ciências da Educação',
      type: 'Universidade',
      province: 'Luanda',
      followers: 1234
    },
    {
      id: 2,
      name: 'Universidade Jean Piaget',
      type: 'Universidade',
      province: 'Benguela',
      followers: 856
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Resultado do Exame de Admissão',
      message: 'O resultado do seu exame está disponível',
      time: '2 horas',
      type: 'exam'
    },
    {
      id: 2,
      title: 'Nova Publicação',
      message: 'UAN publicou sobre inscrições 2024',
      time: '5 horas',
      type: 'post'
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
              <p className="text-gray-600">{studentData.name} - {studentData.studentId}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button>
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="applications">Candidaturas</TabsTrigger>
              <TabsTrigger value="institutions">Instituições</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Student Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <School className="h-5 w-5 mr-2" />
                    Informações Acadêmicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Instituição</p>
                      <p className="text-lg font-semibold">{studentData.institution}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Curso</p>
                      <p className="text-lg font-semibold">{studentData.course}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ano/Semestre</p>
                      <p className="text-lg font-semibold">{studentData.year} - {studentData.semester}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Candidaturas</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Favoritas</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                      <Heart className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Exames</p>
                        <p className="text-2xl font-bold">2</p>
                      </div>
                      <Trophy className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Documentos</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Candidaturas Recentes</CardTitle>
                  <CardDescription>Acompanhe o status das suas candidaturas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 2).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{app.institution}</h4>
                          <p className="text-sm text-gray-600">{app.course}</p>
                          <p className="text-xs text-gray-500">Exame: {app.examDate}</p>
                        </div>
                        <Badge variant={app.status === 'Aprovado' ? 'default' : 'secondary'}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Candidaturas</CardTitle>
                  <CardDescription>Histórico completo de candidaturas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{app.institution}</h3>
                            <p className="text-gray-600">{app.course}</p>
                          </div>
                          <Badge variant={app.status === 'Aprovado' ? 'default' : 'secondary'}>
                            {app.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Data da Candidatura:</span>
                            <p>{app.date}</p>
                          </div>
                          <div>
                            <span className="font-medium">Data do Exame:</span>
                            <p>{app.examDate}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar Comprovativo
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="institutions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instituições Favoritas</CardTitle>
                  <CardDescription>Instituições que você segue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteInstitutions.map((institution) => (
                      <div key={institution.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{institution.name}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{institution.type} • {institution.province}</span>
                          <span>{institution.followers} seguidores</span>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline">Ver Perfil</Button>
                          <Button size="sm" variant="outline">Deixar de Seguir</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Documentos</CardTitle>
                  <CardDescription>Documentos pessoais e acadêmicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Bilhete de Identidade</h4>
                          <p className="text-sm text-gray-600">Documento oficial de identificação</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Certificado do Ensino Médio</h4>
                          <p className="text-sm text-gray-600">Certificado de conclusão</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Suas notificações recentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="mt-1">
                          {notification.type === 'exam' ? (
                            <Trophy className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default StudentDashboard;
