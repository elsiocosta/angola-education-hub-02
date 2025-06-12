
import React from 'react';
import { ArrowLeft, Download, Printer, Share2, Calendar, TrendingUp, Users, Building, DollarSign, BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Report = () => {
  const currentDate = new Date().toLocaleDateString('pt-AO');
  
  const generalInfo = {
    name: 'Ango Education',
    description: 'A rede digital oficial do ensino angolano',
    url: 'https://angoeducation.ao',
    version: 'MVP v1.0',
    startDate: '2024-01-01',
    launchDate: '2024-02-15'
  };

  const currentMetrics = {
    institutions: '1.247',
    activeUsers: '15.430',
    monthlyRevenue: '18.5M KZ',
    applications: '892'
  };

  const institutionsByType = [
    { type: 'Ensino Primário', count: 523, percentage: 42 },
    { type: 'Ensino Secundário', count: 387, percentage: 31 },
    { type: 'Ensino Médio Técnico', count: 198, percentage: 16 },
    { type: 'Ensino Superior', count: 139, percentage: 11 }
  ];

  const recentPayments = [
    { institution: 'Universidade Agostinho Neto', amount: '35.000 KZ', status: 'Pago', date: '2024-01-15', type: 'Superior' },
    { institution: 'ISPTEC', amount: '35.000 KZ', status: 'Pendente', date: '2024-01-14', type: 'Superior' },
    { institution: 'Escola Mutu ya Kevela', amount: '15.000 KZ', status: 'Pago', date: '2024-01-13', type: 'Secundário' },
    { institution: 'Instituto Médio de Economia', amount: '20.000 KZ', status: 'Pago', date: '2024-01-12', type: 'Médio Técnico' },
    { institution: 'Escola Primária do Kilamba', amount: '10.000 KZ', status: 'Pendente', date: '2024-01-11', type: 'Primário' }
  ];

  const pendingApprovals = [
    { name: 'Escola Secundária de Cabinda', type: 'Ensino Secundário', date: '2024-01-10', status: 'pending' },
    { name: 'Instituto Superior de Benguela', type: 'Ensino Superior', date: '2024-01-09', status: 'pending' },
    { name: 'Escola Primária do Uíge', type: 'Ensino Primário', date: '2024-01-08', status: 'pending' }
  ];

  const userRoles = [
    { role: 'Visitante', description: 'Acesso público para explorar instituições', permissions: ['Pesquisar', 'Seguir', 'Curtir'] },
    { role: 'Aluno', description: 'Acesso por convite institucional', permissions: ['Candidatar-se', 'Comentar', 'Feedback'] },
    { role: 'Professor', description: 'Membro da equipe educacional', permissions: ['Criar posts', 'Ver seguidores', 'Comentar'] },
    { role: 'Secretária', description: 'Gestão administrativa', permissions: ['Ver candidaturas', 'Gerir documentos', 'Atualizar horários'] },
    { role: 'Diretor', description: 'Liderança institucional', permissions: ['Ver alunos', 'Comunicados', 'Estatísticas'] },
    { role: 'Coordenador', description: 'Gestão de cursos', permissions: ['Gerir cursos', 'Calendário', 'Responder perguntas'] },
    { role: 'Admin Institucional', description: 'Gestão completa da instituição', permissions: ['Editar perfil', 'Gerir equipe', 'Publicar'] },
    { role: 'Admin da Plataforma', description: 'Controle total do sistema', permissions: ['Aprovar instituições', 'Métricas', 'Suporte'] }
  ];

  const functionalFeatures = [
    { feature: 'Sistema de Cadastro Público e Interno', status: 'Implementado', description: 'Registro para visitantes e sistema de convites' },
    { feature: 'Gestão de Equipe com Permissões', status: 'Implementado', description: 'Interface para adicionar membros com diferentes cargos' },
    { feature: 'Painel Administrativo', status: 'Implementado', description: 'Dashboard para aprovação e gestão da plataforma' },
    { feature: 'Sistema de Pagamentos', status: 'Em Desenvolvimento', description: 'Integração com Multicaixa Express' },
    { feature: 'Mapa Interativo', status: 'Planejado', description: 'Localização geográfica das instituições' },
    { feature: 'Rede Social Educacional', status: 'Planejado', description: 'Posts, curtidas e comentários' }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Relatório Completo da Plataforma</h1>
                <p className="text-gray-600">Gerado em {currentDate}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partilhar
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* 1. Informações Gerais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  1. Informações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Nome da Plataforma:</span>
                      <p className="text-lg font-semibold">{generalInfo.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Descrição:</span>
                      <p>{generalInfo.description}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">URL:</span>
                      <p className="text-blue-600">{generalInfo.url}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Versão do Sistema:</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">{generalInfo.version}</Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data de Início:</span>
                      <p>{generalInfo.startDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Lançamento Previsto:</span>
                      <p>{generalInfo.launchDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Resumo Executivo */}
            <Card>
              <CardHeader>
                <CardTitle>2. Resumo Executivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Propósito Principal</h4>
                  <p className="text-gray-700">Modernizar a presença digital das instituições de ensino angolanas, facilitando a descoberta, comparação e candidatura a cursos em todo o país.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Problemas que Resolve</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Falta de visibilidade das instituições de ensino</li>
                    <li>Dificuldade na localização e comparação de escolas</li>
                    <li>Processo burocrático de candidaturas</li>
                    <li>Comunicação ineficiente entre instituições e estudantes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Diferencial Competitivo</h4>
                  <p className="text-gray-700">Primeira plataforma angolana a centralizar todas as instituições de ensino em um só lugar, com sistema de geolocalização, perfis institucionais completos e processo de candidatura digital.</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. Métricas Atuais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  3. Métricas Atuais do Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Building className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{currentMetrics.institutions}</p>
                    <p className="text-sm text-gray-600">Instituições Registadas</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-green-600">{currentMetrics.activeUsers}</p>
                    <p className="text-sm text-gray-600">Usuários Ativos</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{currentMetrics.monthlyRevenue}</p>
                    <p className="text-sm text-gray-600">Receita Mensal</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <p className="text-2xl font-bold text-orange-600">{currentMetrics.applications}</p>
                    <p className="text-sm text-gray-600">Candidaturas</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Distribuição por Tipo de Ensino</h4>
                    <div className="space-y-2">
                      {institutionsByType.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{item.type}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.count}</span>
                            <span className="text-xs text-gray-500">({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Aprovações Pendentes</h4>
                    <div className="space-y-2">
                      {pendingApprovals.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500">{item.type}</p>
                          </div>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Funcionalidades Implementadas */}
            <Card>
              <CardHeader>
                <CardTitle>4. Funcionalidades Implementadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {functionalFeatures.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {item.status === 'Implementado' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {item.status === 'Em Desenvolvimento' && <Clock className="h-5 w-5 text-yellow-600" />}
                        {item.status === 'Planejado' && <AlertTriangle className="h-5 w-5 text-gray-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{item.feature}</h4>
                          <Badge 
                            variant={item.status === 'Implementado' ? 'default' : 'secondary'}
                            className={
                              item.status === 'Implementado' ? 'bg-green-100 text-green-800' :
                              item.status === 'Em Desenvolvimento' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Perfis de Acesso */}
            <Card>
              <CardHeader>
                <CardTitle>5. Perfis de Acesso e Permissões</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Principais Permissões</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userRoles.map((role, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{role.role}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 6. Transações Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>6. Transações e Pagamentos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instituição</TableHead>
                      <TableHead>Tipo de Ensino</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{payment.institution}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <Badge 
                            className={payment.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
