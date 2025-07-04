import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';

const VisitorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Verificar se o email já está cadastrado no Supabase Auth
      const { data: existingUser, error: fetchError } = await supabase.auth.admin.getUserByEmail(formData.email);
      if (existingUser && existingUser.user) {
        toast({
          title: "Email já cadastrado",
          description: "Já existe uma conta com este email. Tente recuperar a senha ou use outro email.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      // Gerar código de verificação
      const verificationCode = Math.random().toString().substr(2, 6);

      // Salvar dados temporários no banco
      const { error: insertError } = await supabase
        .from('verification_codes')
        .insert({
          email: formData.email,
          code: verificationCode,
          user_type: 'visitor',
          user_data: {
            name: formData.name,
            email: formData.email,
            password: formData.password
          },
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
        });

      if (insertError) throw insertError;

      // Enviar email de verificação
      const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          email: formData.email,
          code: verificationCode,
          userType: 'visitor'
        }
      });

      if (emailError) throw emailError;

      toast({
        title: "Código enviado!",
        description: "Verifique seu email para continuar",
      });

      // Redirecionar para página de verificação
      navigate('/verify-email', {
        state: {
          email: formData.email,
          userType: 'visitor',
          userData: {
            name: formData.name,
            email: formData.email,
            password: formData.password
          }
        }
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erro ao criar conta",
        description: error?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <Link to="/register" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar às opções
              </Link>
              <CardTitle className="text-2xl">Criar Conta de Visitante</CardTitle>
              <CardDescription>
                Explore as melhores instituições de ensino em Angola
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha segura"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Aceito os{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      termos de uso
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                      política de privacidade
                    </Link>
                  </label>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando código..." : "Criar Conta"}
                </Button>
                
                <div className="flex flex-col space-y-2 w-full">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/login')}
                  >
                    Já tenho conta - Entrar
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => navigate('/')}
                  >
                    Voltar ao Início
                  </Button>
                </div>
                
                <p className="text-sm text-center text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Entrar
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VisitorRegister;
