
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await resetPassword(email);
    if (ok) setSent(true);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Recuperar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-green-600">Verifique seu e-mail para redefinir a senha.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                />
                <Button type="submit" className="w-full">Enviar link de redefinição</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
