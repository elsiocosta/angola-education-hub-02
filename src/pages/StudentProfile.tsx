import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  Camera,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';

const StudentProfile = () => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: '',
    address: '',
    bio: '',
    education: '',
    interests: []
  });

  const achievements = [
    { id: 1, title: "Primeira Inscrição", description: "Completou sua primeira inscrição", date: "2024-01-15" },
    { id: 2, title: "Perfil Completo", description: "Preencheu todas as informações do perfil", date: "2024-01-20" }
  ];

  const courses = [
    { id: 1, name: "Matemática Avançada", institution: "UAN", status: "active", progress: 75 },
    { id: 2, name: "Programação Web", institution: "ISPTEC", status: "completed", progress: 100 }
  ];

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar as alterações
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e académicas</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Suas informações básicas e de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" alt={formData.name} />
                    <AvatarFallback className="text-lg">
                      {formData.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{formData.name || 'Nome não informado'}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {userProfile?.role || 'Estudante'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Nome Completo
                  </label>
                  {isEditing ? (
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    Telefone
                  </label>
                  {isEditing ? (
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+244 xxx xxx xxx"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.phone || 'Não informado'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Endereço
                  </label>
                  {isEditing ? (
                    <Input 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Província, Município, Bairro"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.address || 'Não informado'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Sobre mim
                  </label>
                  {isEditing ? (
                    <Textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Conte um pouco sobre você, seus objetivos académicos..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio || 'Não informado'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cursos Ativos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Cursos Ativos
              </CardTitle>
              <CardDescription>Cursos em que está inscrito</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-gray-600">{course.institution}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                        {course.status === 'completed' ? 'Concluído' : 'Em andamento'}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{course.progress}% completo</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Cursos ativos:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cursos concluídos:</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inscrições:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Membro desde:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Conquistas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString('pt-AO')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;