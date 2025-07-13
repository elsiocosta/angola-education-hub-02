import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  FileText, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  School,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Download
} from 'lucide-react';

const InstitutionApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const applications = [
    {
      id: 1,
      student: {
        name: "Carlos Alberto Santos",
        email: "carlos.santos@email.com",
        phone: "+244 923 456 789",
        birthDate: "1998-05-15"
      },
      course: "Engenharia Informática",
      appliedDate: "2024-01-15",
      status: "pending",
      documents: [
        { name: "Certificado de Habilitações", url: "#", verified: true },
        { name: "Bilhete de Identidade", url: "#", verified: true },
        { name: "Fotografia", url: "#", verified: true },
        { name: "Comprovativo de Residência", url: "#", verified: false }
      ],
      personalData: {
        address: "Luanda, Maianga, Rua A nº 123",
        previousEducation: "12ª Classe - Escola Secundária do Maianga",
        motivation: "Tenho grande interesse na área de tecnologia e quero contribuir para o desenvolvimento tecnológico de Angola."
      },
      deadline: "2024-02-15",
      notes: ""
    },
    {
      id: 2,
      student: {
        name: "Maria Fernanda Oliveira",
        email: "maria.oliveira@email.com",
        phone: "+244 924 567 890",
        birthDate: "1999-08-22"
      },
      course: "Medicina",
      appliedDate: "2024-01-12",
      status: "approved",
      documents: [
        { name: "Certificado de Habilitações", url: "#", verified: true },
        { name: "Bilhete de Identidade", url: "#", verified: true },
        { name: "Fotografia", url: "#", verified: true },
        { name: "Exames Médicos", url: "#", verified: true }
      ],
      personalData: {
        address: "Luanda, Ingombota, Av. Marginal",
        previousEducation: "12ª Classe - Colégio Sagrada Família",
        motivation: "Sempre sonhei em ser médica para ajudar a salvar vidas e melhorar a saúde pública em Angola."
      },
      deadline: "2024-02-10",
      notes: "Candidata excelente com todas as qualificações necessárias."
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Pendente';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleApplicationAction = (applicationId: number, action: 'approve' | 'reject', notes: string = '') => {
    console.log(`${action} application ${applicationId} with notes: ${notes}`);
    // Aqui seria implementada a lógica para aprovar/rejeitar a candidatura
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Inscrições</h1>
          <p className="text-gray-600 mt-2">Analise e gerencie as candidaturas dos estudantes</p>
        </div>
        
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Candidaturas</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovadas</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejeitadas</p>
                <p className="text-2xl font-bold">19</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar por nome, email ou curso..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                Todas
              </Button>
              <Button 
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                Pendentes
              </Button>
              <Button 
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                Aprovadas
              </Button>
              <Button 
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('rejected')}
              >
                Rejeitadas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Candidaturas */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={application.student.name} />
                    <AvatarFallback>
                      {application.student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-lg">{application.student.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(application.status)}
                        <Badge variant={getStatusVariant(application.status)}>
                          {getStatusLabel(application.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {application.student.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {application.student.phone}
                      </div>
                      <div className="flex items-center">
                        <School className="h-4 w-4 mr-2" />
                        {application.course}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(application.appliedDate).toLocaleDateString('pt-AO')}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-4 text-sm">
                      <div className="bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-blue-700 font-medium">
                          {application.documents.length} documentos
                        </span>
                      </div>
                      <div className="bg-green-50 px-3 py-1 rounded-full">
                        <span className="text-green-700 font-medium">
                          {application.documents.filter(d => d.verified).length} verificados
                        </span>
                      </div>
                      <div className="text-gray-500">
                        Prazo: {new Date(application.deadline).toLocaleDateString('pt-AO')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Candidatura - {selectedApplication?.student.name}</DialogTitle>
                        <DialogDescription>
                          Curso: {selectedApplication?.course}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedApplication && (
                        <div className="space-y-6">
                          {/* Informações Pessoais */}
                          <div>
                            <h3 className="text-lg font-medium mb-3">Informações Pessoais</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Nome:</span> {selectedApplication.student.name}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span> {selectedApplication.student.email}
                              </div>
                              <div>
                                <span className="font-medium">Telefone:</span> {selectedApplication.student.phone}
                              </div>
                              <div>
                                <span className="font-medium">Data de Nascimento:</span> {new Date(selectedApplication.student.birthDate).toLocaleDateString('pt-AO')}
                              </div>
                              <div className="col-span-2">
                                <span className="font-medium">Endereço:</span> {selectedApplication.personalData.address}
                              </div>
                              <div className="col-span-2">
                                <span className="font-medium">Educação Anterior:</span> {selectedApplication.personalData.previousEducation}
                              </div>
                            </div>
                          </div>

                          {/* Documentos */}
                          <div>
                            <h3 className="text-lg font-medium mb-3">Documentos</h3>
                            <div className="space-y-2">
                              {selectedApplication.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4" />
                                    <span>{doc.name}</span>
                                    {doc.verified && (
                                      <Badge variant="default" className="text-xs">Verificado</Badge>
                                    )}
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Motivação */}
                          <div>
                            <h3 className="text-lg font-medium mb-3">Carta de Motivação</h3>
                            <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                              {selectedApplication.personalData.motivation}
                            </p>
                          </div>

                          {/* Ações */}
                          {selectedApplication.status === 'pending' && (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Notas (opcional)</label>
                                <Textarea 
                                  placeholder="Adicione notas sobre esta candidatura..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleApplicationAction(selectedApplication.id, 'reject')}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Rejeitar
                                </Button>
                                <Button 
                                  onClick={() => handleApplicationAction(selectedApplication.id, 'approve')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Aprovar
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  {application.status === 'pending' && (
                    <>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleApplicationAction(application.id, 'reject')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApplicationAction(application.id, 'approve')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma candidatura encontrada</h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca ou aguarde novas candidaturas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstitutionApplications;