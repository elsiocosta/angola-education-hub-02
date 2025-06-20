
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, MapPin } from 'lucide-react';
import { Post, useLikePost } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuth();
  const likePost = useLikePost();

  const handleLike = () => {
    if (!user) return;
    likePost.mutate({ postId: post.id, userId: user.id });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university': return '🎓';
      case 'high_school': return '🏫';
      case 'secondary': return '📚';
      case 'primary': return '🏠';
      default: return '📖';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'university': return 'Universitário';
      case 'high_school': return 'Ensino Médio';
      case 'secondary': return 'Ensino Secundário';
      case 'primary': return 'Ensino Primário';
      default: return 'Ensino';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.institutions?.logo_url} alt={post.institutions?.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                {getTypeIcon(post.institutions?.institution_type || 'primary')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{post.institutions?.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{post.institutions?.province}</span>
                <span>•</span>
                <span>{new Date(post.created_at || '').toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <span>{getTypeIcon(post.institutions?.institution_type || 'primary')}</span>
            <span>{getTypeName(post.institutions?.institution_type || 'primary')}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
        
        {post.image_url && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className="flex items-center space-x-2 hover:text-red-600"
            >
              <Heart className="h-4 w-4" />
              <span>{post.likes_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-blue-600">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-green-600">
              <Share2 className="h-4 w-4" />
              <span>Partilhar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
