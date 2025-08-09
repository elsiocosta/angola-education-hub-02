import React, { useEffect } from 'react';

const AdminUsers = () => {
  useEffect(() => {
    document.title = 'Admin: Usuários | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
      <p className="text-muted-foreground mt-1">Administre perfis de visitantes, estudantes e membros de instituições.</p>
    </div>
  );
};

export default AdminUsers;
