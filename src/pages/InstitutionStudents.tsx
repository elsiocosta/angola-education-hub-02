import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Filter,
  Download,
  UserPlus
} from 'lucide-react';

const InstitutionStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const students = [
    {
      id: 1,
      name: "Maria João Silva",
      email: "maria.silva@email.com",
      phone: "+244 923 456 789",
      course: "Engenharia Informática",
      year: "2º Ano",
      status: "active",
      enrollmentDate: "2023-02-15",
      lastActivity: "2024-01-15",
      grades: { average: 16.5, subjects: 8 }
    },
    {
      id: 2,
      name: "João Carlos Mendes",
      email: "joao.mendes@email.com",
      phone: "+244 924 567 890",
      course: "Medicina",
      year: "1º Ano",
      status: "active",
      enrollmentDate: "2024-01-10",
      lastActivity: "2024-01-14",
      grades: { average: 18.2, subjects: 6 }
    },
    {
      id: 3,
      name: "Ana Paula Costa",
      email: "ana.costa@email.com",
      phone: "+244 925 678 901",
      course: "Direito",
      year: "3º Ano",
      status: "suspended",
      enrollmentDate: "2022-02-20",
      lastActivity: "2023-12-20",
      grades: { average: 14.8, subjects: 10 }
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'suspended':
        return 'destructive';
      case 'graduated':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'suspended':
        return 'Suspenso';
      case 'graduated':
        return 'Graduado';
      default:
        return 'Inativo';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Estudantes</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os estudantes da sua instituição</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-green-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Estudante
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Estudantes</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estudantes Ativos</p>
                <p className="text-2xl font-bold">1,198</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Novos este mês</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <UserPlus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Aprovação</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <BookOpen className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar por nome, email ou curso..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                Todos
              </Button>
              <Button 
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
              >
                Ativos
              </Button>
              <Button 
                variant={filterStatus === 'suspended' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('suspended')}
              >
                Suspensos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Estudantes */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-lg">{student.name}</h3>
                      <Badge variant={getStatusVariant(student.status)}>
                        {getStatusLabel(student.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {student.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {student.phone}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {student.course} - {student.year}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Desde {new Date(student.enrollmentDate).toLocaleDateString('pt-AO')}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-4 text-sm">
                      <div className="bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-blue-700 font-medium">
                          Média: {student.grades.average}
                        </span>
                      </div>
                      <div className="bg-green-50 px-3 py-1 rounded-full">
                        <span className="text-green-700 font-medium">
                          {student.grades.subjects} disciplinas
                        </span>
                      </div>
                      <div className="text-gray-500">
                        Última atividade: {new Date(student.lastActivity).toLocaleDateString('pt-AO')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum estudante encontrado</h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca ou adicionar novos estudantes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstitutionStudents;