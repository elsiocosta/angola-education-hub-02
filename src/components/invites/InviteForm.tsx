
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface InviteFormProps {
  inviteForm: {
    email: string;
    role: string;
    name: string;
  };
  setInviteForm: React.Dispatch<React.SetStateAction<{
    email: string;
    role: string;
    name: string;
  }>>;
  roles: { value: string; label: string; }[];
  loading: boolean;
  onSendInvite: () => void;
}

const InviteForm: React.FC<InviteFormProps> = ({
  inviteForm,
  setInviteForm,
  roles,
  loading,
  onSendInvite
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Mail className="h-5 w-5 mr-2" />
        Novo Convite
      </CardTitle>
      <CardDescription>Convite válido por 48 horas</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ex: João Silva"
          value={inviteForm.name}
          onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="joao@email.com"
          value={inviteForm.email}
          onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="role">Cargo na Instituição</Label>
        <select
          id="role"
          className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
          value={inviteForm.role}
          onChange={e => setInviteForm({ ...inviteForm, role: e.target.value })}
        >
          {roles.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
      </div>
      <Button onClick={onSendInvite} className="w-full" disabled={loading}>
        <Mail className="h-4 w-4 mr-2" />
        {loading ? "Enviando..." : "Enviar Convite"}
      </Button>
    </CardContent>
  </Card>
);

export default InviteForm;
