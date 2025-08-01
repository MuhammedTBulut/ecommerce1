import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">E-Store</span>
            </div>
            <p className="text-foreground-secondary mb-4">
              Your trusted online store for quality products at competitive prices. 
              We provide excellent customer service and fast shipping.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-foreground-secondary hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-foreground-secondary hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-foreground-secondary hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-foreground-secondary hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-foreground-secondary hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=1" className="text-foreground-secondary hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=2" className="text-foreground-secondary hover:text-primary transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/products?category=3" className="text-foreground-secondary hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/products?category=4" className="text-foreground-secondary hover:text-primary transition-colors">
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-foreground-secondary hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-foreground-secondary hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground-secondary hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-secondary hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-secondary hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-foreground-secondary" />
                <span className="text-foreground-secondary">
                  123 Commerce Street<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-foreground-secondary" />
                <span className="text-foreground-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-foreground-secondary" />
                <span className="text-foreground-secondary">support@e-store.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground-secondary text-sm">
              © 2024 E-Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-foreground-secondary text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="h-6 w-10 bg-blue-600 rounded text-xs flex items-center justify-center text-white">
                  VISA
                </div>
                <div className="h-6 w-10 bg-red-600 rounded text-xs flex items-center justify-center text-white">
                  MC
                </div>
                <div className="h-6 w-10 bg-blue-800 rounded text-xs flex items-center justify-center text-white">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}