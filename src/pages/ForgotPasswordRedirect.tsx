
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ForgotPasswordRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar automaticamente após 5 segundos
    const timer = setTimeout(() => {
      navigate('/reset-password');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Email Enviado com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Enviamos um email com as instruções para redefinir sua senha.
                </p>
                <p className="text-sm text-gray-500">
                  Verifique sua caixa de entrada e também a pasta de spam.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Próximos passos:</strong>
                </p>
                <ol className="text-xs text-blue-700 text-left space-y-1">
                  <li>1. Abra o email que enviamos</li>
                  <li>2. Clique no link "Redefinir Senha"</li>
                  <li>3. Crie uma nova senha segura</li>
                  <li>4. Faça login com sua nova senha</li>
                </ol>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/reset-password')}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Ir para Redefinir Senha
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                
                <p className="text-xs text-gray-500">
                  Redirecionamento automático em 5 segundos...
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Não recebeu o email?{' '}
                  <button 
                    onClick={() => navigate('/forgot-password')}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Enviar novamente
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordRedirect;
