import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Book, 
  Users, 
  FileText, 
  MessageCircle, 
  User, 
  Building, 
  Mail, 
  BarChart, 
  Settings, 
  Folder,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const iconMap = {
  home: Home,
  book: Book,
  users: Users,
  'file-text': FileText,
  'message-circle': MessageCircle,
  user: User,
  building: Building,
  mail: Mail,
  'bar-chart': BarChart,
  settings: Settings,
  folder: Folder,
};

export const Sidebar = ({ items }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "flex flex-col border-r bg-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}; 