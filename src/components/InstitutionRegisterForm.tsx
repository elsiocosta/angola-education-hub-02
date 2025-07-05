
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const InstitutionRegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: '',
    province: ''
  });

  const educationTypes = [
    'Ensino Primário',
    'Ensino Secundário',
    'Ensino Médio Técnico',
    'Ensino Superior'
  ];

  const provinces = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 
    'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 
    'Icolo e Bengo', 'Luanda', 'Lunda Norte', 'Lunda Sul', 
    'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || formData.password.length < 6) {
      toast({ 
        title: "Senha curta", 
        description: "Mínimo 6 caracteres", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);

    try {
      // Gerar código de verificação
      const verificationCode = Math.random().toString().substr(2, 6);

      console.log('Inserting verification code for institution:', formData.email);

      // Salvar dados temporários no banco
      const { error: insertError } = await supabase
        .from('verification_codes')
        .insert({
          email: formData.email,
          code: verificationCode,
          user_type: 'institution',
          user_data: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            type: formData.type,
            province: formData.province
          },
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      console.log('Sending verification email to institution:', formData.email);

      // Enviar email de verificação
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          email: formData.email,
          code: verificationCode,
          userType: 'institution'
        }
      });

      console.log('Email function response:', { emailData, emailError });

      if (emailError) {
        console.error('Email error:', emailError);
        throw new Error(`Erro ao enviar email: ${emailError.message}`);
      }

      toast({
        title: "Código enviado!",
        description: "Verifique seu email para continuar",
      });

      // Redirecionar para página de verificação
      navigate('/verify-email', {
        state: {
          email: formData.email,
          userType: 'institution',
          userData: formData
        }
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = "Tente novamente mais tarde";
      
      if (error?.message?.includes('duplicate key')) {
        errorMessage = "Este email já está sendo processado. Verifique sua caixa de entrada.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erro ao registrar",
        description: errorMessage,
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
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Registar Instituição</CardTitle>
        <CardDescription>
          Crie uma conta para sua escola, instituto ou universidade
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome da Instituição
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="name"
                type="text"
                placeholder="Nome completo da instituição"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="contato@instituicao.ao"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="phone"
                type="tel"
                placeholder="+244 xxx xxx xxx"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Ensino</label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {educationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Província</label>
              <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <p className="text-sm text-center text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default InstitutionRegisterForm;
