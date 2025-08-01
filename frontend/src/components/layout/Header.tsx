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
import ThemeToggle from '@/components/ui/theme-toggle';
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
    <header className="border-b bg-background shadow-sm">
      {/* Top bar */}
      <div className="border-b bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-foreground-secondary">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-foreground-secondary">Welcome, {user?.fullName}</span>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="text-foreground-secondary hover:text-foreground"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="text-foreground-secondary hover:text-foreground">
                    Login
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/register" className="text-foreground-secondary hover:text-foreground">
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
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">E-Store</span>
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
            <ThemeToggle />
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
      <nav className="border-t bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center space-x-8">
            <Link href="/products" className="text-foreground hover:text-primary font-medium">
              All Products
            </Link>
            <Link href="/products?category=1" className="text-foreground hover:text-primary">
              Electronics
            </Link>
            <Link href="/products?category=2" className="text-foreground hover:text-primary">
              Home & Garden
            </Link>
            <Link href="/products?category=3" className="text-foreground hover:text-primary">
              Tools
            </Link>
            <Link href="/products?category=4" className="text-foreground hover:text-primary">
              Outdoor
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/orders" className="text-foreground hover:text-primary">
                  My Orders
                </Link>
                <Link href="/support" className="text-foreground hover:text-primary">
                  Support
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            <Link 
              href="/products" 
              className="block px-4 py-2 text-foreground hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  href="/cart" 
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link 
                  href="/orders" 
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="block px-4 py-2 text-primary hover:bg-muted rounded font-medium"
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