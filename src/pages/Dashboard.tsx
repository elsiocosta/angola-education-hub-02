
import React from 'react';
import { BarChart3, Users, Eye, Heart, Settings, FileText, Video, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const stats = [
    { label: 'Seguidores', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Visualizações', value: '45,678', icon: Eye, color: 'text-green-600' },
    { label: 'Curtidas', value: '890', icon: Heart, color: 'text-red-600' },
    { label: 'Publicações', value: '23', icon: FileText, color: 'text-purple-600' }
  ];

  const recentActivities = [
    { type: 'follow', text: 'João Silva começou a seguir sua instituição', time: '2h' },
    { type: 'like', text: 'Maria Santos curtiu sua publicação', time: '4h' },
    { type: 'comment', text: 'Pedro Costa comentou no seu vídeo', time: '6h' },
    { type: 'application', text: 'Nova candidatura recebida', time: '8h' }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel da Instituição</h1>
              <p className="text-gray-600">Universidade Agostinho Neto</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Acções Rápidas</CardTitle>
                  <CardDescription>Gerir o perfil da sua instituição</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs">Nova Publicação</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Video className="h-6 w-6 mb-2" />
                    <span className="text-xs">Atualizar Vídeo</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-xs">Calendário</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-xs">Gerir Equipa</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Publicações Recentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Inscrições Abertas para 2024</h4>
                      <Badge variant="secondary">3 dias</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Estão abertas as inscrições para o ano lectivo 2024...
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" /> 45 curtidas
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" /> 12 comentários
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Novo Laboratório de Informática</h4>
                      <Badge variant="secondary">1 semana</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Inauguramos nosso novo laboratório com 30 computadores...
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" /> 128 curtidas
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" /> 23 comentários
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status da Conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Plano Actual</span>
                      <Badge className="bg-green-100 text-green-800">Ensino Superior</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mensalidade</span>
                      <span className="font-semibold">35.000 KZ</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Próximo Pagamento</span>
                      <span className="text-sm text-gray-600">15/01/2024</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <p className="text-sm text-gray-700 flex-1">{activity.text}</p>
                        <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600 text-sm">Gráfico de Performance</p>
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

export default Dashboard;
