import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InstitutionActivity = () => {
  useEffect(() => {
    document.title = 'Histórico de Atividades | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Histórico de Atividades</h1>
        <p className="text-muted-foreground mt-1">Acompanhe ações registradas para auditoria e segurança</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">O log detalhado de atividades ficará disponível aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionActivity;
