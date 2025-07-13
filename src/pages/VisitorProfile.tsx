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
  Heart,
  Eye,
  BookOpen,
  School
} from 'lucide-react';

const VisitorProfile = () => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: '',
    address: '',
    bio: '',
    interests: []
  });

  const followedInstitutions = [
    { id: 1, name: "Universidade Agostinho Neto", type: "Universidade", followers: 2340 },
    { id: 2, name: "Instituto Superior Politécnico", type: "Instituto", followers: 1580 },
    { id: 3, name: "Escola Internacional de Luanda", type: "Escola", followers: 890 }
  ];

  const recentActivity = [
    { id: 1, action: "Seguiu", target: "Universidade Técnica de Angola", date: "2024-01-15" },
    { id: 2, action: "Curtiu post", target: "Instituto Superior Politécnico", date: "2024-01-14" },
    { id: 3, action: "Visualizou", target: "Curso de Medicina - UAN", date: "2024-01-13" }
  ];

  const interests = [
    "Tecnologia", "Medicina", "Engenharia", "Direito", "Economia", "Ciências"
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
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
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
                    {userProfile?.role || 'Visitante'}
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
                      placeholder="Conte um pouco sobre você, seus interesses..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio || 'Não informado'}</p>
                  )}
                </div>
              </div>

              {/* Interesses */}
              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Áreas de Interesse
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50">
                      {interest}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 border-dashed">
                      + Adicionar
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Suas últimas interações na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="mt-1">
                      {activity.action === 'Seguiu' && <Heart className="h-4 w-4 text-red-500" />}
                      {activity.action === 'Curtiu post' && <Heart className="h-4 w-4 text-red-500" />}
                      {activity.action === 'Visualizou' && <Eye className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('pt-AO')}
                      </p>
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
                <User className="h-5 w-5 mr-2" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Instituições seguidas:</span>
                <span className="font-medium">{followedInstitutions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posts curtidos:</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cursos visualizados:</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Membro desde:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Instituições Seguidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <School className="h-5 w-5 mr-2" />
                Instituições Seguidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {followedInstitutions.map((institution) => (
                  <div key={institution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={institution.name} />
                        <AvatarFallback className="text-xs">
                          {institution.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-medium">{institution.name}</h4>
                        <p className="text-xs text-gray-600">{institution.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{institution.followers} seguidores</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Ver Todas
              </Button>
            </CardContent>
          </Card>

          {/* Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900">Complete seu perfil</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Adicione mais informações para receber recomendações personalizadas
                  </p>
                  <Button size="sm" className="mt-2 w-full">Completar</Button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900">Explore novos cursos</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Baseado nos seus interesses, temos sugestões para você
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">Ver Sugestões</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisitorProfile;