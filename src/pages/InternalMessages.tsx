
import React, { useState } from 'react';
import { Send, Plus, MessageSquare, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import { useMessages, useSendMessage, useMarkAsRead } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';

const InternalMessages = () => {
  const { user } = useAuth();
  const { data: messages = [], isLoading } = useMessages(user?.id);
  const sendMessage = useSendMessage();
  const markAsRead = useMarkAsRead();

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recipient_email: '',
    subject: '',
    content: ''
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Note: In a real implementation, you'd need to resolve the email to a user ID
      // For now, this is a simplified version
      await sendMessage.mutateAsync({
        sender_id: user.id,
        recipient_id: 'placeholder', // This should be resolved from email
        subject: formData.subject,
        content: formData.content
      });
      
      setFormData({ recipient_email: '', subject: '', content: '' });
      setIsComposeOpen(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    if (!selectedMessage || selectedMessage !== messageId) {
      setSelectedMessage(messageId);
      await markAsRead.mutateAsync(messageId);
    }
  };

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Por favor, faça login para acessar suas mensagens.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Mensagens Internas</h1>
            
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Mensagem
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Compor Nova Mensagem</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Para (email) *</Label>
                    <Input
                      id="recipient"
                      type="email"
                      value={formData.recipient_email}
                      onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Assunto da mensagem"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Mensagem *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Digite sua mensagem aqui..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsComposeOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={sendMessage.isPending}>
                      <Send className="h-4 w-4 mr-2" />
                      {sendMessage.isPending ? 'Enviando...' : 'Enviar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Caixa de Entrada
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Carregando mensagens...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma mensagem encontrada</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        } ${!message.read_at && message.recipient_id === user.id ? 'font-semibold' : ''}`}
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">
                              {message.sender_id === user.id 
                                ? `Para: ${message.recipient?.name || 'Usuário'}` 
                                : `De: ${message.sender?.name || 'Usuário'}`}
                            </span>
                          </div>
                          {!message.read_at && message.recipient_id === user.id && (
                            <Badge variant="destructive" className="text-xs">Nova</Badge>
                          )}
                        </div>
                        <h4 className="text-sm font-medium mb-1 line-clamp-1">{message.subject}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{message.content}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(message.created_at!)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessageData ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedMessageData.subject}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span>
                          De: {selectedMessageData.sender_id === user.id 
                            ? 'Você' 
                            : selectedMessageData.sender?.name || 'Usuário'}
                        </span>
                        <span>•</span>
                        <span>{formatDate(selectedMessageData.created_at!)}</span>
                      </CardDescription>
                    </div>
                    {!selectedMessageData.read_at && selectedMessageData.recipient_id === user.id && (
                      <Badge variant="destructive">Nova</Badge>
                    )}
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{selectedMessageData.content}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Selecione uma mensagem
                  </h3>
                  <p className="text-gray-600">
                    Escolha uma mensagem da lista para visualizar seu conteúdo completo.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InternalMessages;
