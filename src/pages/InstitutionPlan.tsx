import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const InstitutionPlan = () => {
  useEffect(() => {
    document.title = 'Plano Premium | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Gestão de Plano Premium</h1>
        <p className="text-muted-foreground mt-1">Ative recursos avançados para sua instituição</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Escolha um Plano</CardTitle>
          <CardDescription>Veja detalhes completos na página de preços</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Link to="/pricing">
            <Button>Ver Planos e Assinar</Button>
          </Link>
          <span className="text-sm text-muted-foreground">Após assinar, os recursos são ativados automaticamente.</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionPlan;
