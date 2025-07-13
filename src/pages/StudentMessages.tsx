import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Search, Plus, Reply, School, User, Calendar } from 'lucide-react';

const StudentMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  
  const messages = [
    {
      id: 1,
      from: "Universidade Agostinho Neto",
      fromType: "institution",
      subject: "Confirmação de Inscrição",
      preview: "Sua inscrição para o curso de Engenharia foi recebida...",
      date: "2024-01-15",
      read: true,
      content: "Caro estudante, confirmamos o recebimento da sua inscrição para o curso de Engenharia Informática. Os documentos estão sendo analisados e receberá uma resposta em até 15 dias úteis."
    },
    {
      id: 2,
      from: "Prof. João Silva",
      fromType: "teacher",
      subject: "Material de Apoio - Matemática",
      preview: "Disponibilizei novo material na plataforma...",
      date: "2024-01-14",
      read: false,
      content: "Olá! Disponibilizei novo material de apoio para a disciplina de Matemática Avançada. Pode encontrar na secção de recursos da disciplina."
    },
    {
      id: 3,
      from: "Instituto Superior Politécnico",
      fromType: "institution",
      subject: "Resultado da Candidatura",
      preview: "Informamos sobre o resultado da sua candidatura...",
      date: "2024-01-13",
      read: true,
      content: "Parabéns! Sua candidatura ao curso de Programação Web foi aprovada. As aulas começam em março. Aguarde mais informações sobre matrícula."
    }
  ];

  const getFromIcon = (type: string) => {
    switch (type) {
      case 'institution':
        return <School className="h-4 w-4" />;
      case 'teacher':
        return <User className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mensagens</h1>
          <p className="text-gray-600 mt-2">Comunicação com instituições e professores</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Mensagem</DialogTitle>
              <DialogDescription>
                Envie uma mensagem para uma instituição ou professor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Para</label>
                <Input placeholder="Selecione o destinatário" />
              </div>
              <div>
                <label className="text-sm font-medium">Assunto</label>
                <Input placeholder="Assunto da mensagem" />
              </div>
              <div>
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea placeholder="Digite sua mensagem aqui..." rows={4} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Enviar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Buscar mensagens..." className="pl-10" />
        </div>
        <Button variant="outline">Não lidas</Button>
        <Button variant="outline">Instituições</Button>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              !message.read ? 'border-blue-200 bg-blue-50/30' : ''
            }`}
            onClick={() => setSelectedMessage(message.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getFromIcon(message.fromType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-base font-medium">
                        {message.from}
                      </CardTitle>
                      {!message.read && (
                        <Badge variant="default" className="text-xs">
                          Nova
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="font-medium text-gray-900 mt-1">
                      {message.subject}
                    </CardDescription>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(message.date).toLocaleDateString('pt-AO')}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Reply className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {selectedMessage === message.id && (
              <CardContent className="pt-0 border-t">
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {message.content}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentMessages;