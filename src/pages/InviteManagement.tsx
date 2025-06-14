import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Copy, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Mail,
  Users,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendInviteEmail } from '@/utils/sendInviteEmail';

const InviteManagement = () => {
  const { toast } = useToast();
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'aluno',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const activeInvites = [
    {
      id: 1,
      email: 'joao.silva@email.com',
      name: 'João Silva',
      role: 'Professor',
      token: 'inv_abc123def456',
      createdAt: '2024-01-15 14:30',
      expiresAt: '2024-01-17 14:30',
      status: 'Pendente',
      timeRemaining: '36 horas'
    },
    {
      id: 2,
      email: 'maria.santos@email.com',
      name: 'Maria Santos',
      role: 'Secretária',
      token: 'inv_def789ghi012',
      createdAt: '2024-01-14 10:15',
      expiresAt: '2024-01-16 10:15',
      status: 'Aceito',
      timeRemaining: '0 horas'
    },
    {
      id: 3,
      email: 'pedro.costa@email.com',
      name: 'Pedro Costa',
      role: 'Aluno',
      token: 'inv_ghi345jkl678',
      createdAt: '2024-01-13 16:45',
      expiresAt: '2024-01-15 16:45',
      status: 'Expirado',
      timeRemaining: '0 horas'
    }
  ];

  const roles = [
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' },
    { value: 'secretaria', label: 'Secretária' },
    { value: 'diretor', label: 'Diretor' },
    { value: 'limpeza', label: 'Funcionário de Limpeza' },
    { value: 'coordenador', label: 'Coordenador' }
  ];

  const handleSendInvite = async () => {
    if (!inviteForm.email || !inviteForm.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const inviteUrl = `${window.location.origin}/register/invite/${Math.random().toString(36).substr(2, 10)}`;

    try {
      await sendInviteEmail({
        email: inviteForm.email,
        name: inviteForm.name,
        role: inviteForm.role,
        inviteUrl
      });
      toast({
        title: "Convite Enviado",
        description: `Convite enviado para ${inviteForm.email} com o cargo de ${inviteForm.role}.`,
      });
      setInviteForm({ email: '', role: 'aluno', name: '' });
    } catch (err: any) {
      toast({
        title: "Falha ao enviar convite",
        description: err.message || "Erro inesperado ao tentar enviar o convite.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/register/invite/${token}`;
    navigator.clipboard.writeText(inviteUrl);
    toast({
      title: "Link Copiado",
      description: "Link do convite copiado para a área de transferência.",
    });
  };

  const resendInvite = (inviteId: number) => {
    toast({
      title: "Convite Reenviado",
      description: "O convite foi reenviado com nova validade de 48 horas.",
    });
  };

  const cancelInvite = (inviteId: number) => {
    toast({
      title: "Convite Cancelado",
      description: "O convite foi cancelado com sucesso.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aceito':
        return 'bg-green-100 text-green-800';
      case 'Expirado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente':
        return <Clock className="h-4 w-4" />;
      case 'Aceito':
        return <CheckCircle className="h-4 w-4" />;
      case 'Expirado':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestão de Convites</h1>
            <p className="text-gray-600">Envie convites para novos membros da instituição</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Convite */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Novo Convite
                  </CardTitle>
                  <CardDescription>
                    Convite válido por 48 horas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex: João Silva"
                      value={inviteForm.name}
                      onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@email.com"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Cargo na Instituição</Label>
                    <select
                      id="role"
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                      value={inviteForm.role}
                      onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleSendInvite} 
                    className="w-full"
                    disabled={loading}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {loading ? "Enviando..." : "Enviar Convite"}
                  </Button>
                </CardContent>
              </Card>

              {/* Estatísticas */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Convites Pendentes</span>
                    <Badge variant="outline">
                      {activeInvites.filter(inv => inv.status === 'Pendente').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Convites Aceitos</span>
                    <Badge variant="default">
                      {activeInvites.filter(inv => inv.status === 'Aceito').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Convites Expirados</span>
                    <Badge variant="secondary">
                      {activeInvites.filter(inv => inv.status === 'Expirado').length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Convites */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Convites Ativos</CardTitle>
                  <CardDescription>Gerir convites enviados e pendentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeInvites.map((invite) => (
                      <div key={invite.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{invite.name}</h3>
                            <p className="text-gray-600">{invite.email}</p>
                            <p className="text-sm text-gray-500">Cargo: {invite.role}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(invite.status)}>
                              {getStatusIcon(invite.status)}
                              <span className="ml-1">{invite.status}</span>
                            </Badge>
                            {invite.status === 'Pendente' && (
                              <Badge variant="outline" className="flex items-center">
                                <Timer className="h-3 w-3 mr-1" />
                                {invite.timeRemaining}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="font-medium">Enviado em:</span>
                            <p>{invite.createdAt}</p>
                          </div>
                          <div>
                            <span className="font-medium">Expira em:</span>
                            <p>{invite.expiresAt}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {invite.status === 'Pendente' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyInviteLink(invite.token)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copiar Link
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => resendInvite(invite.id)}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Reenviar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cancelInvite(invite.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancelar
                              </Button>
                            </>
                          )}
                          
                          {invite.status === 'Expirado' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resendInvite(invite.id)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar Novo Convite
                            </Button>
                          )}
                          
                          {invite.status === 'Aceito' && (
                            <Badge variant="default">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Membro Ativo
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
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

export default InviteManagement;
