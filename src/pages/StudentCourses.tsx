import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Matemática Avançada",
      institution: "Universidade Técnica de Angola",
      level: "Universitário",
      duration: "4 anos",
      students: 120,
      rating: 4.8,
      status: "enrolled",
      progress: 75
    },
    {
      id: 2,
      title: "Programação Web",
      institution: "Instituto Superior Politécnico",
      level: "Superior",
      duration: "2 anos",
      students: 85,
      rating: 4.9,
      status: "completed",
      progress: 100
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meus Cursos</h1>
        <p className="text-gray-600 mt-2">Acompanhe seu progresso acadêmico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {course.institution}
                  </CardDescription>
                </div>
                <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                  {course.status === 'completed' ? 'Concluído' : 'Em andamento'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.level}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students} estudantes
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.rating}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Continuar Estudos
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;