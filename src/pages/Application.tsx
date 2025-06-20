
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download, Upload, User, GraduationCap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';
import { useInstitutions } from '@/hooks/useInstitutions';
import { useCourses } from '@/hooks/useCourses';
import { useCreateApplication } from '@/hooks/useApplications';
import { useAuth } from '@/hooks/useAuth';

const Application = () => {
  const { institutionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: institutions = [] } = useInstitutions();
  const { data: courses = [] } = useCourses(institutionId);
  const createApplication = useCreateApplication();

  const institution = institutions.find(inst => inst.id === institutionId);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    birthDate: '',
    course: '',
    documents: null
  });

  const availableCourses = courses.filter(course => 
    course.level === 'university' || course.level === 'technical'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !institutionId) return;

    try {
      await createApplication.mutateAsync({
        student_id: user.id,
        institution_id: institutionId,
        course_id: formData.course || undefined,
        personal_data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate
        },
        documents: []
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Por favor, faça login para submeter uma candidatura.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (!institution) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Instituição não encontrada.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardContent className="pt-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Candidatura Submetida com Sucesso!
              </h1>
              <p className="text-gray-600 mb-6">
                Sua candidatura para <strong>{institution.name}</strong> foi submetida. 
                Você receberá uma confirmação por email e será notificado sobre o status da sua candidatura.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/dashboard/student')} 
                  className="w-full"
                >
                  Ver Minhas Candidaturas
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/search')}
                  className="w-full"
                >
                  Explorar Outras Instituições
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

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
                {institution.name}
              </Badge>
              <Badge variant="outline">
                {institution.institution_type === 'university' ? 'Ensino Superior' : 'Ensino Técnico'}
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

                    {availableCourses.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Curso Pretendido</label>
                        <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCourses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

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
                      disabled={createApplication.isPending}
                    >
                      {createApplication.isPending ? 'Submetendo...' : 'Submeter Candidatura'}
                    </Button>
                  </CardContent>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Institution Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Sobre a Instituição
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Localização</h4>
                    <p>{institution.province}</p>
                    {institution.municipality && <p>{institution.municipality}</p>}
                  </div>
                  {institution.phone && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Telefone</h4>
                      <p>{institution.phone}</p>
                    </div>
                  )}
                  {institution.email && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Email</h4>
                      <p>{institution.email}</p>
                    </div>
                  )}
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
                      <span>Receber confirmação por email</span>
                    </li>
                    <li className="flex">
                      <span className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                      <span>Efectuar pagamento presencial</span>
                    </li>
                    <li className="flex">
                      <span className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                      <span>Aguardar confirmação final</span>
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
