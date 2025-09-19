import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy Loading HOC for images
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback = '/placeholder.svg',
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = document.createElement('img');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (img) {
      observer.observe(img);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (!isVisible) {
    return (
      <div className={className}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={className}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={hasError ? fallback : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

// Progressive Web App utilities
export const installPWA = async () => {
  let deferredPrompt: any;
  
  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

  if (deferredPrompt) {
    const result = await deferredPrompt.prompt();
    console.log('PWA install result:', result);
    deferredPrompt = null;
    return result.outcome === 'accepted';
  }
  
  return false;
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
      return null;
    }
  }
  return null;
};

// Virtual scrolling for large lists
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

export const VirtualScroll: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;
  const totalHeight = items.length * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      className={className}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={visibleStart + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Code splitting with error boundary
interface CodeSplitWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export const CodeSplitWrapper: React.FC<CodeSplitWrapperProps> = ({
  children,
  fallback = <LoadingSpinner />,
  errorFallback = <div>Erro ao carregar componente</div>
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback={errorFallback}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

// Error boundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Memoized components for performance
export const MemoizedCard = React.memo(({ title, content, onClick }: {
  title: string;
  content: string;
  onClick: () => void;
}) => (
  <div onClick={onClick} className="p-4 border rounded-lg cursor-pointer hover:shadow-md">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-muted-foreground">{content}</p>
  </div>
));

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.duration);
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            console.log('FID:', fidEntry.processingStart - entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Image compression utility
export const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve as BlobCallback, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Prefetch utility for route preloading
export const prefetchRoute = (routePath: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = routePath;
  document.head.appendChild(link);
};

// Debounced input hook for search optimization
export const useDebouncedValue = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};