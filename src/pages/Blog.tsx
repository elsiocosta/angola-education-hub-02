import React from 'react';
import { Calendar, User, ArrowRight, Tag, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "O Futuro da Educação Digital em Angola: Tendências e Oportunidades",
    excerpt: "Descubra como a tecnologia está transformando o panorama educacional angolano e quais são as principais tendências para os próximos anos.",
    content: "A digitalização do ensino em Angola tem acelerado significativamente nos últimos anos...",
    author: "Carlos Silva",
    date: "15 de Janeiro, 2024",
    readTime: "8 min",
    category: "Tecnologia Educacional",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "Como Escolher a Universidade Ideal: Guia Completo 2024",
      excerpt: "Dicas essenciais para estudantes que estão a escolher onde continuar os seus estudos superiores.",
      author: "Maria Santos",
      date: "12 de Janeiro, 2024",
      readTime: "5 min",
      category: "Orientação Académica",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Ensino Técnico em Angola: Oportunidades de Carreira",
      excerpt: "Explore as diversas opções de formação técnica e as oportunidades profissionais que oferecem.",
      author: "João Costa",
      date: "10 de Janeiro, 2024",
      readTime: "6 min",
      category: "Ensino Técnico",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Bolsas de Estudo em Angola: Como Candidatar-se",
      excerpt: "Informações sobre programas de bolsas disponíveis e como aumentar suas chances de sucesso.",
      author: "Ana Ferreira",
      date: "8 de Janeiro, 2024",
      readTime: "7 min",
      category: "Financiamento",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Inovação Pedagógica: Métodos de Ensino Modernos",
      excerpt: "Como as escolas angolanas estão adoptando novas metodologias para melhorar a aprendizagem.",
      author: "Pedro Nunes",
      date: "5 de Janeiro, 2024",
      readTime: "4 min",
      category: "Metodologia",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Educação Inclusiva: Progresso em Angola",
      excerpt: "Iniciativas que promovem a inclusão de estudantes com necessidades especiais no sistema educativo.",
      author: "Rita Mendes",
      date: "3 de Janeiro, 2024",
      readTime: "6 min",
      category: "Inclusão",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=250&fit=crop"
    }
  ];

  const categories = [
    "Tecnologia Educacional",
    "Orientação Académica", 
    "Ensino Técnico",
    "Financiamento",
    "Metodologia",
    "Inclusão",
    "Políticas Educacionais",
    "Inovação"
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Ango Education
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Artigos, insights e novidades sobre educação, tecnologia e o futuro do ensino em Angola
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="bg-blue-600 text-white w-fit mb-4">
                    Artigo em Destaque
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 w-fit">
                    Ler Artigo Completo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Artigos Recentes</h2>
                <Button variant="outline">
                  Ver Todos os Artigos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge 
                        className="absolute top-4 left-4 bg-white/90 text-gray-800"
                        variant="secondary"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Ler Mais
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8"
                >
                  Carregar Mais Artigos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link 
                        key={category}
                        to={`/blog/category/${category.toLowerCase().replace(' ', '-')}`}
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription>
                    Receba os nossos artigos mais recentes no seu email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input 
                    type="email"
                    placeholder="Seu email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                    Subscrever
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Artigos Populares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex space-x-3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Follow Us - UPDATED */}
              <Card>
                <CardHeader>
                  <CardTitle>Siga-nos</CardTitle>
                  <CardDescription>
                    Conecte-se conosco nas redes sociais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    <a 
                      href="https://www.facebook.com/angoeducation" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </a>
                    <a 
                      href="https://www.instagram.com/angoeducation" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ango-education-067842372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
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

export default Blog;
