import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              Go back home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="w-full sm:w-auto">
              Browse products
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you think this is an error, please{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;