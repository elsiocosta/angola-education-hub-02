
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InviteItem from "./InviteItem";

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

const InviteList: React.FC<InviteListProps> = ({ invites, onCopy, onResend, onCancel }) => (
  <Card>
    <CardHeader>
      <CardTitle>Convites Ativos</CardTitle>
      <CardDescription>Gerir convites enviados e pendentes</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {invites.map((invite) => (
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

export default InviteList;
