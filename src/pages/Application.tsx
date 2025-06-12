
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, Upload, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const Application = () => {
  const { institutionId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    course: '',
    period: '',
    documents: null
  });

  const courses = [
    'Medicina', 'Engenharia Civil', 'Direito', 'Economia', 
    'Informática', 'Arquitectura', 'Psicologia'
  ];

  const periods = ['Manhã', 'Tarde', 'Noite'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Mostrar comprovativo de pré-inscrição
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Candidatura Online
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                Universidade Agostinho Neto
              </Badge>
              <Badge variant="outline">
                Ensino Superior
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dados Pessoais
                  </CardTitle>
                  <CardDescription>
                    Preencha todos os campos obrigatórios
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome *</label>
                        <Input
                          placeholder="Primeiro nome"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Apelido *</label>
                        <Input
                          placeholder="Último nome"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail *</label>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Telefone *</label>
                        <Input
                          type="tel"
                          placeholder="+244 xxx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data de Nascimento *</label>
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Curso Pretendido *</label>
                        <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Período *</label>
                        <Select value={formData.period} onValueChange={(value) => handleInputChange('period', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar período" />
                          </SelectTrigger>
                          <SelectContent>
                            {periods.map((period) => (
                              <SelectItem key={period} value={period}>
                                {period}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Documentos (opcional)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Arraste os documentos aqui ou clique para seleccionar
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          Seleccionar Ficheiros
                        </Button>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Importante:</h4>
                      <p className="text-sm text-amber-700">
                        Esta é apenas uma pré-inscrição. Para validar sua candidatura, 
                        é necessário efectuar o pagamento presencialmente na instituição.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                    >
                      Submeter Candidatura
                    </Button>
                  </CardContent>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Informações do Curso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Duração</h4>
                    <p>5 anos</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Modalidade</h4>
                    <p>Presencial</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Propina Mensal</h4>
                    <p className="text-2xl font-bold text-blue-600">45.000 KZ</p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents Required */}
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Necessários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Certificado do 12º ano
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Bilhete de identidade
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Atestado médico
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      2 fotografias 3x4
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-4">
                    * Documentos originais devem ser apresentados presencialmente
                  </p>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-sm space-y-2">
                    <li className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                      <span>Submeter candidatura online</span>
                    </li>
                    <li className="flex">
                      <span className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                      <span>Baixar comprovativo</span>
                    </li>
                    <li className="flex">
                      <span className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                      <span>Efectuar pagamento presencial</span>
                    </li>
                    <li className="flex">
                      <span className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                      <span>Aguardar confirmação</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Application;
