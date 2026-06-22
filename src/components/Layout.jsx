import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, Mail, ChevronRight, LogIn } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from './Logo';
import 'animate.css';

const Layout = ({ children, cartCount = 0, isAuthenticated = false, userName = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' }
  ];

  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/shop' },
      { name: 'New Arrivals', path: '/shop/new' },
      { name: 'Best Sellers', path: '/shop/best' },
      { name: 'Sale', path: '/shop/sale' }
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Contact Us', path: '/contact' }
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' }
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      console.log('Newsletter form validation failed:', { email: 'empty' });
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      console.log('Newsletter form validation failed:', { email, error: 'invalid format' });
      return;
    }

    console.log('Newsletter form submitted:', { 
      email: email.trim(), 
      source: 'footer',
      timestamp: new Date().toISOString() 
    });
    
    setEmail('');
    setEmailError('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search submitted:', { query: searchQuery.trim(), timestamp: new Date().toISOString() });
      setSearchQuery('');
    }
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 animate__animated animate__fadeInDown">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" linkTo="/" />
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Search + Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-56 xl:w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </form>
              
              <Link to={'/wishlist'} className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Heart className="w-5 h-5" />
              </Link>
              
              <Link to="/cart" className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate__animated animate__bounceIn">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Buttons - Desktop */}
              {isAuthenticated? (
                <Link to="/account" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium hidden xl:block">{userName || 'Account'}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link to="/cart" className="p-2 text-gray-600 relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate__animated animate__fadeIn">
              <form onSubmit={handleSearchSubmit} className="px-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                </div>
              </form>
              
              <div className="flex flex-col gap-1 px-2 mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActivePath(link.path)
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons - Mobile */}
              <div className="px-4 pt-4 border-t border-gray-200">
                {isAuthenticated? (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      <Heart className="w-4 h-4" /> Wishlist
                    </Link>
                    <Link
                      to="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      <User className="w-4 h-4" /> Account
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all duration-200"
                    >
                      <User className="w-4 h-4" /> Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - unchanged */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Logo size="lg" variant="dark" showTagline={true} linkTo="/" className="mb-6" />
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Discover premium products curated just for you. Quality shopping made simple.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <label className="text-sm font-semibold text-white">Join our newsletter</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    {emailError && (
                      <p className="text-xs text-red-400 mt-1.5 animate__animated animate__shakeX">{emailError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {link.name}
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Poplink. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-indigo-600 rounded-lg text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
