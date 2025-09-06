
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'Sobre a Plataforma | Ango Education';
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sobre a Angola Education Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Conectando estudantes, instituições e oportunidades educacionais em Angola
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Target className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Democratizar o acesso à educação de qualidade em Angola através da tecnologia
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Eye className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Visão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ser a principal plataforma educacional de Angola, conectando todo o ecossistema
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Heart className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Transparência, inovação, inclusão e excelência educacional
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Comunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Estudantes, instituições e educadores unidos por um futuro melhor
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Quem Pode Usar a Plataforma?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Visitantes</h3>
                <p className="text-sm text-muted-foreground">
                  Explore instituições, descubra cursos e acompanhe novidades
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Estudantes</h3>
                <p className="text-sm text-muted-foreground">
                  Candidate-se a cursos, acompanhe respostas e gerencie sua jornada educacional
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Instituições</h3>
                <p className="text-sm text-muted-foreground">
                  Aumente sua visibilidade, gerencie candidaturas e conecte-se com estudantes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <Card>
          <CardHeader>
            <CardTitle>Comece Sua Jornada Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Junte-se a milhares de estudantes e instituições já conectados
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Criar Conta Gratuita</Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="lg">Explorar Instituições</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default About;
