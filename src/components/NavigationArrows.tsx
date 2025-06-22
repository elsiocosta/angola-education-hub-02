
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavigationArrows = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <div className="fixed top-20 left-4 z-40 flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleGoBack}
        className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-md"
        title="Voltar"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleGoForward}
        className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-md"
        title="Avançar"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationArrows;
