import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const StudentInstitutions = () => {
  useEffect(() => {
    document.title = 'Minhas Instituições | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Minhas Instituições</h1>
        <p className="text-muted-foreground mt-1">Instituições em que você foi admitido ou está vinculado</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Instituições</CardTitle>
          <CardDescription>Quando você estiver vinculado a instituições, elas aparecerão aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Sem vínculos no momento.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentInstitutions;
