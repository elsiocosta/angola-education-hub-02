import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, School, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const StudentApplications = () => {
  const applications = [
    {
      id: 1,
      course: "Engenharia Informática",
      institution: "Universidade Agostinho Neto",
      appliedDate: "2024-01-15",
      status: "pending",
      documents: ["Certificado", "BI", "Foto"],
      deadline: "2024-02-15"
    },
    {
      id: 2,
      course: "Medicina",
      institution: "Universidade Técnica de Angola",
      appliedDate: "2024-01-10",
      status: "approved",
      documents: ["Certificado", "BI", "Foto", "Exames Médicos"],
      deadline: "2024-02-01"
    },
    {
      id: 3,
      course: "Direito",
      institution: "Universidade Católica de Angola",
      appliedDate: "2024-01-20",
      status: "rejected",
      documents: ["Certificado", "BI"],
      deadline: "2024-02-20"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Inscrições</h1>
          <p className="text-gray-600 mt-2">Acompanhe o status das suas candidaturas</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-green-600">
          Nova Inscrição
        </Button>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{application.course}</CardTitle>
                  <CardDescription className="mt-1 flex items-center">
                    <School className="h-4 w-4 mr-1" />
                    {application.institution}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(application.status)}
                  <Badge variant={getStatusVariant(application.status)}>
                    {getStatusLabel(application.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">Data da Inscrição</p>
                    <p className="text-gray-600">{new Date(application.appliedDate).toLocaleDateString('pt-AO')}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">Prazo</p>
                    <p className="text-gray-600">{new Date(application.deadline).toLocaleDateString('pt-AO')}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">Documentos</p>
                    <p className="text-gray-600">{application.documents.length} enviados</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  {application.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  {application.status === 'pending' && (
                    <Button size="sm">
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentApplications;