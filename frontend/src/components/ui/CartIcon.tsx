'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart/context';
import { useAuth } from '@/lib/auth/context';

export default function CartIcon() {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <Link href="/cart">
      <Button 
        variant="ghost" 
        size="icon" 
        className="cart-icon relative hover:bg-gray-100 transition-colors"
      >
        <ShoppingCart className="h-5 w-5" />
        {isAuthenticated && itemCount > 0 && (
          <span className="cart-badge absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}