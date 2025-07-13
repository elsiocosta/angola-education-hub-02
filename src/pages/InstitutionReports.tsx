import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar as CalendarIcon,
  Filter
} from 'lucide-react';

const InstitutionReports = () => {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });

  // Dados para os gráficos
  const enrollmentData = [
    { month: 'Jan', students: 120, applications: 150 },
    { month: 'Fev', students: 145, applications: 175 },
    { month: 'Mar', students: 165, applications: 200 },
    { month: 'Abr', students: 180, applications: 195 },
    { month: 'Mai', students: 195, applications: 210 },
    { month: 'Jun', students: 210, applications: 225 }
  ];

  const courseDistribution = [
    { name: 'Engenharia Informática', value: 35, color: '#3B82F6' },
    { name: 'Medicina', value: 25, color: '#10B981' },
    { name: 'Direito', value: 20, color: '#F59E0B' },
    { name: 'Economia', value: 15, color: '#EF4444' },
    { name: 'Outros', value: 5, color: '#8B5CF6' }
  ];

  const performanceData = [
    { course: 'Eng. Informática', aprovacao: 87, media: 16.2 },
    { course: 'Medicina', aprovacao: 92, media: 17.8 },
    { course: 'Direito', aprovacao: 78, media: 15.1 },
    { course: 'Economia', aprovacao: 85, media: 16.5 }
  ];

  const monthlyStats = {
    totalStudents: 1234,
    newEnrollments: 45,
    completedCourses: 128,
    averageGrade: 16.4,
    retentionRate: 89.2,
    satisfactionRate: 94.1
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios Institucionais</h1>
          <p className="text-gray-600 mt-2">Análise completa do desempenho da sua instituição</p>
        </div>
        
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Período
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          
          <Button className="bg-gradient-to-r from-blue-600 to-green-600">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Estudantes</p>
                <p className="text-2xl font-bold">{monthlyStats.totalStudents.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+5.2%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Novas Matrículas</p>
                <p className="text-2xl font-bold">{monthlyStats.newEnrollments}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cursos Concluídos</p>
                <p className="text-2xl font-bold">{monthlyStats.completedCourses}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8.1%</span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média Geral</p>
                <p className="text-2xl font-bold">{monthlyStats.averageGrade}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+0.3</span>
                </div>
              </div>
              <div className="text-yellow-600 font-bold text-2xl">A</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa Retenção</p>
                <p className="text-2xl font-bold">{monthlyStats.retentionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfação</p>
                <p className="text-2xl font-bold">{monthlyStats.satisfactionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+1.8%</span>
                </div>
              </div>
              <div className="text-2xl">😊</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução de Matrículas */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Matrículas</CardTitle>
            <CardDescription>Comparação entre candidaturas e matrículas efetivas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#93C5FD" name="Candidaturas" />
                <Bar dataKey="students" fill="#3B82F6" name="Matrículas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Curso */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Curso</CardTitle>
            <CardDescription>Percentual de estudantes por área de estudo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Desempenho por Curso */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Académico por Curso</CardTitle>
          <CardDescription>Taxa de aprovação e média geral por curso</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="aprovacao" fill="#10B981" name="Taxa Aprovação (%)" />
              <Bar yAxisId="right" dataKey="media" fill="#3B82F6" name="Média Geral" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Relatórios Detalhados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Relatório de Estudantes</CardTitle>
            <CardDescription>Análise completa dos estudantes matriculados</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Dados demográficos</li>
              <li>• Histórico académico</li>
              <li>• Performance por período</li>
              <li>• Taxa de evasão</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Relatório Académico</CardTitle>
            <CardDescription>Desempenho e resultados por curso</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Médias por disciplina</li>
              <li>• Taxa de aprovação</li>
              <li>• Comparativo temporal</li>
              <li>• Indicadores de qualidade</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Relatório Financeiro</CardTitle>
            <CardDescription>Análise de receitas e despesas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Receitas de propinas</li>
              <li>• Custos operacionais</li>
              <li>• Projeções financeiras</li>
              <li>• ROI por curso</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionReports;