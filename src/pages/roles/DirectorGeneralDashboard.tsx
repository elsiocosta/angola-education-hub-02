import React, { useEffect } from 'react';

const DirectorGeneralDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Diretor Geral | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Diretor Geral</h1>
      <p className="text-muted-foreground mt-1">Visão completa da instituição e indicadores estratégicos.</p>
    </div>
  );
};

export default DirectorGeneralDashboard;
