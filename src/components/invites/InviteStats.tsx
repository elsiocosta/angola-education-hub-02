
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InviteStatsProps {
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
}

const InviteStats: React.FC<InviteStatsProps> = ({ invites }) => (
  <Card>
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
          {invites.filter(inv => inv.status === 'Pendente').length}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Convites Aceitos</span>
        <Badge variant="default">
          {invites.filter(inv => inv.status === 'Aceito').length}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Convites Expirados</span>
        <Badge variant="secondary">
          {invites.filter(inv => inv.status === 'Expirado').length}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default InviteStats;
