
import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse, Course } from '@/hooks/useCourses';
import { useInstitutions } from '@/hooks/useInstitutions';
import { useAuth } from '@/hooks/useAuth';

const CourseManagement = () => {
  const { user } = useAuth();
  const { data: institutions = [] } = useInstitutions();
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  
  // Filter institutions created by current user
  const userInstitutions = institutions.filter(inst => inst.created_by === user?.id);
  const institutionId = selectedInstitution || userInstitutions[0]?.id;
  
  const { data: courses = [], isLoading } = useCourses(institutionId);
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'university' as Course['level'],
    duration_years: '',
    tuition: '',
    requirements: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      level: 'university',
      duration_years: '',
      tuition: '',
      requirements: ''
    });
    setEditingCourse(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionId) return;

    const courseData = {
      ...formData,
      institution_id: institutionId,
      duration_years: formData.duration_years ? parseInt(formData.duration_years) : undefined,
      tuition: formData.tuition ? parseFloat(formData.tuition) : undefined
    };

    try {
      if (editingCourse) {
        await updateCourse.mutateAsync({ id: editingCourse.id, ...courseData });
      } else {
        await createCourse.mutateAsync(courseData);
      }
      resetForm();
      setIsCreateOpen(false);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({
      name: course.name,
      description: course.description || '',
      level: course.level,
      duration_years: course.duration_years?.toString() || '',
      tuition: course.tuition?.toString() || '',
      requirements: course.requirements || ''
    });
    setEditingCourse(course);
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este curso?')) {
      await deleteCourse.mutateAsync(id);
    }
  };

  const getLevelName = (level: string) => {
    const levels = {
      primary: 'Ensino Primário',
      secondary: 'Ensino Secundário',
      high_school: 'Ensino Médio',
      university: 'Universitário',
      technical: 'Técnico'
    };
    return levels[level as keyof typeof levels] || level;
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Por favor, faça login para acessar esta página.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestão de Cursos</h1>
          
          {userInstitutions.length > 1 && (
            <div className="mb-6">
              <Label htmlFor="institution">Seleccionar Instituição</Label>
              <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Seleccionar instituição" />
                </SelectTrigger>
                <SelectContent>
                  {userInstitutions.map((institution) => (
                    <SelectItem key={institution.id} value={institution.id}>
                      {institution.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} disabled={!institutionId}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Curso
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? 'Editar Curso' : 'Criar Novo Curso'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Curso *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">Nível *</Label>
                    <Select value={formData.level} onValueChange={(value: Course['level']) => setFormData({ ...formData, level: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Ensino Primário</SelectItem>
                        <SelectItem value="secondary">Ensino Secundário</SelectItem>
                        <SelectItem value="high_school">Ensino Médio</SelectItem>
                        <SelectItem value="university">Universitário</SelectItem>
                        <SelectItem value="technical">Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duração (anos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration_years}
                      onChange={(e) => setFormData({ ...formData, duration_years: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tuition">Propina (KZ)</Label>
                    <Input
                      id="tuition"
                      type="number"
                      step="0.01"
                      value={formData.tuition}
                      onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Requisitos</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createCourse.isPending || updateCourse.isPending}>
                    {editingCourse ? 'Atualizar' : 'Criar'} Curso
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {!institutionId ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                Nenhuma instituição encontrada. Crie uma instituição primeiro.
              </p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando cursos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="outline">{getLevelName(course.level)}</Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.description && (
                    <p className="text-gray-700 text-sm">{course.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    {course.duration_years && (
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{course.duration_years} {course.duration_years === 1 ? 'ano' : 'anos'}</span>
                      </div>
                    )}
                    {course.tuition && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{course.tuition.toLocaleString()} KZ/mês</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {courses.length === 0 && !isLoading && (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Comece criando o primeiro curso para sua instituição.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Curso
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CourseManagement;
