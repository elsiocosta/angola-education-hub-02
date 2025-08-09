import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const InstitutionCourses = () => {
  useEffect(() => {
    document.title = 'Gestão de Cursos | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Gestão de Cursos / Direções</h1>
        <p className="text-muted-foreground mt-1">Crie e edite cursos, períodos e modalidades</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
          <CardDescription>Integraremos aqui o módulo completo de cursos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Use provisoriamente a página "Gestão de Cursos" do menu geral.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionCourses;
