import React, { useEffect } from 'react';

const DirectorPedagogicDashboard = () => {
  useEffect(() => {
    document.title = 'Painel do Diretor Pedagógico | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Diretor Pedagógico</h1>
      <p className="text-muted-foreground mt-1">Supervisão de cursos, conteúdos e qualidade pedagógica.</p>
    </div>
  );
};

export default DirectorPedagogicDashboard;
