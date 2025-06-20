
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Search, Filter, MapPin, Calendar, Users, GraduationCap, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { usePosts } from '@/hooks/usePosts';
import { useInstitutions } from '@/hooks/useInstitutions';
import PostCard from '@/components/PostCard';

const VisitorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts = [] } = usePosts();
  const { data: institutions = [] } = useInstitutions();

  // Pegar apenas os primeiros 3 posts
  const recentPosts = posts.slice(0, 3);

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
              <Button variant="outline" onClick={() => window.location.href = '/search'}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Coluna Esquerda - Posts Recentes */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Publicações Recentes
                </h2>
              </div>

              <div className="space-y-6">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-gray-500">Nenhuma publicação disponível no momento.</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => window.location.href = '/feed'}
                      >
                        Ver Todas as Publicações
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {recentPosts.length > 0 && (
                <div className="mt-6 text-center">
                  <Button onClick={() => window.location.href = '/feed'}>
                    Ver Todas as Publicações
                  </Button>
                </div>
              )}
            </div>

            {/* Coluna Direita - Estatísticas e Ações */}
            <div className="lg:col-span-2">
              {/* Estatísticas Rápidas */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Descobrir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{institutions.length}</p>
                      <p className="text-sm text-gray-600">Instituições</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">{posts.length}</p>
                      <p className="text-sm text-gray-600">Publicações</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">18</p>
                      <p className="text-sm text-gray-600">Províncias</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">4</p>
                      <p className="text-sm text-gray-600">Níveis de Ensino</p>
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
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.location.href = '/search'}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Explorar Instituições
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.location.href = '/feed'}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Feed Educacional
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.location.href = '/login'}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Fazer Login
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.location.href = '/register'}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Criar Conta
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
