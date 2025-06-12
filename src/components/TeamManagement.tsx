
import React, { useState } from 'react';
import { Plus, Mail, Edit, Trash2, Copy, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserRole } from '@/types/user';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'invited';
  addedAt: string;
  lastLogin?: string;
}

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@uan.ao',
      role: 'director',
      status: 'active',
      addedAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@uan.ao',
      role: 'professor',
      status: 'active',
      addedAt: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@uan.ao',
      role: 'secretary',
      status: 'pending',
      addedAt: '2024-01-18'
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '' as UserRole | ''
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const roleLabels: Record<UserRole, string> = {
    visitor: 'Visitante',
    student: 'Aluno',
    cleaning_staff: 'Funcionário da Limpeza',
    professor: 'Professor',
    secretary: 'Secretária',
    course_coordinator: 'Coordenador de Curso',
    director: 'Diretor',
    institution_admin: 'Administrador Institucional',
    platform_admin: 'Administrador da Plataforma'
  };

  const institutionRoles: UserRole[] = [
    'director',
    'course_coordinator', 
    'professor',
    'secretary',
    'student',
    'cleaning_staff'
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      invited: 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role as UserRole,
        status: 'pending',
        addedAt: new Date().toISOString().split('T')[0]
      };
      setMembers([...members, member]);
      setNewMember({ name: '', email: '', role: '' });
      setIsAddDialogOpen(false);
      console.log('Membro adicionado:', member);
    }
  };

  const generateInviteLink = (role: UserRole) => {
    const token = Math.random().toString(36).substring(2, 15);
    const link = `https://angoeducation.ao/invite/${token}?role=${role}`;
    setInviteLink(link);
    console.log('Link de convite gerado:', link);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    console.log('Link copiado para área de transferência');
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    console.log('Membro removido:', id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gestão da Equipe</span>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Membro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Membro</DialogTitle>
                  <DialogDescription>
                    Adicione um novo membro à equipe da instituição
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input
                      placeholder="Nome do membro"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-mail</label>
                    <Input
                      type="email"
                      placeholder="email@instituicao.ao"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cargo</label>
                    <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value as UserRole})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutionRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {roleLabels[role]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMember}>
                    Adicionar Membro
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Gerencie os membros da sua instituição e suas permissões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Adicionado em</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{roleLabels[member.role]}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(member.status)}>
                      {member.status === 'active' ? 'Ativo' : 
                       member.status === 'pending' ? 'Pendente' : 'Convidado'}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.addedAt}</TableCell>
                  <TableCell>{member.lastLogin || 'Nunca'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeMember(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Generate Invite Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Links de Convite
          </CardTitle>
          <CardDescription>
            Gere links de convite personalizados para diferentes cargos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {institutionRoles.map((role) => (
              <Button
                key={role}
                variant="outline"
                onClick={() => generateInviteLink(role)}
                className="flex items-center justify-center p-4 h-auto"
              >
                <div className="text-center">
                  <Mail className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{roleLabels[role]}</div>
                </div>
              </Button>
            ))}
          </div>

          {inviteLink && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-700">Link de Convite Gerado:</label>
              <div className="flex items-center space-x-2 mt-2">
                <Input value={inviteLink} readOnly className="bg-white" />
                <Button onClick={copyInviteLink} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Este link é válido por 48 horas e pode ser usado uma vez.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
