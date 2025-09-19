import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Load notifications from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(parsed);
      } catch (error) {
        console.error('Failed to parse notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for high priority notifications
    if (notification.priority === 'high') {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default'
      });
    }

    // Request permission for browser notifications
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Notification Bell Icon with Badge
interface NotificationBellProps {
  className?: string;
  onOpen?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ className, onOpen }) => {
  const { unreadCount } = useNotifications();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      onClick={onOpen}
      aria-label={`Notificações ${unreadCount > 0 ? `(${unreadCount} não lidas)` : ''}`}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};

// Notification Panel
interface NotificationPanelProps {
  className?: string;
  maxHeight?: string;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  className,
  maxHeight = '400px'
}) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return 'Agora';
  };

  if (notifications.length === 0) {
    return (
      <Card className={cn("w-80", className)}>
        <CardContent className="p-6 text-center">
          <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-medium mb-2">Nenhuma notificação</h3>
          <p className="text-sm text-muted-foreground">
            Você está em dia! Não há notificações no momento.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-80", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Notificações</h3>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            Marcar todas
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs"
          >
            Limpar tudo
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight }}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors",
              !notification.read && "bg-blue-50/50 dark:bg-blue-950/20"
            )}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    
                    {notification.actionUrl && notification.actionLabel && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-xs mt-2"
                        onClick={() => {
                          window.open(notification.actionUrl, '_blank');
                          markAsRead(notification.id);
                        }}
                      >
                        {notification.actionLabel}
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(notification.timestamp)}
                  </span>
                  
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs"
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Hook for adding notifications easily
export const useNotify = () => {
  const { addNotification } = useNotifications();

  const notify = {
    success: (title: string, message: string, options?: Partial<Notification>) =>
      addNotification({ title, message, type: 'success', ...options }),
    
    error: (title: string, message: string, options?: Partial<Notification>) =>
      addNotification({ title, message, type: 'error', priority: 'high', ...options }),
    
    warning: (title: string, message: string, options?: Partial<Notification>) =>
      addNotification({ title, message, type: 'warning', ...options }),
    
    info: (title: string, message: string, options?: Partial<Notification>) =>
      addNotification({ title, message, type: 'info', ...options })
  };

  return notify;
};

// Push notification utilities
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendPushNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });
  }
  return null;
};