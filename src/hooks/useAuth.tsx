
import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/types/user";

// AuthContext para uso global (provider/consumer)
interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { email: string; password: string; name: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  };

  useEffect(() => {
    // Listener de auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Usar setTimeout para evitar deadlock
        setTimeout(async () => {
          const profile = await fetchUserProfile(session.user.id);
          console.log('Profile fetched:', profile);
          setUserProfile(profile);
          setIsLoading(false);
        }, 0);
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    // Sessão inicial
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          console.log('Initial profile:', profile);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  // Função login
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({
          title: "Erro ao entrar",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      toast({ title: "Login realizado com sucesso!", description: "Bem-vindo(a) de volta.", duration: 3000 });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Função signup
  const signup = async ({ email, password, name }: { email: string, password: string, name: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: 'visitor', user_type: 'visitor' },
          emailRedirectTo: `${window.location.origin}/`,
        }
      });
      if (error) {
        toast({
          title: "Erro ao registrar",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      toast({
        title: "Cadastro realizado!",
        description: "Conta criada com sucesso. Você pode fazer login agora.",
        duration: 4000,
      });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  // Função logout
  const logout = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setUser(null);
    setUserProfile(null);
    setSession(null);
    window.location.href = "/login";
  };

  // Função recuperação de senha
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) {
      toast({
        title: "Erro ao solicitar redefinição",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
    toast({
      title: "Email enviado",
      description: "Verifique sua caixa de entrada para redefinir a senha."
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      session, 
      login, 
      signup, 
      logout, 
      resetPassword, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
