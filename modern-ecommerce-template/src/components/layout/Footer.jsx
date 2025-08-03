import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 text-white rounded-lg p-2">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold">ModernShop</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your modern e-commerce solution built with React and .NET. 
              Discover amazing products with a seamless shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.411-2.173 4.688-1.277 1.277-2.83 2.004-4.688 2.173-.191.017-.392.025-.595.025-.602 0-1.177-.067-1.717-.2-.541-.133-1.018-.328-1.434-.585-.416-.257-.756-.565-1.018-.924-.263-.359-.395-.745-.395-1.156 0-.602.298-1.057.894-1.363.596-.306 1.211-.459 1.845-.459.138 0 .27.01.396.031.126.021.235.052.328.094.094.042.169.093.225.152.056.059.084.123.084.193 0 .138-.049.27-.147.396-.098.126-.221.235-.368.328-.147.093-.31.169-.489.225-.179.056-.36.084-.543.084-.138 0-.27-.017-.396-.052-.126-.035-.235-.084-.328-.147l-.058.117c.276.365.632.547 1.068.547.602 0 1.298-.263 2.089-.789.791-.526 1.491-1.298 2.1-2.315.331-.552.497-1.068.497-1.549 0-.65-.263-1.156-.789-1.518C9.737 7.263 8.895 7.092 7.947 7.092c-.965 0-1.845.18-2.64.541-.795.361-1.436.847-1.922 1.458-.486.611-.729 1.257-.729 1.938 0 .709.18 1.347.541 1.914.361.567.847 1.068 1.458 1.503.611.435 1.298.789 2.062 1.062.764.273 1.549.409 2.356.409.965 0 1.845-.18 2.64-.541.795-.361 1.436-.847 1.922-1.458.486-.611.729-1.257.729-1.938 0-.276-.035-.541-.105-.789-.07-.248-.180-.479-.328-.693-.149-.214-.331-.409-.547-.585-.216-.176-.459-.328-.729-.456-.27-.128-.56-.221-.87-.278-.31-.057-.63-.086-.96-.086-.709 0-1.347.149-1.914.447-.567.298-1.068.699-1.503 1.204-.435.505-.789 1.068-1.062 1.69-.273.622-.409 1.257-.409 1.906 0 .709.136 1.347.409 1.914.273.567.630 1.068 1.072 1.503.442.435.951.789 1.528 1.062.577.273 1.178.409 1.803.409.709 0 1.347-.136 1.914-.409.567-.273 1.068-.630 1.503-1.072.435-.442.789-.951 1.062-1.528.273-.577.409-1.178.409-1.803 0-.276-.021-.541-.063-.789-.042-.248-.105-.479-.189-.693-.084-.214-.189-.409-.315-.585-.126-.176-.273-.328-.441-.456-.168-.128-.354-.221-.558-.278-.204-.057-.418-.086-.642-.086-.602 0-1.136.18-1.601.541-.465.361-.854.847-1.167 1.458-.313.611-.469 1.285-.469 2.021 0 .602.105 1.136.315 1.601.21.465.497.854.861 1.167.364.313.789.558 1.274.735.485.177 1.001.266 1.548.266.602 0 1.136-.089 1.601-.266.465-.177.854-.422 1.167-.735.313-.313.558-.702.735-1.167.177-.465.266-1.001.266-1.608 0-.602-.089-1.136-.266-1.601-.177-.465-.422-.854-.735-1.167-.313-.313-.702-.558-1.167-.735-.465-.177-1.001-.266-1.608-.266-.602 0-1.136.089-1.601.266-.465.177-.854.422-1.167.735-.313.313-.558.702-.735 1.167-.177.465-.266 1.001-.266 1.608 0 .602.089 1.136.266 1.601.177.465.422.854.735 1.167.313.313.702.558 1.167.735.465.177 1.001.266 1.608.266.965 0 1.845-.18 2.64-.541.795-.361 1.436-.847 1.922-1.458.486-.611.729-1.257.729-1.938 0-.709-.180-1.347-.541-1.914-.361-.567-.847-1.068-1.458-1.503-.611-.435-1.298-.789-2.062-1.062-.764-.273-1.549-.409-2.356-.409z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ModernShop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;