import React, { useState, useEffect } from 'react';
import { Heart, Star, BookmarkPlus, Share2, ThumbsUp, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Animated Like Button
interface AnimatedLikeProps {
  isLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  count?: number;
  className?: string;
}

export const AnimatedLike: React.FC<AnimatedLikeProps> = ({
  isLiked = false,
  onToggle,
  count = 0,
  className
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
    setAnimating(true);
    onToggle?.(!liked);
    
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "group relative transition-all duration-200 hover:scale-105",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-all duration-300",
          liked ? "fill-red-500 text-red-500" : "text-muted-foreground group-hover:text-red-400",
          animating && "animate-bounce"
        )}
      />
      {count > 0 && (
        <span className={cn(
          "ml-1 text-sm transition-colors",
          liked ? "text-red-500" : "text-muted-foreground"
        )}>
          {count}
        </span>
      )}
      
      {/* Explosion effect */}
      {animating && liked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full animate-ping"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-10px)`,
                animationDelay: `${i * 50}ms`,
                animationDuration: '600ms'
              }}
            />
          ))}
        </div>
      )}
    </Button>
  );
};

// Animated Star Rating
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  onRate,
  readonly = false,
  size = 'md',
  className
}) => {
  const [hover, setHover] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState(-1);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5', 
    lg: 'h-6 w-6'
  };

  const handleClick = (index: number) => {
    if (readonly) return;
    
    setAnimatingIndex(index);
    onRate?.(index + 1);
    
    setTimeout(() => setAnimatingIndex(-1), 200);
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const isFilled = index < (hover || rating);
        const isAnimating = index === animatingIndex;
        
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readonly && setHover(index + 1)}
            onMouseLeave={() => !readonly && setHover(0)}
            disabled={readonly}
            className={cn(
              "transition-all duration-200",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
              isAnimating && "animate-bounce"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-all duration-200",
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

// Animated Bookmark Button
interface BookmarkButtonProps {
  isBookmarked?: boolean;
  onToggle?: (bookmarked: boolean) => void;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked = false,
  onToggle,
  className
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { toast } = useToast();

  const handleClick = () => {
    setBookmarked(!bookmarked);
    onToggle?.(!bookmarked);
    
    toast({
      title: bookmarked ? "Removido dos favoritos" : "Adicionado aos favoritos",
      duration: 2000
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "group transition-all duration-200 hover:scale-105",
        className
      )}
    >
      <BookmarkPlus
        className={cn(
          "h-5 w-5 transition-all duration-300",
          bookmarked 
            ? "fill-blue-500 text-blue-500 rotate-12" 
            : "text-muted-foreground group-hover:text-blue-400"
        )}
      />
    </Button>
  );
};

// Share Button with Animation
interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = document.title,
  text,
  className
}) => {
  const [clicked, setClicked] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);

    if (navigator.share) {
      try {
        await navigator.share({ url, title, text });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        });
      } catch (err) {
        toast({
          title: "Erro ao compartilhar",
          description: "Não foi possível copiar o link.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className={cn(
        "group transition-all duration-200 hover:scale-105",
        clicked && "animate-pulse",
        className
      )}
    >
      <Share2
        className={cn(
          "h-5 w-5 transition-all duration-300 text-muted-foreground group-hover:text-blue-400",
          clicked && "rotate-12 scale-110"
        )}
      />
    </Button>
  );
};

// Engagement Stats with Animations
interface EngagementStatsProps {
  likes?: number;
  views?: number;
  comments?: number;
  className?: string;
  onLike?: () => void;
  onComment?: () => void;
}

export const EngagementStats: React.FC<EngagementStatsProps> = ({
  likes = 0,
  views = 0,
  comments = 0,
  className,
  onLike,
  onComment
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onLike}
        className="group flex items-center space-x-1 hover:scale-105 transition-transform"
      >
        <ThumbsUp className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-blue-500 transition-colors">
          {formatNumber(likes)}
        </span>
      </Button>

      <div className="flex items-center space-x-1 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-sm">{formatNumber(views)}</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onComment}
        className="group flex items-center space-x-1 hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-green-500 transition-colors">
          {formatNumber(comments)}
        </span>
      </Button>
    </div>
  );
};

// Hover Card with Micro-interactions
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
}

export const InteractiveCard: React.FC<HoverCardProps> = ({
  children,
  className,
  hoverScale = 1.02
}) => {
  return (
    <div
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg",
        className
      )}
      style={{
        '--hover-scale': hoverScale.toString()
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `scale(${hoverScale})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </div>
  );
};