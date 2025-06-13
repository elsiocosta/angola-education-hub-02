
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageSquare, Share2, BookOpen, Calendar, MapPin, Users, GraduationCap, School, Building2 } from 'lucide-react';

const Feed = () => {
  const [filter, setFilter] = useState('todos');

  const posts = [
    {
      id: 1,
      institution: 'Universidade Agostinho Neto',
      institutionLogo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&crop=center',
      type: 'university',
      province: 'Luanda',
      title: 'Inscrições Abertas para 2024',
      content: 'Estão abertas as inscrições para o ano lectivo 2024. Candidaturas até 30 de Janeiro para todos os cursos de graduação e pós-graduação.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=400&fit=crop&crop=center',
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: '2 horas',
      category: 'inscricoes'
    },
    {
      id: 2,
      institution: 'Instituto Politécnico de Luanda',
      institutionLogo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop&crop=center',
      type: 'high-school',
      province: 'Luanda',
      title: 'Novo Laboratório de Informática',
      content: 'Inauguramos nosso novo laboratório com 50 computadores modernos para os cursos técnicos de informática e programação.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center',
      likes: 156,
      comments: 23,
      shares: 8,
      timeAgo: '5 horas',
      category: 'infraestrutura'
    },
    {
      id: 3,
      institution: 'Colégio São José',
      institutionLogo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop&crop=center',
      type: 'secondary',
      province: 'Benguela',
      title: 'Feira de Ciências 2024',
      content: 'Os nossos alunos do ensino secundário apresentarão seus projetos de ciências no próximo sábado. Entrada gratuita para toda a comunidade.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=400&fit=crop&crop=center',
      likes: 89,
      comments: 15,
      shares: 5,
      timeAgo: '1 dia',
      category: 'eventos'
    },
    {
      id: 4,
      institution: 'Escola Primária Josina Machel',
      institutionLogo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop&crop=center',
      type: 'primary',
      province: 'Huambo',
      title: 'Programa de Alfabetização Digital',
      content: 'Lançamento do novo programa de alfabetização digital para crianças da 1ª à 6ª classe. Computadores doados pela comunidade internacional.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center',
      likes: 142,
      comments: 28,
      shares: 18,
      timeAgo: '1 dia',
      category: 'programas'
    },
    {
      id: 5,
      institution: 'Universidade Católica de Angola',
      institutionLogo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&crop=center',
      type: 'university',
      province: 'Luanda',
      title: 'Conferência Internacional de Educação',
      content: 'Participe da nossa conferência sobre o futuro da educação em Angola. Palestrantes internacionais e nacionais.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=400&fit=crop&crop=center',
      likes: 198,
      comments: 32,
      shares: 24,
      timeAgo: '3 horas',
      category: 'eventos'
    },
    {
      id: 6,
      institution: 'Instituto Industrial de Luanda',
      institutionLogo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop&crop=center',
      type: 'high-school',
      province: 'Luanda',
      title: 'Cursos Técnicos 2024',
      content: 'Abertos os cursos técnicos em mecânica, eletricidade, soldadura e construção civil. Formação prática garantida.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center',
      likes: 76,
      comments: 12,
      shares: 6,
      timeAgo: '6 horas',
      category: 'cursos'
    }
  ];

  const filteredPosts = posts.filter(post => {
    if (filter === 'todos') return true;
    if (filter === 'universidades') return post.type === 'university';
    if (filter === 'medio') return post.type === 'high-school';
    if (filter === 'secundario') return post.type === 'secondary';
    if (filter === 'primario') return post.type === 'primary';
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university': return <GraduationCap className="h-4 w-4" />;
      case 'high-school': return <Building2 className="h-4 w-4" />;
      case 'secondary': return <School className="h-4 w-4" />;
      case 'primary': return <BookOpen className="h-4 w-4" />;
      default: return <School className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'university': return 'Universitário';
      case 'high-school': return 'Ensino Médio';
      case 'secondary': return 'Ensino Secundário';
      case 'primary': return 'Ensino Primário';
      default: return 'Ensino';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'university': return 'bg-purple-100 text-purple-800';
      case 'high-school': return 'bg-blue-100 text-blue-800';
      case 'secondary': return 'bg-green-100 text-green-800';
      case 'primary': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed Educacional</h1>
            <p className="text-gray-600 mb-6">
              Acompanhe as últimas novidades das instituições de ensino de todos os níveis em Angola
            </p>
            
            {/* Filtros Equilibrados */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'todos' ? 'default' : 'outline'}
                onClick={() => setFilter('todos')}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Todos os Níveis</span>
              </Button>
              <Button
                variant={filter === 'universidades' ? 'default' : 'outline'}
                onClick={() => setFilter('universidades')}
                size="sm"
                className="flex items-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Universidades</span>
              </Button>
              <Button
                variant={filter === 'medio' ? 'default' : 'outline'}
                onClick={() => setFilter('medio')}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Building2 className="h-4 w-4" />
                <span>Ensino Médio</span>
              </Button>
              <Button
                variant={filter === 'secundario' ? 'default' : 'outline'}
                onClick={() => setFilter('secundario')}
                size="sm"
                className="flex items-center space-x-2"
              >
                <School className="h-4 w-4" />
                <span>Ensino Secundário</span>
              </Button>
              <Button
                variant={filter === 'primario' ? 'default' : 'outline'}
                onClick={() => setFilter('primario')}
                size="sm"
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Ensino Primário</span>
              </Button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.institutionLogo} alt={post.institution} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                          {post.institution.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
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
                    <Badge className={`flex items-center space-x-1 ${getTypeColor(post.type)}`}>
                      {getTypeIcon(post.type)}
                      <span>{getTypeName(post.type)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Interações */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-red-600">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-green-600">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                      Ver Instituição
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma publicação encontrada
              </h3>
              <p className="text-gray-600">
                Não há publicações para este filtro no momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
