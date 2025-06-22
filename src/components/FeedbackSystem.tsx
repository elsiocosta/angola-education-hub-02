
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  institutionName: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  helpful: number;
}

const FeedbackSystem: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      institutionName: 'Universidade Agostinho Neto',
      rating: 5,
      comment: 'Excelente universidade com ótima infraestrutura e professores qualificados.',
      author: 'João Silva',
      date: '2025-06-20',
      helpful: 12
    },
    {
      id: '2',
      institutionName: 'Instituto Superior Politécnico',
      rating: 4,
      comment: 'Boa qualidade de ensino, mas poderia melhorar a biblioteca.',
      author: 'Maria Santos',
      date: '2025-06-19',
      helpful: 8
    }
  ]);

  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Avaliação obrigatória",
        description: "Por favor, selecione uma avaliação de 1 a 5 estrelas.",
        variant: "destructive"
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Comentário muito curto",
        description: "Por favor, escreva um comentário com pelo menos 10 caracteres.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria enviado para o backend
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback. Sua avaliação será analisada."
    });

    setRating(0);
    setComment('');
  };

  const renderStars = (currentRating: number, isInteractive: boolean = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          index < (isInteractive ? (hoveredRating || rating) : currentRating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
        onClick={isInteractive ? () => setRating(index + 1) : undefined}
        onMouseEnter={isInteractive ? () => setHoveredRating(index + 1) : undefined}
        onMouseLeave={isInteractive ? () => setHoveredRating(0) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Formulário de Avaliação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Deixe sua Avaliação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Avaliação Geral
            </label>
            <div className="flex items-center gap-2">
              {renderStars(rating, true)}
              <span className="text-sm text-gray-600 ml-2">
                {rating > 0 && `${rating} de 5 estrelas`}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Comentário
            </label>
            <Textarea
              placeholder="Compartilhe sua experiência com esta instituição..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="text-xs text-gray-500 mt-1">
              {comment.length}/500 caracteres
            </div>
          </div>

          <Button onClick={handleSubmitReview} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Enviar Avaliação
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{review.institutionName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">
                        por {review.author}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Útil ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    Não útil
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Responder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSystem;
