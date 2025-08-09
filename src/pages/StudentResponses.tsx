import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const StudentResponses = () => {
  useEffect(() => {
    document.title = 'Respostas às Candidaturas | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Acompanhar Respostas</h1>
        <p className="text-muted-foreground mt-1">Linha do tempo das suas candidaturas e decisões</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
          <CardDescription>Atualizações por candidatura aparecerão aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Ainda não há atualizações.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResponses;
