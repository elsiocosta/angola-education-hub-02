
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const RegisterOptions = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Criar Conta</h1>
            <p className="text-gray-600">Escolha o tipo de conta que melhor se adequa ao seu perfil</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visitante/Estudante */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <User className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Visitante / Estudante</CardTitle>
                <CardDescription>
                  Explore instituições, siga escolas e conecte-se com o ensino angolano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Pesquisar instituições</li>
                  <li>• Seguir escolas favoritas</li>
                  <li>• Curtir e partilhar publicações</li>
                  <li>• Candidatar-se a cursos</li>
                </ul>
                <Link to="/register/visitor">
                  <Button className="w-full">Criar Conta de Visitante</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Administrador Institucional */}
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader className="text-center">
                <Building className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Administrador Institucional</CardTitle>
                <CardDescription>
                  Registre sua escola, instituto ou universidade na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Gerir perfil da instituição</li>
                  <li>• Adicionar membros da equipe</li>
                  <li>• Publicar conteúdos</li>
                  <li>• Receber candidaturas</li>
                </ul>
                <Link to="/register/institution">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Registrar Instituição
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Funcionário */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Funcionário de Instituição</CardTitle>
                <CardDescription>
                  Acesso restrito mediante convite do administrador
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <div className="text-sm text-purple-800">
                      <p className="font-medium mb-1">Acesso por Convite</p>
                      <p>Solicite ao administrador da sua instituição que envie um convite de acesso com suas credenciais.</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Aguardando Convite
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterOptions;
