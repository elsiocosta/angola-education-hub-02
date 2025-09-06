import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, Eye, MapPin } from 'lucide-react';

const VisitorExplore = () => {
  useEffect(() => {
    document.title = 'Explorar Instituições | Ango Education';
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Explorar Instituições</h1>
        <p className="text-muted-foreground mt-1">Descubra oportunidades educacionais em Angola</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Busca Avançada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Buscar por nome ou curso..." />
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Todas as Províncias</option>
              <option value="luanda">Luanda</option>
              <option value="benguela">Benguela</option>
              <option value="huambo">Huambo</option>
            </select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg mb-4"></div>
              <CardTitle className="text-lg">Universidade {i}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Luanda
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">Engenharia</Badge>
                  <Badge variant="outline">Medicina</Badge>
                  <Badge variant="outline">Gestão</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      1.2k
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      89
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Seguir
                  </Button>
                </div>
                
                <Button className="w-full">Ver Detalhes</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VisitorExplore;