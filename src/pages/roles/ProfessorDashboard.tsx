import React, { useEffect } from 'react';

const ProfessorDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Professor | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Professor</h1>
      <p className="text-muted-foreground mt-1">Publicações, atividades e interação com estudantes.</p>
    </div>
  );
};

export default ProfessorDashboard;
