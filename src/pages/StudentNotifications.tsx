import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentNotifications = () => {
  useEffect(() => {
    document.title = 'Notificações do Estudante | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Notificações</h1>
        <p className="text-muted-foreground mt-1">Acompanhe os avisos e atualizações da plataforma</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Seu centro de notificações será exibido aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentNotifications;
