
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DesktopNavProps {
  navigationItems: any[];
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navigationItems,
  openDropdown,
  setOpenDropdown
}) => {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <div key={item.name} className="relative">
          {item.hasDropdown ? (
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.name ? null : item.name)
                }
                className={`flex items-center space-x-1 transition-colors ${
                  location.pathname.includes(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span>{item.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {item.dropdownItems?.map((dropdownItem: any) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <div className="font-medium text-gray-900">{dropdownItem.name}</div>
                      <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.href}
              className={`transition-colors ${
                location.pathname === item.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;

