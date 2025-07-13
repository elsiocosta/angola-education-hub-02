import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Building, 
  Users, 
  Bell, 
  Shield, 
  CreditCard,
  Camera,
  Save,
  Plus,
  Trash2,
  Edit,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

const InstitutionSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [institutionData, setInstitutionData] = useState({
    name: "Universidade Técnica de Angola",
    description: "Instituição de ensino superior focada em tecnologia e inovação",
    email: "contato@uta.ao",
    phone: "+244 222 123 456",
    website: "https://www.uta.ao",
    address: "Luanda, Talatona, Rua Principal nº 123",
    logo: "/placeholder.svg"
  });

  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailMessages: true,
    smsReminders: false,
    pushNotifications: true
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "João Silva", email: "joao.silva@uta.ao", role: "admin", status: "active" },
    { id: 2, name: "Maria Santos", email: "maria.santos@uta.ao", role: "staff", status: "active" },
    { id: 3, name: "Pedro Costa", email: "pedro.costa@uta.ao", role: "staff", status: "pending" }
  ]);

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar as alterações
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações da Instituição</h1>
          <p className="text-gray-600 mt-2">Gerencie as informações e configurações da sua instituição</p>
        </div>
        
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Equipe
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Plano
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Instituição</CardTitle>
              <CardDescription>Dados básicos e informações de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo e Nome */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={institutionData.logo} alt={institutionData.name} />
                    <AvatarFallback className="text-2xl">
                      {institutionData.name?.charAt(0) || 'I'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome da Instituição</label>
                    {isEditing ? (
                      <Input 
                        value={institutionData.name}
                        onChange={(e) => setInstitutionData({...institutionData, name: e.target.value})}
                        className="text-lg font-medium"
                      />
                    ) : (
                      <h3 className="text-lg font-medium">{institutionData.name}</h3>
                    )}
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                {isEditing ? (
                  <Textarea 
                    value={institutionData.description}
                    onChange={(e) => setInstitutionData({...institutionData, description: e.target.value})}
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700">{institutionData.description}</p>
                )}
              </div>

              {/* Informações de Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Institucional
                  </label>
                  {isEditing ? (
                    <Input 
                      value={institutionData.email}
                      onChange={(e) => setInstitutionData({...institutionData, email: e.target.value})}
                      type="email"
                    />
                  ) : (
                    <p className="text-gray-700">{institutionData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium">
                    <Phone className="h-4 w-4 mr-2" />
                    Telefone
                  </label>
                  {isEditing ? (
                    <Input 
                      value={institutionData.phone}
                      onChange={(e) => setInstitutionData({...institutionData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{institutionData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </label>
                  {isEditing ? (
                    <Input 
                      value={institutionData.website}
                      onChange={(e) => setInstitutionData({...institutionData, website: e.target.value})}
                      type="url"
                    />
                  ) : (
                    <p className="text-gray-700">{institutionData.website}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium">
                    <MapPin className="h-4 w-4 mr-2" />
                    Endereço
                  </label>
                  {isEditing ? (
                    <Input 
                      value={institutionData.address}
                      onChange={(e) => setInstitutionData({...institutionData, address: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{institutionData.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestão da Equipe</CardTitle>
                  <CardDescription>Gerencie os membros da sua instituição</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Convidar Membro
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                        {member.role === 'admin' ? 'Administrador' : 'Funcionário'}
                      </Badge>
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status === 'active' ? 'Ativo' : 'Pendente'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>Gerencie como e quando quer receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações de Candidaturas por Email</h4>
                    <p className="text-sm text-gray-600">Receba emails quando houver novas candidaturas</p>
                  </div>
                  <Switch 
                    checked={notifications.emailApplications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailApplications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações de Mensagens por Email</h4>
                    <p className="text-sm text-gray-600">Receba emails para novas mensagens internas</p>
                  </div>
                  <Switch 
                    checked={notifications.emailMessages}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailMessages: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Lembretes por SMS</h4>
                    <p className="text-sm text-gray-600">Receba lembretes importantes por SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.smsReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsReminders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações Push</h4>
                    <p className="text-sm text-gray-600">Receba notificações instantâneas no navegador</p>
                  </div>
                  <Switch 
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta institucional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Alterar Senha</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Senha atual" />
                    <Input type="password" placeholder="Nova senha" />
                    <Input type="password" placeholder="Confirmar nova senha" />
                    <Button variant="outline">Alterar Senha</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Autenticação de Dois Fatores</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                  <Button variant="outline">Configurar 2FA</Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Sessões Ativas</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Gerencie os dispositivos com acesso à sua conta
                  </p>
                  <Button variant="outline">Ver Sessões</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plano e Faturação</CardTitle>
              <CardDescription>Gerencie sua assinatura e métodos de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Plano Premium</h3>
                    <p className="text-sm text-gray-600">Até 1000 estudantes</p>
                  </div>
                  <Badge className="bg-blue-600">Ativo</Badge>
                </div>
                <div className="text-2xl font-bold mb-2">$99/mês</div>
                <p className="text-sm text-gray-600 mb-4">Próxima cobrança: 15 de Fevereiro, 2024</p>
                <div className="flex space-x-2">
                  <Button variant="outline">Ver Fatura</Button>
                  <Button variant="outline">Alterar Plano</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Método de Pagamento</h4>
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expira 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Alterar</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Histórico de Pagamentos</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Janeiro 2024</p>
                      <p className="text-sm text-gray-600">15 de Janeiro, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$99.00</p>
                      <Badge variant="default" className="text-xs">Pago</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Dezembro 2023</p>
                      <p className="text-sm text-gray-600">15 de Dezembro, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$99.00</p>
                      <Badge variant="default" className="text-xs">Pago</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstitutionSettings;