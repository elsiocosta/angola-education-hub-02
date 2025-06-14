
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [changed, setChanged] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Senha muito curta", description: "A senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Erro ao redefinir senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha atualizada!", description: "Acesse com sua nova senha." });
      setChanged(true);
      setTimeout(() => window.location.href = "/login", 2000);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Definir Nova Senha</CardTitle>
          </CardHeader>
          <CardContent>
            {changed ? (
              <div className="text-green-600">Senha alterada! Redirecionando para login...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nova senha"
                />
                <Button type="submit" className="w-full">Atualizar Senha</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword;
