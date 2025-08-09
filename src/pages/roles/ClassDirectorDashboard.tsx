import React, { useEffect } from 'react';

const ClassDirectorDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Diretor de Turma | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Diretor de Turma</h1>
      <p className="text-muted-foreground mt-1">Acompanhamento de alunos e comunicação com turmas.</p>
    </div>
  );
};

export default ClassDirectorDashboard;
