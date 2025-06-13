
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Plus, 
  Edit, 
  Users, 
  Clock, 
  DollarSign,
  BookOpen,
  Calendar,
  User,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');
  const [newCourse, setNewCourse] = useState({
    name: '',
    coordinator: '',
    duration: '',
    fee: '',
    description: '',
    requirements: '',
    schedule: ''
  });

  const courses = [
    {
      id: 1,
      name: 'Engenharia Informática',
      coordinator: 'Prof. Carlos Mendes',
      coordinatorEmail: 'carlos.mendes@uan.ao',
      students: 245,
      duration: '5 anos',
      fee: '45.000 KZ',
      status: 'Ativo',
      turmas: 8,
      description: 'Curso focado no desenvolvimento de software e sistemas computacionais.',
      requirements: 'Ensino Médio completo, Matemática e Física',
      schedule: 'Manhã e Tarde'
    },
    {
      id: 2,
      name: 'Medicina',
      coordinator: 'Dr. Isabel Rodrigues',
      coordinatorEmail: 'isabel.rodrigues@uan.ao',
      students: 189,
      duration: '6 anos',
      fee: '65.000 KZ',
      status: 'Ativo',
      turmas: 6,
      description: 'Formação médica completa com estágios práticos.',
      requirements: 'Ensino Médio completo, Biologia, Química e Física',
      schedule: 'Manhã e Tarde'
    },
    {
      id: 3,
      name: 'Administração de Empresas',
      coordinator: 'Prof. António Silva',
      coordinatorEmail: 'antonio.silva@uan.ao',
      students: 312,
      duration: '4 anos',
      fee: '35.000 KZ',
      status: 'Ativo',
      turmas: 10,
      description: 'Gestão empresarial e administração de recursos.',
      requirements: 'Ensino Médio completo, Matemática',
      schedule: 'Noite'
    }
  ];

  const turmas = [
    {
      id: 1,
      name: 'EI-1A',
      course: 'Engenharia Informática',
      year: '1º Ano',
      students: 35,
      professor: 'Prof. Maria Santos',
      schedule: 'Segunda a Sexta, 08:00-12:00',
      classroom: 'Lab A-201'
    },
    {
      id: 2,
      name: 'EI-1B',
      course: 'Engenharia Informática',
      year: '1º Ano',
      students: 32,
      professor: 'Prof. João Costa',
      schedule: 'Segunda a Sexta, 14:00-18:00',
      classroom: 'Lab A-202'
    },
    {
      id: 3,
      name: 'MED-3A',
      course: 'Medicina',
      year: '3º Ano',
      students: 28,
      professor: 'Dr. Paulo Mendes',
      schedule: 'Segunda a Sexta, 08:00-17:00',
      classroom: 'Anfiteatro B-101'
    }
  ];

  const handleCreateCourse = () => {
    if (!newCourse.name || !newCourse.coordinator || !newCourse.duration || !newCourse.fee) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Curso Criado",
      description: `Curso "${newCourse.name}" criado com sucesso.`,
    });

    // Reset form
    setNewCourse({
      name: '',
      coordinator: '',
      duration: '',
      fee: '',
      description: '',
      requirements: '',
      schedule: ''
    });
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestão de Cursos</h1>
            <p className="text-gray-600">Gerir cursos, turmas e coordenadores da instituição</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="turmas">Turmas</TabsTrigger>
              <TabsTrigger value="create">Criar Curso</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription className="flex items-center mt-2">
                            <User className="h-4 w-4 mr-1" />
                            {course.coordinator}
                          </CardDescription>
                        </div>
                        <Badge variant={course.status === 'Ativo' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{course.students} alunos</span>
                          </div>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-green-600" />
                            <span>{course.turmas} turmas</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-purple-600" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-orange-600" />
                            <span>{course.fee}</span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-600 mb-2">Descrição:</p>
                          <p className="text-sm">{course.description}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Horário:</p>
                          <p className="text-sm">{course.schedule}</p>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Users className="h-4 w-4 mr-1" />
                            Turmas
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="turmas" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Turmas Ativas</CardTitle>
                      <CardDescription>Gerir turmas por curso e ano</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Turma
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {turmas.map((turma) => (
                      <div key={turma.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{turma.name}</h3>
                            <p className="text-gray-600">{turma.course} - {turma.year}</p>
                            <p className="text-sm text-gray-500">Prof: {turma.professor}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">
                              {turma.students} alunos
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Horário:
                            </span>
                            <p>{turma.schedule}</p>
                          </div>
                          <div>
                            <span className="font-medium flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              Sala:
                            </span>
                            <p>{turma.classroom}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-1" />
                            Ver Alunos
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            Horários
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Criar Novo Curso
                  </CardTitle>
                  <CardDescription>Preencha as informações do novo curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="courseName">Nome do Curso *</Label>
                        <Input
                          id="courseName"
                          placeholder="Ex: Engenharia Civil"
                          value={newCourse.name}
                          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="coordinator">Coordenador *</Label>
                        <Input
                          id="coordinator"
                          placeholder="Ex: Prof. João Silva"
                          value={newCourse.coordinator}
                          onChange={(e) => setNewCourse({ ...newCourse, coordinator: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="duration">Duração *</Label>
                        <Input
                          id="duration"
                          placeholder="Ex: 4 anos"
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="fee">Propina Mensal *</Label>
                        <Input
                          id="fee"
                          placeholder="Ex: 35.000 KZ"
                          value={newCourse.fee}
                          onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="schedule">Horário</Label>
                        <Input
                          id="schedule"
                          placeholder="Ex: Manhã e Tarde"
                          value={newCourse.schedule}
                          onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="requirements">Pré-requisitos</Label>
                        <textarea
                          id="requirements"
                          className="w-full h-20 px-3 py-2 border border-input bg-background rounded-md"
                          placeholder="Ex: Ensino Médio completo, Matemática..."
                          value={newCourse.requirements}
                          onChange={(e) => setNewCourse({ ...newCourse, requirements: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <textarea
                          id="description"
                          className="w-full h-20 px-3 py-2 border border-input bg-background rounded-md"
                          placeholder="Descrição do curso..."
                          value={newCourse.description}
                          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <Button onClick={handleCreateCourse} className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Curso
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Cancelar
                    </Button>
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

export default CourseManagement;
