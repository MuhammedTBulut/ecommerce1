'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart/context';
import type { Product } from '@/types';

export default function HomePage() {
  const { addItem } = useCart();

  // Mock featured products data
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Wireless Power Drill",
      description: "Professional cordless drill with 20V battery",
      price: 99.99,
      stock: 25,
      categoryId: 3,
      categoryName: "Tools",
      imageUrl: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "Smart Garden Kit",
      description: "Complete indoor gardening solution with LED lights",
      price: 149.99,
      stock: 15,
      categoryId: 2,
      categoryName: "Home & Garden",
      imageUrl: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Waterproof portable speaker with 24h battery",
      price: 79.99,
      stock: 40,
      categoryId: 1,
      categoryName: "Electronics",
      imageUrl: "/api/placeholder/300/300"
    },
    {
      id: 4,
      name: "Camping Tent 4-Person",
      description: "Weather-resistant family tent with easy setup",
      price: 199.99,
      stock: 12,
      categoryId: 4,
      categoryName: "Outdoor",
      imageUrl: "/api/placeholder/300/300"
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Everything for Your
                <span className="block text-yellow-300">Home & Garden</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Discover thousands of quality products at unbeatable prices. 
                From tools to home improvement, we have everything you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  View Catalog
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Special Offers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Power Tools</span>
                    <span className="bg-yellow-400 text-orange-800 px-2 py-1 rounded text-sm font-bold">
                      Up to 40% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Garden Equipment</span>
                    <span className="bg-yellow-400 text-orange-800 px-2 py-1 rounded text-sm font-bold">
                      25% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home Improvement</span>
                    <span className="bg-yellow-400 text-orange-800 px-2 py-1 rounded text-sm font-bold">
                      Free Shipping
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same day delivery available</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you need in our extensive product range
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products?category=1" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-6xl">🔌</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600">
                    Electronics
                  </h3>
                  <p className="text-gray-600 text-sm">Smart devices, gadgets & more</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=2" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="text-6xl">🏡</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600">
                    Home & Garden
                  </h3>
                  <p className="text-gray-600 text-sm">Everything for your home</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=3" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-6xl">🔧</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600">
                    Tools
                  </h3>
                  <p className="text-gray-600 text-sm">Professional & DIY tools</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=4" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <div className="text-6xl">🏕️</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600">
                    Outdoor
                  </h3>
                  <p className="text-gray-600 text-sm">Camping, sports & recreation</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular items
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl text-gray-400">📦</div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-orange-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-orange-100">
            Get the latest deals and product updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
