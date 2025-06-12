
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star, Play, ExternalLink } from 'lucide-react';

const FeaturedInstitutions = () => {
  const institutions = [
    {
      id: 1,
      name: "Universidade Agostinho Neto",
      type: "Ensino Superior",
      location: "Luanda",
      rating: 4.8,
      students: "45.000+",
      image: "/placeholder.svg",
      description: "A maior universidade pública de Angola, oferecendo cursos em diversas áreas do conhecimento.",
      courses: ["Medicina", "Engenharia", "Direito", "Economia"],
      tuition: "Gratuito",
      featured: true
    },
    {
      id: 2,
      name: "Colégio São José",
      type: "Ensino Secundário",
      location: "Benguela",
      rating: 4.6,
      students: "1.200+",
      image: "/placeholder.svg",
      description: "Instituição de ensino secundário com excelência acadêmica e infraestrutura moderna.",
      courses: ["Ciências", "Letras", "Matemática"],
      tuition: "25.000 KZ/mês"
    },
    {
      id: 3,
      name: "Instituto Superior Politécnico",
      type: "Ensino Superior",
      location: "Huambo",
      rating: 4.7,
      students: "3.500+",
      image: "/placeholder.svg",
      description: "Formação técnica superior com foco em tecnologia e inovação.",
      courses: ["Informática", "Electrotecnia", "Construção Civil"],
      tuition: "45.000 KZ/mês"
    },
    {
      id: 4,
      name: "Escola Primária do Futuro",
      type: "Ensino Primário",
      location: "Cabinda",
      rating: 4.9,
      students: "800+",
      image: "/placeholder.svg",
      description: "Ensino primário com metodologias modernas e ambiente acolhedor.",
      courses: ["1ª à 6ª Classe"],
      tuition: "15.000 KZ/mês"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ensino Superior': return 'bg-purple-100 text-purple-800';
      case 'Ensino Secundário': return 'bg-green-100 text-green-800';
      case 'Ensino Primário': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Instituições em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça algumas das melhores instituições de ensino registradas na nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {institutions.map((institution) => (
            <Card key={institution.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${institution.featured ? 'ring-2 ring-blue-500' : ''}`}>
              {institution.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-blue-600 text-white">Em Destaque</Badge>
                </div>
              )}
              
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">Vídeo Institucional</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                      {institution.name}
                    </CardTitle>
                    <div className="flex items-center mt-2 space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{institution.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <Badge className={getTypeColor(institution.type)}>
                    {institution.type}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {institution.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="py-3">
                <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4">
                  {institution.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Estudantes:</span>
                    <span className="font-medium text-gray-700">{institution.students}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Propina:</span>
                    <span className="font-medium text-gray-700">{institution.tuition}</span>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 block mb-2">Cursos:</span>
                    <div className="flex flex-wrap gap-1">
                      {institution.courses.slice(0, 2).map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {institution.courses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{institution.courses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            Ver Todas as Instituições
            <ExternalLink className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInstitutions;
