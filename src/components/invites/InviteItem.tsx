
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Mail, XCircle, CheckCircle, Clock, Timer } from "lucide-react";

interface Invite {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  status: string;
  timeRemaining: string;
}

interface InviteItemProps {
  invite: Invite;
  onCopy: (token: string) => void;
  onResend: (inviteId: number) => void;
  onCancel: (inviteId: number) => void;
}

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

const InviteItem: React.FC<InviteItemProps> = ({ invite, onCopy, onResend, onCancel }) => (
  <div className="border rounded-lg p-6">
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
          <Button size="sm" variant="outline" onClick={() => onCopy(invite.token)}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar Link
          </Button>
          <Button size="sm" variant="outline" onClick={() => onResend(invite.id)}>
            <Mail className="h-4 w-4 mr-2" />
            Reenviar
          </Button>
          <Button size="sm" variant="outline" onClick={() => onCancel(invite.id)}>
            <XCircle className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </>
      )}
      {invite.status === 'Expirado' && (
        <Button size="sm" variant="outline" onClick={() => onResend(invite.id)}>
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
);

export default InviteItem;
