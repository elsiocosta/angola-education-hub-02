
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: 13 de Junho de 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Ao acessar e usar a plataforma Ango Education, você concorda em cumprir e estar vinculado 
                  aos seguintes termos e condições de uso.
                </p>
                <p className="text-gray-700">
                  Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  A Ango Education é uma plataforma digital que centraliza informações sobre instituições 
                  de ensino em Angola, oferecendo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Mapeamento geográfico de instituições educacionais</li>
                  <li>Sistema de cadastro e gestão de perfis institucionais</li>
                  <li>Candidaturas online para ensino superior</li>
                  <li>Rede social educacional para interação entre instituições e estudantes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Tipos de Conta e Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">3.1 Visitantes</h4>
                  <p className="text-gray-700">
                    Podem pesquisar instituições, visualizar perfis públicos e seguir escolas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3.2 Administradores Institucionais</h4>
                  <p className="text-gray-700">
                    Responsáveis por manter informações atualizadas da instituição e gerir membros da equipe.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3.3 Membros Institucionais</h4>
                  <p className="text-gray-700">
                    Acesso mediante convite do administrador institucional, com permissões específicas conforme o cargo.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Uso Responsável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">Os usuários comprometem-se a:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Não usar a plataforma para fins ilegais ou não autorizados</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                  <li>Manter a confidencialidade das credenciais de acesso</li>
                  <li>Não publicar conteúdo ofensivo, discriminatório ou inadequado</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Pagamentos e Mensalidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  As instituições devem pagar mensalidades conforme o plano escolhido:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ensino Primário: 9.000 KZ/mês</li>
                  <li>Ensino Secundário: 15.000 KZ/mês</li>
                  <li>Ensino Superior: 35.000 KZ/mês</li>
                </ul>
                <p className="text-gray-700">
                  O não pagamento pode resultar na suspensão dos serviços.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Todo o conteúdo da plataforma, incluindo textos, gráficos, logos e software, 
                  é propriedade da Ango Education ou de seus licenciadores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação na plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Para questões sobre estes termos, entre em contato através da página de suporte 
                  ou pelo email: termos@angoeducation.ao
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
