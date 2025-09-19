import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    document.title = 'Descobrir Instituições | Ango Education';
  }, []);

  // Mock data - em produção virá do Supabase
  const institutions = [
    {
      id: 1,
      name: 'Universidade Agostinho Neto',
      type: 'Universidade',
      province: 'Luanda',
      students: '45,000+',
      rating: 4.8,
      courses: ['Engenharia', 'Medicina', 'Direito', 'Economia'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Instituto Politécnico de Luanda',
      type: 'Instituto Técnico',
      province: 'Luanda',
      students: '12,000+',
      rating: 4.6,
      courses: ['Informática', 'Eletrotecnia', 'Gestão'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Universidade Católica de Angola',
      type: 'Universidade',
      province: 'Luanda',
      students: '8,000+',
      rating: 4.7,
      courses: ['Teologia', 'Filosofia', 'Educação'],
      image: '/placeholder.svg'
    }
  ];

  const provinces = [
    'Luanda', 'Benguela', 'Huambo', 'Lobito', 'Cabinda', 'Huíla', 'Uíge', 'Malanje'
  ];

  const institutionTypes = [
    'Universidade', 'Instituto Técnico', 'Escola Secundária', 'Instituto Superior'
  ];

  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProvince = selectedProvince === 'all' || institution.province === selectedProvince;
    const matchesType = selectedType === 'all' || institution.type === selectedType;
    
    return matchesSearch && matchesProvince && matchesType;
  });

  return (
    <Layout>
      <main className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Descobrir Instituições</h1>
          <p className="text-muted-foreground">Encontre a instituição ideal para sua jornada educacional</p>
        </header>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Instituições
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nome ou curso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger>
                <SelectValue placeholder="Província" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Províncias</SelectItem>
                {provinces.map(province => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Ensino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                {institutionTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutions.map(institution => (
          <Card key={institution.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <img 
                  src={institution.image} 
                  alt={institution.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">{institution.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {institution.province}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {institution.students}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {institution.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Badge variant="secondary">{institution.type}</Badge>
                
                <div>
                  <p className="text-sm font-medium mb-2">Cursos Destacados:</p>
                  <div className="flex flex-wrap gap-1">
                    {institution.courses.slice(0, 3).map(course => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {institution.courses.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{institution.courses.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/institution/${institution.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">Ver Detalhes</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Candidatar-se</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma instituição encontrada com os filtros selecionados.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedProvince('all');
                setSelectedType('all');
              }}
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
      </main>
    </Layout>
  );
};

export default Discover;