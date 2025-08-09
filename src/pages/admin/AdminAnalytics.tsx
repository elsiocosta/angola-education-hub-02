import React, { useEffect } from 'react';

const AdminAnalytics = () => {
  useEffect(() => {
    document.title = 'Admin: Analytics Global | Ango Education';
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Estatísticas e Analytics Globais</h1>
      <p className="text-muted-foreground mt-1">Indicadores de crescimento, engajamento e monetização.</p>
    </div>
  );
};

export default AdminAnalytics;
