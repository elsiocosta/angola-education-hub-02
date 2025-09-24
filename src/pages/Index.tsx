import React, { useState } from 'react';
import { MapPin, Search, GraduationCap, Users, Calendar, Star, Play, ChevronRight, Shield, Video, DollarSign, Globe, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import FeaturedInstitutions from '@/components/FeaturedInstitutions';
import StatsSection from '@/components/StatsSection';
import Layout from '@/components/Layout';
import AdvancedSearch from '@/components/AdvancedSearch';
import LiveStats from '@/components/LiveStats';
import FeedbackSystem from '@/components/FeedbackSystem';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div id="main-content">
        {/* Hero Section */}
        <HeroSection />

        {/* Platform Mission */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Primeira Rede Digital do Ensino Angolano
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Criamos uma plataforma digital que centraliza informações sobre todas as instituições de ensino em Angola (primário, secundário, médio e superior), promovendo transparência, conectividade e modernização educacional.
              </p>
              
              {/* Adicionar estatísticas ao vivo */}
              <div className="mt-12">
                <LiveStats />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Mapeamento Completo</h3>
                  <p className="text-gray-600">Localização geográfica de todas as instituições de ensino em Angola</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Transparência Total</h3>
                  <p className="text-gray-600">Acesso a dados relevantes, propinas, cursos e estrutura organizacional</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Modernização Digital</h3>
                  <p className="text-gray-600">Candidaturas online, rede social educacional e gestão moderna</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Search Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Encontre a Instituição Ideal
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Use nossa busca avançada para encontrar exatamente o que procura
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <AdvancedSearch onSearch={(filters) => {
                console.log('Filtros de busca:', filters);
                window.location.href = '/search';
              }} />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <MapSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Featured Institutions */}
        <FeaturedInstitutions />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Faça Parte da Revolução Digital do Ensino Angolano
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Junte-se às milhares de instituições que já modernizaram sua presença digital e conectaram-se com estudantes em todo o país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Registar Minha Instituição
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Explorar Instituições
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;