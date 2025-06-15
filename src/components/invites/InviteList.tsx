
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InviteItem from "./InviteItem";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface InviteListProps {
  invites: {
    id: number;
    email: string;
    name: string;
    role: string;
    token: string;
    createdAt: string;
    expiresAt: string;
    status: string;
    timeRemaining: string;
  }[];
  onCopy: (token: string) => void;
  onResend: (inviteId: number) => void;
  onCancel: (inviteId: number) => void;
}

const statuses = [
  { value: "", label: "Todos" },
  { value: "Pendente", label: "Pendente" },
  { value: "Aceito", label: "Aceito" },
  { value: "Expirado", label: "Expirado" }
];

const InviteList: React.FC<InviteListProps> = ({ invites, onCopy, onResend, onCancel }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Filtro aplicado em memória para esta versão local
  const filteredInvites = useMemo(() => {
    return invites.filter(invite => {
      const matchStatus = status ? invite.status === status : true;
      const searchLower = search.toLowerCase();
      const matchSearch =
        invite.name.toLowerCase().includes(searchLower) ||
        invite.email.toLowerCase().includes(searchLower) ||
        invite.role.toLowerCase().includes(searchLower);
      return matchStatus && matchSearch;
    });
  }, [invites, search, status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convites Ativos</CardTitle>
        <CardDescription>Gerir convites enviados e pendentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-end gap-2 mb-4">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground flex items-center gap-2 mb-1">
              <Search className="h-4 w-4" /> Buscar
            </label>
            <Input
              type="text"
              placeholder="Buscar por nome, email ou cargo"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="md:max-w-xs"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground flex items-center gap-2 mb-1">
              <Filter className="h-4 w-4" /> Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(stat => (
                  <SelectItem key={stat.value} value={stat.value}>{stat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          {filteredInvites.length === 0 && (
            <div className="text-gray-500 text-center py-8">Nenhum convite encontrado.</div>
          )}
          {filteredInvites.map((invite) => (
            <InviteItem
              key={invite.id}
              invite={invite}
              onCopy={onCopy}
              onResend={onResend}
              onCancel={onCancel}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteList;
