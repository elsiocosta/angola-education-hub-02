
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Users, 
  Clock,
  Paperclip,
  Star,
  Archive,
  Trash2
} from 'lucide-react';

const InternalMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      participant: 'Dr. António Silva',
      role: 'Diretor',
      lastMessage: 'Precisamos discutir os novos horários das aulas...',
      timestamp: '10:30',
      unread: 2,
      online: true,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      participant: 'Prof. Maria Santos',
      role: 'Coordenadora',
      lastMessage: 'Os relatórios estão prontos para revisão.',
      timestamp: 'Ontem',
      unread: 0,
      online: false,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      participant: 'João Costa',
      role: 'Secretário',
      lastMessage: 'Documentos enviados por email.',
      timestamp: '2 dias',
      unread: 1,
      online: true,
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      participant: 'Equipe de TI',
      role: 'Grupo',
      lastMessage: 'Sistema atualizado com sucesso!',
      timestamp: '3 dias',
      unread: 0,
      online: false,
      avatar: '/placeholder.svg'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. António Silva',
      content: 'Bom dia! Precisamos agendar uma reunião para discutir os novos horários das disciplinas para o próximo semestre.',
      timestamp: '09:15',
      isMine: false,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      sender: 'Você',
      content: 'Bom dia, Dr. António. Claro, que tal na quinta-feira às 14h?',
      timestamp: '09:20',
      isMine: true,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      sender: 'Dr. António Silva',
      content: 'Perfeito! Quinta-feira às 14h na sala de reuniões. Vou convidar também a Prof. Maria para participar.',
      timestamp: '09:25',
      isMine: false,
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      sender: 'Dr. António Silva',
      content: 'Precisamos também revisar o calendário acadêmico. Pode preparar o documento atual?',
      timestamp: '10:30',
      isMine: false,
      avatar: '/placeholder.svg'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui seria enviada a mensagem
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mensagens Internas</h1>
            <p className="text-gray-600">Comunicação entre membros da instituição</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
            {/* Lista de Conversas */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Conversas
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Pesquisar conversas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 max-h-[500px] overflow-y-auto">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? 'bg-blue-50 border-r-2 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.avatar} />
                              <AvatarFallback>
                                {conversation.participant.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {conversation.participant}
                              </p>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                                {conversation.unread > 0 && (
                                  <Badge variant="default" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{conversation.role}</p>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Área de Mensagens */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                {/* Header da Conversa */}
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentConversation?.avatar} />
                          <AvatarFallback>
                            {currentConversation?.participant.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation?.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentConversation?.participant}</h3>
                        <p className="text-sm text-gray-600">{currentConversation?.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Área de Mensagens */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[70%] ${message.isMine ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!message.isMine && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>
                                {message.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`rounded-lg p-3 ${
                            message.isMine
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-end mt-1">
                              <Clock className="h-3 w-3 mr-1 opacity-70" />
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Input de Nova Mensagem */}
                <div className="p-4 border-t">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua mensagem..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InternalMessages;
