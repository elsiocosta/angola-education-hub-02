
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';

const EmailVerification = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signup } = useAuth();

  const email = location.state?.email;
  const userType = location.state?.userType;
  const userData = location.state?.userData;

  useEffect(() => {
    if (!email || !userType || !userData) {
      navigate('/register');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Código expirado",
            description: "Solicite um novo código de verificação",
            variant: "destructive",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, userType, userData, navigate, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast({
        title: "Código inválido",
        description: "Digite o código de 6 dígitos",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // Verificar código no banco de dados
      const { data: verificationData, error: verifyError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (verifyError || !verificationData) {
        toast({
          title: "Código inválido",
          description: "Código incorreto ou expirado",
          variant: "destructive",
        });
        return;
      }

      // Marcar código como verificado
      await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', verificationData.id);

      // Criar conta no Supabase Auth
      const signupSuccess = await signup({
        email: userData.email,
        password: userData.password,
        name: userData.name
      });

      if (signupSuccess) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Você será redirecionado para o dashboard",
        });

        // Redirecionar para o dashboard correspondente
        setTimeout(() => {
          if (userType === 'visitor') {
            navigate('/dashboard');
          } else {
            navigate('/dashboard/institution');
          }
        }, 2000);
      }

    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Erro na verificação",
        description: "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      // Gerar novo código
      const newCode = Math.random().toString().substr(2, 6);

      // Salvar no banco
      await supabase
        .from('verification_codes')
        .insert({
          email,
          code: newCode,
          user_type: userType,
          user_data: userData,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
        });

      // Enviar email
      const { error } = await supabase.functions.invoke('send-verification-email', {
        body: { email, code: newCode, userType }
      });

      if (error) throw error;

      toast({
        title: "Código reenviado",
        description: "Verifique seu email",
      });

      setTimeLeft(600);
      setCode('');

    } catch (error) {
      console.error('Resend error:', error);
      toast({
        title: "Erro ao reenviar",
        description: "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/register')}
                className="mb-4 self-start"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              
              <CardTitle className="text-2xl">Verifique seu Email</CardTitle>
              <CardDescription className="space-y-2">
                <p>Enviamos um código de 6 dígitos para:</p>
                <p className="font-medium text-gray-900">{email}</p>
                <p className="text-sm text-gray-500">
                  Código expira em: {formatTime(timeLeft)}
                </p>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Digite o código de verificação
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button 
                onClick={handleVerify}
                className="w-full"
                disabled={code.length !== 6 || isVerifying || timeLeft === 0}
              >
                {isVerifying ? "Verificando..." : "Verificar Código"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Não recebeu o código?
                </p>
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isResending || timeLeft > 540} // Allow resend after 1 minute
                  className="text-blue-600"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    "Reenviar código"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerification;
