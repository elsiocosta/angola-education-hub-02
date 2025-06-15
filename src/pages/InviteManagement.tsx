import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { sendInviteEmail } from '@/utils/sendInviteEmail';
import InviteForm from '@/components/invites/InviteForm';
import InviteStats from '@/components/invites/InviteStats';
import InviteList from '@/components/invites/InviteList';

const InviteManagement = () => {
  const { toast } = useToast();
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'aluno', name: '' });
  const [loading, setLoading] = useState(false);

  // Os convites ainda permanecem hardcoded (ideal: buscar da API depois)
  const [activeInvites, setActiveInvites] = useState([
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
  ]);

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
      // Padrão: não adiciona na lista (pois seria feito via backend/refresh)
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
    setActiveInvites((prev) =>
      prev.map((invite) => {
        if (invite.id === inviteId) {
          if (invite.status === 'Expirado') {
            // Novo token aleatório e datas simuladas
            const newToken = 'inv_' + Math.random().toString(36).substring(2, 12);
            const now = new Date();
            const expires = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h
            return {
              ...invite,
              token: newToken,
              createdAt: now.toISOString().slice(0, 16).replace('T', ' '),
              expiresAt: expires.toISOString().slice(0, 16).replace('T', ' '),
              status: 'Pendente',
              timeRemaining: '48 horas'
            };
          }
          // Caso status não seja Expirado, mantém (pode colocar mais lógica se desejar)
        }
        return invite;
      })
    );
    // Detecta se era expirado para feedback personalizado
    const justRenewed = activeInvites.find(i => i.id === inviteId)?.status === 'Expirado';
    toast({
      title: justRenewed ? "Convite Renovado" : "Convite Reenviado",
      description: justRenewed
        ? "Convite expirado foi renovado e re-enviado ao usuário, nova validade de 48 horas."
        : "O convite foi reenviado com nova validade de 48 horas.",
    });
  };

  const cancelInvite = (inviteId: number) => {
    setActiveInvites(prev => prev.filter(invite => invite.id !== inviteId));
    toast({
      title: "Convite Cancelado",
      description: "O convite foi cancelado com sucesso.",
    });
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
            <div className="lg:col-span-1 space-y-6">
              <InviteForm
                inviteForm={inviteForm}
                setInviteForm={setInviteForm}
                roles={roles}
                loading={loading}
                onSendInvite={handleSendInvite}
              />
              <InviteStats invites={activeInvites} />
            </div>
            <div className="lg:col-span-2">
              <InviteList
                invites={activeInvites}
                onCopy={copyInviteLink}
                onResend={resendInvite}
                onCancel={cancelInvite}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InviteManagement;
