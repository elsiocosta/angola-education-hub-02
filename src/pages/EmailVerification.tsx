import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    document.title = 'Verificação de Email | Ango Education';
    
    // Simular verificação
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus('success');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    setCountdown(60);
    // Lógica para reenviar email
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <CardTitle>Verificando seu email...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Aguarde enquanto confirmamos sua conta.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        {verificationStatus === 'success' ? (
          <>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Email Verificado!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Sua conta foi verificada com sucesso. Agora você pode acessar todos os recursos da plataforma.
              </p>
              
              <div className="space-y-3">
                <Link to="/login" className="block">
                  <Button className="w-full">
                    Fazer Login
                  </Button>
                </Link>
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        ) : verificationStatus === 'error' ? (
          <>
            <CardHeader className="text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-red-800">Erro na Verificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Não foi possível verificar seu email. O link pode ter expirado ou já foi usado.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail} 
                  className="w-full"
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Reenviar em ${countdown}s` : 'Reenviar Email'}
                </Button>
                <Link to="/register" className="block">
                  <Button variant="outline" className="w-full">
                    Criar Nova Conta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle>Verifique seu Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                Enviamos um link de verificação para seu email. Clique no link para ativar sua conta.
              </p>
              
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Não recebeu o email? Verifique sua pasta de spam ou lixo eletrônico.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail} 
                  variant="outline" 
                  className="w-full"
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Reenviar em ${countdown}s` : 'Reenviar Email'}
                </Button>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default EmailVerification;