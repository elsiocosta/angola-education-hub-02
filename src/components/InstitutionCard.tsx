
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Globe, GraduationCap } from 'lucide-react';
import { Institution } from '@/hooks/useInstitutions';

interface InstitutionCardProps {
  institution: Institution;
  onViewDetails?: () => void;
}

const InstitutionCard = ({ institution, onViewDetails }: InstitutionCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university': return <GraduationCap className="h-5 w-5" />;
      case 'high_school': return <GraduationCap className="h-5 w-5" />;
      case 'secondary': return <GraduationCap className="h-5 w-5" />;
      case 'primary': return <GraduationCap className="h-5 w-5" />;
      case 'technical': return <GraduationCap className="h-5 w-5" />;
      default: return <GraduationCap className="h-5 w-5" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'university': return 'Universitário';
      case 'high_school': return 'Ensino Médio';
      case 'secondary': return 'Ensino Secundário';
      case 'primary': return 'Ensino Primário';
      case 'technical': return 'Técnico';
      default: return 'Ensino';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'university': return 'bg-purple-100 text-purple-800';
      case 'high_school': return 'bg-blue-100 text-blue-800';
      case 'secondary': return 'bg-green-100 text-green-800';
      case 'primary': return 'bg-orange-100 text-orange-800';
      case 'technical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{institution.name}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{institution.province}</span>
              {institution.municipality && (
                <>
                  <span>•</span>
                  <span>{institution.municipality}</span>
                </>
              )}
            </div>
          </div>
          <Badge className={`flex items-center space-x-1 ${getTypeColor(institution.institution_type)}`}>
            {getTypeIcon(institution.institution_type)}
            <span>{getTypeName(institution.institution_type)}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {institution.description && (
          <p className="text-gray-700 text-sm line-clamp-3">{institution.description}</p>
        )}
        
        <div className="space-y-2">
          {institution.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{institution.phone}</span>
            </div>
          )}
          {institution.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{institution.email}</span>
            </div>
          )}
          {institution.website && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <span className="truncate">{institution.website}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <Button onClick={onViewDetails} className="w-full">
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstitutionCard;
