import React, { useEffect } from 'react';

const AdminSettings = () => {
  useEffect(() => {
    document.title = 'Admin: Configurações | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
      <p className="text-muted-foreground mt-1">Políticas de privacidade, integrações e preferências globais.</p>
    </div>
  );
};

export default AdminSettings;
