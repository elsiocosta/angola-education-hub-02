# Estrutura Organizada da Plataforma Angola Education Hub

## 📋 Visão Geral

Esta documentação descreve a nova estrutura organizada da plataforma, desde a homepage até os diferentes níveis de acesso dos usuários.

## 🏗️ Arquitetura da Aplicação

### Estrutura de Pastas
```
src/
├── components/
│   ├── guards/           # Proteção de rotas
│   ├── layout/           # Layouts específicos por perfil
│   ├── ui/              # Componentes de interface
│   └── ...              # Outros componentes
├── pages/               # Páginas da aplicação
├── hooks/               # Hooks personalizados
├── types/               # Definições de tipos TypeScript
└── utils/               # Utilitários
```

## 👥 Níveis de Acesso e Permissões

### 1. Visitante (Não Autenticado)
**Permissões:**
- Visualizar homepage
- Buscar instituições/cursos
- Ver informações públicas
- Acessar páginas institucionais (Sobre, Suporte, etc.)

**Rotas Acessíveis:**
- `/` - Homepage
- `/search` - Busca de instituições
- `/institution/:id` - Detalhes da instituição
- `/about`, `/support`, `/blog`, `/terms`, `/privacy`, `/pricing`

### 2. Visitante (Autenticado)
**Permissões:**
- Todas as permissões de visitante não autenticado
- Seguir instituições
- Curtir posts
- Acessar dashboard básico

**Rotas Adicionais:**
- `/dashboard/visitor` - Dashboard do visitante
- `/feed` - Feed social

### 3. Estudante
**Permissões:**
- Todas as permissões de visitante
- Comentar em posts
- Inscrever-se em cursos
- Acessar mensagens internas

**Rotas Específicas:**
- `/dashboard/student/*` - Dashboard completo do estudante
- `/dashboard/student/courses` - Meus cursos
- `/dashboard/student/applications` - Minhas inscrições
- `/dashboard/student/messages` - Mensagens
- `/dashboard/student/profile` - Perfil

### 4. Funcionários de Instituição

#### Secretário
**Permissões:**
- Visualizar inscrições
- Atualizar horários
- Gerenciar documentos

#### Professor
**Permissões:**
- Criar posts
- Comentar
- Visualizar seguidores

#### Coordenador de Curso
**Permissões:**
- Gerenciar cursos
- Responder perguntas
- Atualizar calendário

#### Diretor
**Permissões:**
- Visualizar estudantes
- Visualizar coordenadores
- Criar anúncios
- Ver estatísticas

#### Administrador da Instituição
**Permissões:**
- Todas as permissões anteriores
- Editar dados da instituição
- Gerenciar membros
- Publicar conteúdo
- Acesso total à instituição

**Rotas Institucionais:**
- `/dashboard/institution/*` - Dashboard institucional
- `/dashboard/institution/students` - Gestão de estudantes
- `/dashboard/institution/applications` - Gestão de inscrições
- `/dashboard/institution/reports` - Relatórios
- `/dashboard/institution/settings` - Configurações
- `/invites` - Gestão de convites
- `/courses` - Gestão de cursos
- `/messages` - Mensagens internas
- `/documents` - Documentos

### 5. Administrador da Plataforma
**Permissões:**
- Aprovar instituições
- Métricas da plataforma
- Gerenciar planos
- Acesso total à plataforma

**Rotas Administrativas:**
- `/admin/*` - Dashboard administrativo
- `/admin/institutions` - Gestão de instituições
- `/admin/users` - Gestão de usuários
- `/admin/reports` - Relatórios globais
- `/admin/settings` - Configurações da plataforma

## 🔐 Sistema de Proteção de Rotas

### Guards Implementados

```typescript
// Guards específicos por perfil
<VisitorGuard> - Apenas visitantes
<StudentGuard> - Apenas estudantes
<InstitutionStaffGuard> - Funcionários de instituição
<InstitutionAdminGuard> - Apenas administradores de instituição
<PlatformAdminGuard> - Apenas administradores da plataforma
<PublicOnlyGuard> - Apenas usuários não logados
```

### Exemplo de Uso
```typescript
<Route path="/dashboard/student/*" element={
  <StudentGuard>
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/courses" element={<StudentCourses />} />
      </Routes>
    </DashboardLayout>
  </StudentGuard>
} />
```

## 🎨 Layouts Específicos

### DashboardLayout
- Sidebar colapsável com navegação por perfil
- Header com informações do usuário
- Footer consistente
- Navegação dinâmica baseada no papel do usuário

### Sidebar Dinâmica
A sidebar mostra diferentes itens baseado no perfil:

**Estudante:**
- Dashboard
- Meus Cursos
- Inscrições
- Mensagens
- Feed Social
- Perfil

**Funcionário Institucional:**
- Dashboard
- Cursos
- Estudantes
- Inscrições
- Convites
- Mensagens
- Relatórios
- Configurações

**Administrador da Plataforma:**
- Dashboard
- Instituições
- Usuários
- Relatórios
- Configurações

## 🔄 Fluxo de Navegação

### 1. Usuário Não Logado
```
Homepage → Busca → Detalhes da Instituição → Login/Cadastro
```

### 2. Usuário Logado
```
Login → DashboardRedirect → Dashboard Específico por Perfil
```

### 3. Redirecionamento Inteligente
- `/dashboard` redireciona automaticamente para o dashboard correto
- Usuários logados são redirecionados de páginas de autenticação
- Acesso não autorizado mostra página de erro

## 🛡️ Segurança

### Validações Implementadas
1. **Frontend:** Guards protegem rotas baseado em permissões
2. **Backend:** Validação de permissões no Supabase
3. **Sessão:** Verificação de autenticação em todas as rotas protegidas
4. **Perfil:** Carregamento do perfil do usuário com informações completas

### Boas Práticas
- Sempre validar permissões no backend
- Usar guards consistentes
- Redirecionar usuários não autorizados
- Manter sessões seguras
- Logout global

## 📱 Responsividade

### Mobile-First
- Sidebar colapsável em dispositivos móveis
- Navegação adaptativa
- Layouts responsivos para todos os perfis

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Melhorias Implementadas

### 1. Estrutura de Rotas Organizada
- Rotas públicas separadas
- Rotas de autenticação protegidas
- Dashboards específicos por perfil
- Gestão institucional organizada

### 2. Sistema de Permissões Robusto
- Guards específicos por perfil
- Validação de permissões
- Redirecionamento inteligente

### 3. Interface Melhorada
- Header com dropdown de usuário
- Sidebar dinâmica
- Loading states
- Feedback visual

### 4. Experiência do Usuário
- Navegação intuitiva
- Redirecionamento automático
- Mensagens de erro claras
- Loading states informativos

## 🔧 Configuração e Uso

### Instalação
```bash
npm install
npm run dev
```

### Variáveis de Ambiente
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Estrutura de Banco de Dados
Verificar as migrações em `supabase/migrations/` para a estrutura completa das tabelas.

## 📝 Próximos Passos

1. **Implementar páginas específicas** para cada rota do dashboard
2. **Adicionar testes** para os guards e permissões
3. **Melhorar feedback visual** para ações do usuário
4. **Implementar cache** para dados do usuário
5. **Adicionar analytics** para monitoramento de uso

---

**Nota:** Esta estrutura garante uma experiência organizada e segura para todos os tipos de usuários da plataforma, com navegação intuitiva e proteção adequada de rotas. 