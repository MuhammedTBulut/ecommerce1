'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="border-b bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Welcome, {user?.fullName}</span>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="text-gray-600 hover:text-gray-800">
                    Login
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link href="/register" className="text-gray-600 hover:text-gray-800">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">E-Store</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {/* Cart badge would go here */}
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-orange-600 font-medium">
              All Products
            </Link>
            <Link href="/products?category=1" className="text-gray-700 hover:text-orange-600">
              Electronics
            </Link>
            <Link href="/products?category=2" className="text-gray-700 hover:text-orange-600">
              Home & Garden
            </Link>
            <Link href="/products?category=3" className="text-gray-700 hover:text-orange-600">
              Tools
            </Link>
            <Link href="/products?category=4" className="text-gray-700 hover:text-orange-600">
              Outdoor
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-orange-600">
                  My Orders
                </Link>
                <Link href="/support" className="text-gray-700 hover:text-orange-600">
                  Support
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            <Link 
              href="/products" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  href="/cart" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link 
                  href="/orders" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="block px-4 py-2 text-orange-600 hover:bg-gray-100 rounded font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}