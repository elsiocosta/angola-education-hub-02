import React, { useEffect } from 'react';

const DirectorAdministrativeDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Diretor Administrativo | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Diretor Administrativo</h1>
      <p className="text-muted-foreground mt-1">Pagamentos, relatórios e gestão de recursos internos.</p>
    </div>
  );
};

export default DirectorAdministrativeDashboard;
