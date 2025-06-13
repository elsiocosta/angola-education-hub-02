
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageSquare, Share2, BookOpen, Calendar, MapPin, Users } from 'lucide-react';

const Feed = () => {
  const [filter, setFilter] = useState('todos');

  const posts = [
    {
      id: 1,
      institution: 'Universidade Agostinho Neto',
      institutionLogo: '/placeholder.svg',
      type: 'university',
      province: 'Luanda',
      title: 'Inscrições Abertas para 2024',
      content: 'Estão abertas as inscrições para o ano lectivo 2024. Candidaturas até 30 de Janeiro.',
      image: '/placeholder.svg',
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: '2 horas',
      category: 'inscricoes'
    },
    {
      id: 2,
      institution: 'Instituto Superior de Ciências da Educação',
      institutionLogo: '/placeholder.svg',
      type: 'university',
      province: 'Luanda',
      title: 'Novo Laboratório de Informática',
      content: 'Inauguramos nosso novo laboratório com 50 computadores modernos para os cursos de tecnologia.',
      image: '/placeholder.svg',
      likes: 156,
      comments: 23,
      shares: 8,
      timeAgo: '5 horas',
      category: 'infraestrutura'
    },
    {
      id: 3,
      institution: 'Colégio São José',
      institutionLogo: '/placeholder.svg',
      type: 'secondary',
      province: 'Benguela',
      title: 'Feira de Ciências 2024',
      content: 'Os nossos alunos apresentarão seus projetos de ciências no próximo sábado. Entrada gratuita.',
      image: '/placeholder.svg',
      likes: 89,
      comments: 15,
      shares: 5,
      timeAgo: '1 dia',
      category: 'eventos'
    }
  ];

  const filteredPosts = posts.filter(post => {
    if (filter === 'todos') return true;
    if (filter === 'universidades') return post.type === 'university';
    if (filter === 'secundario') return post.type === 'secondary';
    if (filter === 'primario') return post.type === 'primary';
    return true;
  });

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed Educacional</h1>
            <p className="text-gray-600 mb-6">Acompanhe as últimas novidades das instituições de ensino</p>
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'todos' ? 'default' : 'outline'}
                onClick={() => setFilter('todos')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filter === 'universidades' ? 'default' : 'outline'}
                onClick={() => setFilter('universidades')}
                size="sm"
              >
                Universidades
              </Button>
              <Button
                variant={filter === 'secundario' ? 'default' : 'outline'}
                onClick={() => setFilter('secundario')}
                size="sm"
              >
                Ensino Secundário
              </Button>
              <Button
                variant={filter === 'primario' ? 'default' : 'outline'}
                onClick={() => setFilter('primario')}
                size="sm"
              >
                Ensino Primário
              </Button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.institutionLogo}
                        alt={post.institution}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{post.institution}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>{post.province}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {post.type === 'university' ? 'Superior' : 
                       post.type === 'secondary' ? 'Secundário' : 'Primário'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Interações */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Instituição
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
