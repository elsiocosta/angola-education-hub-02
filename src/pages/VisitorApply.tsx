import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const VisitorApply = () => {
  useEffect(() => {
    document.title = 'Candidatar-se | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Candidatar-se a uma Instituição</h1>
        <p className="text-muted-foreground mt-1">Upgrade seu perfil para se candidatar a cursos</p>
      </header>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Para se candidatar a cursos, você precisa fazer upgrade para o perfil de Estudante.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Torne-se um Estudante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Como estudante, você poderá:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Candidatar-se a cursos de qualquer instituição</li>
            <li>Upload de documentos digitalizados</li>
            <li>Acompanhar status das candidaturas em tempo real</li>
            <li>Acesso a chats com instituições</li>
            <li>Participar de fóruns e enquetes educacionais</li>
            <li>Receber recomendações personalizadas</li>
          </ul>

          <div className="pt-4">
            <Button size="lg" className="w-full">
              Fazer Upgrade para Estudante
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              100% gratuito e sem compromissos
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Como Funciona o Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Complete seu Perfil</h3>
              <p className="text-sm text-muted-foreground">
                Adicione dados pessoais e académicos
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Escolha Cursos</h3>
              <p className="text-sm text-muted-foreground">
                Explore e selecione os cursos desejados
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Acompanhe Respostas</h3>
              <p className="text-sm text-muted-foreground">
                Monitore o status das suas candidaturas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorApply;