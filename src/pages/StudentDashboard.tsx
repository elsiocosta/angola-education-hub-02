
import React from 'react';
import { BookOpen, Calendar, FileText, MessageSquare, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: applications = [], isLoading } = useApplications({ studentId: user?.id });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'waiting_list': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      case 'waiting_list': return 'Lista de Espera';
      default: return 'Pendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waiting_list': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Por favor, faça login para acessar seu dashboard.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard do Estudante
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta, {user.user_metadata?.name || user.email}
          </p>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
            <TabsTrigger value="institutions">Instituições</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
                      <p className="text-sm text-gray-600">Total de Candidaturas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {applications.filter(app => app.status === 'approved').length}
                      </p>
                      <p className="text-sm text-gray-600">Aprovadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {applications.filter(app => app.status === 'pending').length}
                      </p>
                      <p className="text-sm text-gray-600">Pendentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Minhas Candidaturas</CardTitle>
                <CardDescription>
                  Acompanhe o status das suas candidaturas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Carregando candidaturas...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nenhuma candidatura encontrada
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Você ainda não submeteu nenhuma candidatura.
                    </p>
                    <Button onClick={() => window.location.href = '/search'}>
                      Explorar Instituições
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{application.institution?.name}</h3>
                            {application.course && (
                              <p className="text-gray-600">{application.course.name}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(application.status)}
                              <span>{getStatusName(application.status)}</span>
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Nome:</span>
                            <p>{application.personal_data.firstName} {application.personal_data.lastName}</p>
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>
                            <p>{application.personal_data.email}</p>
                          </div>
                          <div>
                            <span className="font-medium">Submetida em:</span>
                            <p>{formatDate(application.submitted_at!)}</p>
                          </div>
                          {application.reviewed_at && (
                            <div>
                              <span className="font-medium">Revisada em:</span>
                              <p>{formatDate(application.reviewed_at)}</p>
                            </div>
                          )}
                        </div>

                        {application.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded">
                            <span className="font-medium text-sm">Observações:</span>
                            <p className="text-sm text-gray-700 mt-1">{application.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutions">
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Explore Instituições
                </h3>
                <p className="text-gray-600 mb-4">
                  Descubra as melhores instituições de ensino em Angola.
                </p>
                <Button onClick={() => window.location.href = '/search'}>
                  Pesquisar Instituições
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Centro de Mensagens
                </h3>
                <p className="text-gray-600 mb-4">
                  Comunique-se diretamente com as instituições.
                </p>
                <Button onClick={() => window.location.href = '/messages'}>
                  Ver Mensagens
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome</label>
                  <p className="text-gray-900">{user.user_metadata?.name || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Membro desde</label>
                  <p className="text-gray-900">{formatDate(user.created_at)}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
