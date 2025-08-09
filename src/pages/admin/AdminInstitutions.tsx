import React, { useEffect } from 'react';

const AdminInstitutions = () => {
  useEffect(() => {
    document.title = 'Admin: Instituições | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestão de Instituições</h1>
      <p className="text-muted-foreground mt-1">Acompanhe cadastros, status e conformidade das instituições.</p>
    </div>
  );
};

export default AdminInstitutions;
