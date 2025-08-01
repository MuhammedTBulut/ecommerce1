'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { productsApi, cartApi } from '@/lib/api';
import { useAuth } from '@/lib/auth/context';
import type { Product } from '@/types';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const productId = parseInt(params.id as string);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]); // loadProduct is not included as it's defined inside the component

  const loadProduct = async () => {
    try {
      const data = await productsApi.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      await cartApi.addToCart({
        productId: productId,
        quantity: quantity
      });
      
      // Show success message (you can implement a toast here)
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-600">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-orange-600">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-8xl text-gray-400">📦</div>
              </div>
            )}
          </div>
          
          {/* Additional images would go here */}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">{product.categoryName}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-orange-600">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          {product.stock > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 border rounded-md text-center min-w-[60px]">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="flex-1"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                    <Button variant="outline" size="lg">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-orange-600">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Features */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Warranty Included</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Products */}
      <div className="mt-12">
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    </div>
  );
}