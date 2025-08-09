import React, { useEffect } from 'react';

const CourseCoordinatorDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Coordenador de Curso | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Coordenador de Curso</h1>
      <p className="text-muted-foreground mt-1">Disciplinas, professores e materiais do curso.</p>
    </div>
  );
};

export default CourseCoordinatorDashboard;
