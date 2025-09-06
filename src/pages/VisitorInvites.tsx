import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Building, Clock, Check, X } from 'lucide-react';

const VisitorInvites = () => {
  useEffect(() => {
    document.title = 'Convites Recebidos | Ango Education';
  }, []);

  // Mock data - em produção virá do Supabase
  const invites = [
    {
      id: 1,
      institution: 'Universidade Agostinho Neto',
      role: 'Professor',
      department: 'Faculdade de Engenharia',
      invitedBy: 'Dr. João Silva',
      date: '2025-01-15',
      status: 'pending'
    },
    {
      id: 2,
      institution: 'Instituto Superior Técnico',
      role: 'Coordenador de Curso',
      department: 'Informática',
      invitedBy: 'Prof. Maria Santos',
      date: '2025-01-10',
      status: 'accepted'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'accepted':
        return <Badge variant="default"><Check className="h-3 w-3 mr-1" />Aceito</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Recusado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Convites Recebidos</h1>
        <p className="text-muted-foreground mt-1">Gerencie convites de instituições para integrar suas equipes</p>
      </header>

      {invites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum convite recebido</h3>
            <p className="text-sm text-muted-foreground">
              Quando instituições convidarem você para integrar suas equipes, os convites aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {invites.map((invite) => (
            <Card key={invite.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{invite.institution}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Convite para: <span className="font-medium">{invite.role}</span>
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(invite.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Departamento:</span> {invite.department}
                    </div>
                    <div>
                      <span className="font-medium">Convidado por:</span> {invite.invitedBy}
                    </div>
                    <div>
                      <span className="font-medium">Data do convite:</span> {new Date(invite.date).toLocaleDateString('pt-AO')}
                    </div>
                  </div>

                  {invite.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Recusar
                      </Button>
                      <Button className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        Aceitar Convite
                      </Button>
                    </div>
                  )}

                  {invite.status === 'accepted' && (
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        Acessar Painel da Instituição
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitorInvites;