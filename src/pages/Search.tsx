
import React, { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const provinces = [
    'Luanda', 'Benguela', 'Huíla', 'Uíge', 'Cabinda', 'Quando Cubango',
    'Cuanza Norte', 'Cuanza Sul', 'Malanje', 'Lunda Norte', 'Lunda Sul',
    'Moxico', 'Cunene', 'Namibe', 'Huambo', 'Bié', 'Zaire', 'Bengo'
  ];

  const educationLevels = [
    'Ensino Primário',
    'Ensino Secundário', 
    'Ensino Médio Técnico',
    'Ensino Superior'
  ];

  const mockInstitutions = [
    {
      id: 1,
      name: "Universidade Agostinho Neto",
      type: "Ensino Superior",
      province: "Luanda",
      description: "Principal universidade de Angola, oferecendo cursos em diversas áreas.",
      followers: 15420,
      tuition: "45.000 KZ",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Escola Secundária Mutu ya Kevela",
      type: "Ensino Secundário",
      province: "Luanda",
      description: "Escola secundária de referência em Luanda com excelente ensino.",
      followers: 3240,
      tuition: "12.000 KZ",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Instituto Médio Técnico de Benguela",
      type: "Ensino Médio Técnico",
      province: "Benguela",
      description: "Formação técnica profissional de qualidade.",
      followers: 1890,
      tuition: "18.000 KZ",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pesquisar Instituições
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre a instituição de ensino ideal em Angola
            </p>
          </div>

          {/* Search Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Nome da instituição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                />
              </div>
              
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                  <SelectValue placeholder="Província" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                  <SelectValue placeholder="Nível de Ensino" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <SearchIcon className="h-5 w-5 mr-2" />
                Pesquisar
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Mapa das Instituições</h3>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Mapa Interativo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutions List */}
            <div className="lg:col-span-2 space-y-6">
              {mockInstitutions.map((institution) => (
                <Card key={institution.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img 
                      src={institution.image} 
                      alt={institution.name}
                      className="w-48 h-32 object-cover rounded-l-lg"
                    />
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-2">{institution.name}</CardTitle>
                            <Badge variant="secondary" className="mb-2">
                              {institution.type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{institution.followers} seguidores</p>
                            <p className="font-semibold text-blue-600">{institution.tuition}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{institution.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{institution.province}</span>
                          </div>
                          <Link to={`/institution/${institution.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
