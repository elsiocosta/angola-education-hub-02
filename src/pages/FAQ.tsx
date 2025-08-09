import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  useEffect(() => {
    document.title = 'Ajuda e FAQ | Ango Education';
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Ajuda e Perguntas Frequentes</h1>
        <p className="text-muted-foreground mt-2">Encontre respostas rápidas para as dúvidas mais comuns</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conta e Acesso</CardTitle>
            <CardDescription>Dúvidas sobre login, cadastro e verificação de email</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como criar uma conta?</AccordionTrigger>
                <AccordionContent>
                  Clique em “Criar Conta”, informe seu e-mail e siga as instruções de verificação. Você também pode
                  registrar sua instituição após concluir o cadastro.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Não recebi o e-mail de verificação</AccordionTrigger>
                <AccordionContent>
                  Verifique sua pasta de spam. Caso não encontre, acesse a página de verificação e solicite reenvio.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Esqueci minha senha</AccordionTrigger>
                <AccordionContent>
                  Acesse “Esqueci a senha” na tela de login e siga as instruções para redefinir sua senha com segurança.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instituições e Candidaturas</CardTitle>
            <CardDescription>Processos de descoberta e inscrição</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-a">
                <AccordionTrigger>Como encontrar instituições?</AccordionTrigger>
                <AccordionContent>
                  Utilize a página “Descobrir Instituições” com filtros por província, nível de ensino e cursos para
                  refinar sua busca.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-b">
                <AccordionTrigger>Como candidatar-se?</AccordionTrigger>
                <AccordionContent>
                  Abra a página da instituição, clique em “Candidatar-se” e preencha o formulário com seus dados e
                  documentos digitalizados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-c">
                <AccordionTrigger>Onde acompanho as respostas?</AccordionTrigger>
                <AccordionContent>
                  No painel do estudante, acesse “Candidaturas” para ver status e o histórico de atualizações.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planos Premium</CardTitle>
            <CardDescription>Recursos avançados para instituições</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-p1">
                <AccordionTrigger>Quais são os benefícios do Premium?</AccordionTrigger>
                <AccordionContent>
                  Analytics avançado, campanhas geolocalizadas, gestão acadêmica, integrações e suporte prioritário.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-p2">
                <AccordionTrigger>Como assinar?</AccordionTrigger>
                <AccordionContent>
                  No painel da instituição, acesse “Plano Premium”, escolha um plano e finalize o pagamento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacidade e Segurança</CardTitle>
            <CardDescription>LGPD Angola e proteção de dados</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-s1">
                <AccordionTrigger>Como meus dados são protegidos?</AccordionTrigger>
                <AccordionContent>
                  Armazenamento seguro com criptografia e acesso restrito por permissões. Consulte nossa Política de
                  Privacidade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-s2">
                <AccordionTrigger>Posso solicitar remoção de dados?</AccordionTrigger>
                <AccordionContent>
                  Sim. Utilize a página de Privacidade para solicitar acesso, correção ou exclusão conforme a LGPD Angola.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default FAQ;
