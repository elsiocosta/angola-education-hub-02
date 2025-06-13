
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600">
              Como protegemos e utilizamos os seus dados pessoais
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Última atualização: 13 de Junho de 2024
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Proteção Total</p>
            </div>
            <div className="text-center">
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Dados Seguros</p>
            </div>
            <div className="text-center">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Transparência</p>
            </div>
            <div className="text-center">
              <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Controle Total</p>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informações que Coletamos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1.1 Dados de Cadastro</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Nome completo</li>
                    <li>Endereço de email</li>
                    <li>Telefone (para instituições)</li>
                    <li>Localização da instituição</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">1.2 Dados de Uso</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Interações (curtidas, seguidores, comentários)</li>
                    <li>Endereço IP e informações do dispositivo</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Como Utilizamos os Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Facilitar o cadastro e autenticação de usuários</li>
                  <li>Permitir interações entre instituições e estudantes</li>
                  <li>Processar candidaturas para ensino superior</li>
                  <li>Gerar estatísticas e relatórios para administradores</li>
                  <li>Melhorar a experiência do usuário na plataforma</li>
                  <li>Enviar notificações importantes sobre o serviço</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Compartilhamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  <strong>Não vendemos</strong> ou alugamos dados pessoais a terceiros. Compartilhamos dados apenas:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Com instituições quando você se candidata a cursos</li>
                  <li>Para exibir perfis públicos conforme suas configurações de privacidade</li>
                  <li>Com autoridades quando legalmente obrigatório</li>
                  <li>Com provedores de serviço que nos ajudam a operar a plataforma</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Medidas de Proteção:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>Autenticação segura com verificação de email</li>
                    <li>Acesso restrito aos dados por funcionários autorizados</li>
                    <li>Backups regulares e seguros</li>
                    <li>Monitoramento contínuo de atividades suspeitas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">Você tem o direito de:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Acessar</strong> seus dados pessoais armazenados</li>
                  <li><strong>Corrigir</strong> informações incorretas ou incompletas</li>
                  <li><strong>Excluir</strong> sua conta e dados associados</li>
                  <li><strong>Exportar</strong> seus dados em formato legível</li>
                  <li><strong>Restringir</strong> o processamento de dados específicos</li>
                  <li><strong>Retirar</strong> consentimento a qualquer momento</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Dados de cadastro: mantidos enquanto a conta estiver ativa</li>
                  <li>Dados de candidaturas: 7 anos após conclusão do processo</li>
                  <li>Logs de atividade: 2 anos para fins de segurança</li>
                  <li>Dados financeiros: conforme exigências legais contábeis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Utilizamos cookies essenciais para o funcionamento da plataforma e cookies 
                  de análise para melhorar nossos serviços. Você pode gerenciar suas preferências 
                  de cookies nas configurações do navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Alterações na Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Podemos atualizar esta política periodicamente. Notificaremos sobre 
                  mudanças significativas por email ou através de avisos na plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contato para Questões de Privacidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Encarregado de Proteção de Dados:</strong>
                  </p>
                  <p className="text-gray-700">Email: privacidade@angoeducation.ao</p>
                  <p className="text-gray-700">Telefone: +244 xxx xxx xxx</p>
                  <p className="text-gray-700">
                    Ou utilize nossa página de <a href="/support" className="text-blue-600 hover:underline">suporte</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
