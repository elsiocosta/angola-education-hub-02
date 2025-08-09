import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TeamManagement from '@/components/TeamManagement';

const InstitutionTeam = () => {
  useEffect(() => {
    document.title = 'Gestão da Equipe | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Gestão de Professores e Coordenadores</h1>
        <p className="text-muted-foreground mt-1">Convide membros e defina permissões por cargo</p>
      </header>

      <TeamManagement />

      <Card>
        <CardHeader>
          <CardTitle>Dica</CardTitle>
          <CardDescription>Use também a página de Convites para enviar acessos por e-mail.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">A gestão de subperfis respeita a hierarquia institucional.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionTeam;
