import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contato | Ango Education';
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Fale Conosco</h1>
        <p className="text-muted-foreground mt-2">Estamos disponíveis para dúvidas, parcerias e suporte</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contactos Diretos</CardTitle>
            <CardDescription>Escolha a melhor forma para falar com a nossa equipe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="mailto:angoeducation@gmail.com" className="flex items-center gap-3 hover:underline">
              <Mail className="h-5 w-5 text-primary" /> angoeducation@gmail.com
            </a>
            <a href="https://instagram.com/ango_education" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
              <Instagram className="h-5 w-5 text-pink-600" /> @ango_education
            </a>
            <a href="https://wa.me/244954789965?text=Ol%C3%A1%2C+quero+saber+mais+sobre+a+plataforma." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
              <MessageCircle className="h-5 w-5 text-green-600" /> +244 954 789 965 (WhatsApp)
            </a>
            <a href="https://www.youtube.com/@AngoEducation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
              <Youtube className="h-5 w-5 text-red-600" /> @AngoEducation
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
            <CardDescription>Responderemos o mais breve possível</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Seu nome</label>
                <input className="w-full border rounded-md px-3 py-2" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Seu e-mail</label>
                <input type="email" className="w-full border rounded-md px-3 py-2" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea className="w-full border rounded-md px-3 py-2 min-h-[120px]" placeholder="Como podemos ajudar?" />
              </div>
              <Button type="button">Enviar</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Contact;
