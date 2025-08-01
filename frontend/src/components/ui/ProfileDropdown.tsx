'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  Package, 
  Heart, 
  LogOut,
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/context';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const menuItems = [
    {
      href: '/profile',
      icon: User,
      label: 'Profil Bilgileri',
    },
    {
      href: '/orders',
      icon: Package,
      label: 'Siparişlerim',
    },
    {
      href: '/favorites',
      icon: Heart,
      label: 'Favorilerim',
    },
    {
      href: '/settings',
      icon: Settings,
      label: 'Ayarlar',
    },
  ];

  return (
    <div className="profile-dropdown relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user?.fullName?.split(' ')[0] || 'Kullanıcı'}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown}
          />
          
          {/* Dropdown Menu */}
          <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-20 py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={closeDropdown}
                  >
                    <IconComponent className="h-4 w-4 mr-3 text-gray-500" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Admin Panel Link */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors font-medium"
                  onClick={closeDropdown}
                >
                  <Settings className="h-4 w-4 mr-3 text-orange-600" />
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3 text-red-600" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}