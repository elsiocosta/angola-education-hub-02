
import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Clock, Heart, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Institution = () => {
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const institution = {
    id: 1,
    name: "Universidade Agostinho Neto",
    type: "Ensino Superior",
    province: "Luanda",
    description: "A Universidade Agostinho Neto é a principal universidade de Angola, fundada em 1962. Oferece cursos em diversas áreas do conhecimento com foco na excelência académica e formação integral dos estudantes.",
    followers: 15420,
    tuition: "45.000 KZ",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    director: "Prof. Dr. João Silva",
    founded: 1962,
    schedule: "07:00 - 22:00",
    shifts: ["Manhã", "Tarde", "Noite"],
    courses: [
      "Medicina", "Engenharia Civil", "Direito", "Economia", 
      "Informática", "Arquitectura", "Psicologia"
    ],
    coordinators: [
      { name: "Dr. Maria Santos", course: "Medicina", contact: "maria.santos@uan.ao" },
      { name: "Eng. Pedro Costa", course: "Engenharia Civil", contact: "pedro.costa@uan.ao" },
      { name: "Dr. Ana Ferreira", course: "Direito", contact: "ana.ferreira@uan.ao" }
    ]
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative mb-8">
            <img 
              src={institution.image} 
              alt={institution.name}
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-end">
              <div className="p-8 text-white">
                <Badge className="mb-4 bg-white/20 text-white">
                  {institution.type}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{institution.name}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {institution.province}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {institution.followers} seguidores
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="h-5 w-5 mr-2" />
                    Vídeo Institucional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600">Vídeo de Apresentação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Instituição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{institution.description}</p>
                </CardContent>
              </Card>

              {/* Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Cursos Oferecidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {institution.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="p-2 justify-center">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coordinators */}
              <Card>
                <CardHeader>
                  <CardTitle>Coordenadores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {institution.coordinators.map((coordinator, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{coordinator.name}</h4>
                        <p className="text-sm text-gray-600">{coordinator.course}</p>
                      </div>
                      <p className="text-sm text-blue-600">{coordinator.contact}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                    <Heart className="h-4 w-4 mr-2" />
                    Seguir Instituição
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Link to={`/application/${institution.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Candidatar-se
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Institution Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Director</h4>
                    <p>{institution.director}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Fundada em</h4>
                    <p>{institution.founded}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Horário</h4>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <p>{institution.schedule}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Turnos</h4>
                    <div className="space-y-1">
                      {institution.shifts.map((shift, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {shift}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Propina</h4>
                    <p className="text-2xl font-bold text-blue-600">{institution.tuition}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Localização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Mapa da Localização</p>
                    </div>
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

export default Institution;
