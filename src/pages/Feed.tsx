
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Building2, School, BookOpen } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';

const Feed = () => {
  const [filter, setFilter] = useState('todos');
  const { data: posts = [], isLoading, error } = usePosts();

  const filteredPosts = posts.filter(post => {
    if (filter === 'todos') return true;
    if (filter === 'universidades') return post.institutions?.institution_type === 'university';
    if (filter === 'medio') return post.institutions?.institution_type === 'high_school';
    if (filter === 'secundario') return post.institutions?.institution_type === 'secondary';
    if (filter === 'primario') return post.institutions?.institution_type === 'primary';
    return true;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando publicações...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <p className="text-red-600">Erro ao carregar publicações. Tente novamente.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Feed Educacional</h1>
            <p className="text-gray-600 mb-6">
              Acompanhe as últimas novidades das instituições de ensino de todos os níveis em Angola
            </p>
            
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

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma publicação encontrada
              </h3>
              <p className="text-gray-600">
                {filter === 'todos' 
                  ? 'Não há publicações disponíveis no momento.'
                  : 'Não há publicações para este filtro no momento.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
