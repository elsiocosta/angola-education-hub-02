import React, { useEffect } from 'react';

const AdminApprovals = () => {
  useEffect(() => {
    document.title = 'Admin: Aprovações | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Aprovação e Suspensão de Instituições</h1>
      <p className="text-muted-foreground mt-1">Gerencie solicitações, verificação e status de instituições.</p>
    </div>
  );
};

export default AdminApprovals;
