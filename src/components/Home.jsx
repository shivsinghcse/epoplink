import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Truck,
  Shield,
  RefreshCw,
  Star,
  ShoppingCart,
  Heart,
  Flame,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Logo from './Logo';
import 'animate.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Summer Sale is Live',
      subtitle: 'Up to 60% Off on Premium Products',
      cta: 'Shop Now',
      link: '/deals',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
      gradient: 'from-red-600 to-orange-500'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Discover Latest Tech & Fashion',
      cta: 'Explore Collection',
      link: '/shop/new',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      gradient: 'from-indigo-600 to-violet-600'
    },
    {
      title: 'Free Shipping',
      subtitle: 'On Orders Above ₹999',
      cta: 'Start Shopping',
      link: '/shop',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over ₹999'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: '2-4 day express shipping'
    }
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
      count: '2.8K+',
      link: '/shop?category=electronics'
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
      count: '5.6K+',
      link: '/shop?category=fashion'
    },
    {
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      count: '1.9K+',
      link: '/shop?category=home'
    },
    {
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      count: '1.4K+',
      link: '/shop?category=beauty'
    }
  ];

  const trendingProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      brand: 'SoundMax',
      price: 2999,
      originalPrice: 5999,
      discount: 50,
      rating: 4.8,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      brand: 'FitTech',
      price: 4499,
      originalPrice: 8999,
      discount: 50,
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      badge: 'Hot Deal'
    },
    {
      id: 3,
      name: 'Premium Leather Bag',
      brand: 'Urban Carry',
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      rating: 4.9,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      badge: 'New'
    },
    {
      id: 4,
      name: 'Ergonomic Chair',
      brand: 'ComfortPro',
      price: 7999,
      originalPrice: 15999,
      discount: 50,
      rating: 4.7,
      reviews: 1203,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      badge: 'Limited'
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    console.log('Add to cart from home:', {
      productId: product.id,
      name: product.name,
      price: product.price,
      timestamp: new Date().toISOString()
    });
  };

  const handleWishlist = (product) => {
    console.log('Add to wishlist from home:', {
      productId: product.id,
      name: product.name,
      timestamp: new Date().toISOString()
    });
  };

  const handleCategoryClick = (categoryName) => {
    console.log('Category clicked from home:', {
      category: categoryName,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`}></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl text-white animate__animated animate__fadeInLeft">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/90">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate__animated animate__fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find what you need from our curated collections
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              View All Categories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Deals Banner */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Flame className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">Flash Deals</h2>
                <p className="text-white/90">Up to 60% off. Limited time only!</p>
              </div>
            </div>
            <Link
              to="/deals"
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Shop Deals Now
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="animate__animated animate__fadeInLeft">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  Trending Now
                </h2>
              </div>
              <p className="text-lg text-gray-600">
                Most loved products by our community
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
            >
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <button
                    onClick={() => handleWishlist(product)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                  >
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                    {product.brand}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate__animated animate__fadeInUp">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Join 50,000+ Happy Customers
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              Get exclusive deals, new arrivals, and special offers delivered to your inbox
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
