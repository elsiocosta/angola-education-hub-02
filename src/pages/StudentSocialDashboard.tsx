
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, BookmarkPlus, Search, Bell, Calendar, Users, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';

const StudentSocialDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para posts do feed
  const feedPosts = [
    {
      id: 1,
      institution: "Instituto Superior de Ciências da Educação",
      avatar: "🎓",
      content: "Parabéns aos nossos graduandos de 2024! 🎉 Cerimónia de formatura será dia 15 de Dezembro.",
      image: "/placeholder.svg",
      likes: 187,
      comments: 34,
      shares: 12,
      time: "1h",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      institution: "Universidade Católica de Angola",
      avatar: "⛪",
      content: "Workshop sobre Empreendedorismo Digital acontece amanhã às 14h. Inscrições abertas!",
      likes: 92,
      comments: 18,
      shares: 7,
      time: "3h",
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 3,
      institution: "Instituto Politécnico de Malanje",
      avatar: "🔧",
      content: "Laboratório de Robótica inaugurado! Venha conhecer as novas tecnologias disponíveis.",
      image: "/placeholder.svg",
      likes: 145,
      comments: 23,
      shares: 15,
      time: "5h",
      isLiked: false,
      isBookmarked: true
    }
  ];

  // Mock data para atividades do estudante
  const studentActivities = [
    {
      id: 1,
      type: "assignment",
      title: "Trabalho de Matemática",
      dueDate: "25 Dez",
      status: "pending"
    },
    {
      id: 2,
      type: "exam",
      title: "Prova de História",
      dueDate: "30 Dez",
      status: "scheduled"
    },
    {
      id: 3,
      type: "event",
      title: "Feira de Ciências",
      dueDate: "05 Jan",
      status: "registered"
    }
  ];

  const handleInteraction = (postId: number, action: string) => {
    console.log(`${action} post ${postId}`);
    // Aqui você implementaria a lógica real de interação
  };

  const handleShareExternal = (postId: number, platform: string) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(postUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
        break;
      default:
        navigator.clipboard.writeText(postUrl);
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portal do Estudante
            </h1>
            <p className="text-gray-600">
              Acompanhe suas atividades acadêmicas e conecte-se com a comunidade educacional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal - Feed Social */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="feed" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="feed">Feed Principal</TabsTrigger>
                  <TabsTrigger value="following">Seguindo</TabsTrigger>
                  <TabsTrigger value="saved">Salvos</TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="space-y-6">
                  {/* Barra de Pesquisa */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          placeholder="Pesquisar publicações, instituições..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts do Feed */}
                  {feedPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{post.avatar}</div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{post.institution}</h3>
                              <p className="text-sm text-gray-500">{post.time}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Seguir
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        {post.image && (
                          <div className="mb-4">
                            <img 
                              src={post.image} 
                              alt="Post" 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-6">
                            <button 
                              onClick={() => handleInteraction(post.id, 'like')}
                              className={`flex items-center space-x-2 transition-colors ${
                                post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                              }`}
                            >
                              <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            
                            <button 
                              onClick={() => handleInteraction(post.id, 'comment')}
                              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <MessageCircle className="h-5 w-5" />
                              <span>{post.comments}</span>
                            </button>
                            
                            <div className="relative group">
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                                <Share2 className="h-5 w-5" />
                                <span>{post.shares}</span>
                              </button>
                              
                              {/* Menu de compartilhamento */}
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                                <button 
                                  onClick={() => handleShareExternal(post.id, 'whatsapp')}
                                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                >
                                  WhatsApp
                                </button>
                                <button 
                                  onClick={() => handleShareExternal(post.id, 'facebook')}
                                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                >
                                  Facebook
                                </button>
                                <button 
                                  onClick={() => handleShareExternal(post.id, 'twitter')}
                                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                >
                                  Twitter
                                </button>
                                <button 
                                  onClick={() => handleShareExternal(post.id, 'copy')}
                                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                >
                                  Copiar Link
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleInteraction(post.id, 'bookmark')}
                            className={`transition-colors ${
                              post.isBookmarked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                            }`}
                          >
                            <BookmarkPlus className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="following">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">
                        Publicações das instituições que você segue aparecerão aqui.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="saved">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">
                        Suas publicações salvas aparecerão aqui.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar Direita */}
            <div className="space-y-6">
              {/* Próximas Atividades */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Próximas Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.dueDate}</p>
                        </div>
                        <Badge 
                          variant={activity.status === 'pending' ? 'destructive' : 'default'}
                          className="text-xs"
                        >
                          {activity.status === 'pending' ? 'Pendente' : 
                           activity.status === 'scheduled' ? 'Agendado' : 'Inscrito'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meu Progresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Conquistas</span>
                      </div>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Metas Concluídas</span>
                      </div>
                      <span className="font-semibold">8/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Instituições Seguindo</span>
                      </div>
                      <span className="font-semibold">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notificações Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Nova publicação</p>
                      <p className="text-xs text-gray-600">UAN publicou sobre bolsas de estudo</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium">Lembrete</p>
                      <p className="text-xs text-gray-600">Prova de História em 5 dias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentSocialDashboard;
