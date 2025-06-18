
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Search, Filter, MapPin, Calendar, Users, GraduationCap, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const VisitorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para posts sugeridos
  const suggestedPosts = [
    {
      id: 1,
      institution: "Universidade Agostinho Neto",
      avatar: "🎓",
      content: "Abertas as inscrições para o ano letivo 2024! Venha fazer parte da maior universidade de Angola.",
      image: "/placeholder.svg",
      likes: 124,
      comments: 23,
      shares: 8,
      time: "2h",
      location: "Luanda"
    },
    {
      id: 2,
      institution: "Instituto Médio Técnico",
      avatar: "🔧",
      content: "Novos cursos técnicos disponíveis: Mecânica Automotiva, Eletricidade e Informática.",
      likes: 89,
      comments: 15,
      shares: 12,
      time: "4h",
      location: "Benguela"
    },
    {
      id: 3,
      institution: "Escola Primária do Futuro",
      avatar: "📚",
      content: "Celebrando o dia da criança com atividades especiais! 🎉",
      image: "/placeholder.svg",
      likes: 203,
      comments: 45,
      shares: 18,
      time: "6h",
      location: "Huambo"
    }
  ];

  // Mock data para instituições seguidas
  const followedInstitutions = [
    {
      id: 1,
      name: "UAN - Universidade Agostinho Neto",
      avatar: "🎓",
      followers: "12.5K",
      newPosts: 3
    },
    {
      id: 2,
      name: "ISCED - Luanda",
      avatar: "👨‍🏫",
      followers: "8.2K",
      newPosts: 1
    },
    {
      id: 3,
      name: "Instituto Politécnico de Benguela",
      avatar: "🔬",
      followers: "5.8K",
      newPosts: 2
    }
  ];

  const handleLike = (postId: number) => {
    console.log(`Curtir post ${postId}`);
  };

  const handleComment = (postId: number) => {
    console.log(`Comentar post ${postId}`);
  };

  const handleShare = (postId: number) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    console.log(`Link copiado: ${postUrl}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header do Dashboard */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo à Rede Social Educacional
            </h1>
            <p className="text-gray-600">
              Descubra, conecte-se e acompanhe as melhores instituições de ensino em Angola
            </p>
          </div>

          {/* Barra de Pesquisa */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Pesquisar instituições, cursos, publicações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Coluna Esquerda - Posts Sugeridos */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Publicações Sugeridas
                </h2>
              </div>

              <div className="space-y-6">
                {suggestedPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{post.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{post.institution}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {post.location} • {post.time}
                            </div>
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
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Heart className="h-5 w-5" />
                            <span>{post.likes}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleComment(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleShare(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                          >
                            <Share2 className="h-5 w-5" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Coluna Direita - Instituições Seguidas e Sugestões */}
            <div className="lg:col-span-2">
              {/* Instituições que Segue */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Instituições que Segue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {followedInstitutions.map((institution) => (
                      <div key={institution.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{institution.avatar}</div>
                          <div>
                            <p className="font-medium text-gray-900">{institution.name}</p>
                            <p className="text-sm text-gray-500">{institution.followers} seguidores</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {institution.newPosts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {institution.newPosts}
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas Rápidas */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Descobrir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">1,500+</p>
                      <p className="text-sm text-gray-600">Instituições</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">500+</p>
                      <p className="text-sm text-gray-600">Cursos</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">100K+</p>
                      <p className="text-sm text-gray-600">Estudantes</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">21</p>
                      <p className="text-sm text-gray-600">Províncias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações Rápidas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Explorar Instituições
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver Mapa Interativo
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Meus Favoritos
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Eventos Educacionais
                    </Button>
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

export default VisitorDashboard;
