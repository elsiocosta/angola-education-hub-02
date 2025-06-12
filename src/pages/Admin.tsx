
import React from 'react';
import { Users, Building, BarChart3, DollarSign, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Admin = () => {
  const stats = [
    { label: 'Instituições Totais', value: '1,247', icon: Building, color: 'text-blue-600' },
    { label: 'Usuários Activos', value: '15,430', icon: Users, color: 'text-green-600' },
    { label: 'Receita Mensal', value: '18.5M KZ', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Candidaturas', value: '892', icon: BarChart3, color: 'text-orange-600' }
  ];

  const pendingInstitutions = [
    { name: 'Escola Secundária de Cabinda', type: 'Ensino Secundário', date: '2024-01-10' },
    { name: 'Instituto Superior de Benguela', type: 'Ensino Superior', date: '2024-01-09' },
    { name: 'Escola Primária do Uíge', type: 'Ensino Primário', date: '2024-01-08' }
  ];

  const recentPayments = [
    { institution: 'Universidade Agostinho Neto', amount: '35.000 KZ', status: 'Pago', date: '2024-01-15' },
    { institution: 'ISPTEC', amount: '35.000 KZ', status: 'Pendente', date: '2024-01-14' },
    { institution: 'Escola Mutu ya Kevela', amount: '15.000 KZ', status: 'Pago', date: '2024-01-13' }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
              <p className="text-gray-600">Gestão da plataforma Ango Education</p>
            </div>
            <Link to="/report">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                <FileText className="h-4 w-4 mr-2" />
                Relatório Completo
              </Button>
            </Link>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Aprovações Pendentes
                </CardTitle>
                <CardDescription>
                  Instituições aguardando aprovação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingInstitutions.map((institution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{institution.name}</h4>
                      <p className="text-sm text-gray-600">{institution.type}</p>
                      <p className="text-xs text-gray-500">Submetido em {institution.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-red-600">
                        Rejeitar
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Aprovar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Pagamentos Recentes
                </CardTitle>
                <CardDescription>
                  Últimas transações de mensalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{payment.institution}</h4>
                      <p className="text-sm text-gray-600">{payment.amount}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                    <Badge 
                      variant={payment.status === 'Pago' ? 'default' : 'secondary'}
                      className={payment.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platform Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Métricas da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Taxa de Aprovação</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Crescimento Mensal</span>
                    <span className="font-semibold text-blue-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Retenção de Clientes</span>
                    <span className="font-semibold text-purple-600">87.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Satisfação Média</span>
                    <span className="font-semibold text-orange-600">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Estado do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Servidor Principal</span>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base de Dados</span>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operacional</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Serviço de E-mail</span>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Funcional</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Automático</span>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Activo</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
