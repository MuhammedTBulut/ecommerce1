'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Everything for Your
                <span className="block text-primary-foreground/90">Home & Garden</span>
              </h1>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Discover thousands of quality products at unbeatable prices. 
                From tools to home improvement, we have everything you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Catalog
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <h3 className="text-2xl font-bold mb-4">Special Offers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Power Tools</span>
                    <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-bold">
                      Up to 40% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Garden Equipment</span>
                    <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-bold">
                      25% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home Improvement</span>
                    <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-bold">
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
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Free Shipping</h3>
              <p className="text-foreground-secondary">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Secure Payment</h3>
              <p className="text-foreground-secondary">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Fast Delivery</h3>
              <p className="text-foreground-secondary">Same day delivery available</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Quality Guarantee</h3>
              <p className="text-foreground-secondary">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-foreground-secondary">
              Find exactly what you need in our extensive product range
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products?category=1" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                  <div className="text-6xl">🔌</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                    Electronics
                  </h3>
                  <p className="text-foreground-secondary text-sm">Smart devices, gadgets & more</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=2" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-center">
                  <div className="text-6xl">🏡</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                    Home & Garden
                  </h3>
                  <p className="text-foreground-secondary text-sm">Everything for your home</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=3" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 flex items-center justify-center">
                  <div className="text-6xl">🔧</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                    Tools
                  </h3>
                  <p className="text-foreground-secondary text-sm">Professional & DIY tools</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=4" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 flex items-center justify-center">
                  <div className="text-6xl">🏕️</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                    Outdoor
                  </h3>
                  <p className="text-foreground-secondary text-sm">Camping, sports & recreation</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-foreground-secondary">
              Discover our most popular items
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for featured products */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-4xl text-muted-foreground">📦</div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">Featured Product {i}</h3>
                  <p className="text-sm text-foreground-secondary mb-2">Product description goes here</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
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
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Get the latest deals and product updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background"
            />
            <Button className="bg-background text-foreground hover:bg-background/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
