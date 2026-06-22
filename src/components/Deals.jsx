import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Clock, Filter, Flame, Zap, TrendingUp, ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import 'animate.css';

const Deals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [timeLeft, setTimeLeft] = useState({});

  // Mock deals data
  const deals = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      brand: 'SoundMax Pro',
      originalPrice: 12999,
      salePrice: 6499,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      rating: 4.8,
      reviews: 2341,
      category: 'electronics',
      badge: 'Flash Sale',
      endsIn: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
      stock: 12
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Series 5',
      brand: 'FitTech',
      originalPrice: 8999,
      salePrice: 4499,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      rating: 4.6,
      reviews: 1876,
      category: 'electronics',
      badge: 'Best Seller',
      endsIn: Date.now() + 14 * 60 * 60 * 1000, // 14 hours
      stock: 8
    },
    {
      id: 3,
      name: 'Premium Leather Backpack',
      brand: 'Urban Carry',
      originalPrice: 4999,
      salePrice: 2499,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      rating: 4.9,
      reviews: 892,
      category: 'fashion',
      badge: 'Limited Stock',
      endsIn: Date.now() + 5 * 60 * 60 * 1000, // 5 hours
      stock: 5
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      brand: 'ComfortPro',
      originalPrice: 15999,
      salePrice: 7999,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
      rating: 4.7,
      reviews: 1203,
      category: 'home',
      badge: 'Hot Deal',
      endsIn: Date.now() + 22 * 60 * 60 * 1000, // 22 hours
      stock: 18
    },
    {
      id: 5,
      name: 'Portable Bluetooth Speaker',
      brand: 'BassBoost',
      originalPrice: 3999,
      salePrice: 1599,
      discount: 60,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      rating: 4.5,
      reviews: 3421,
      category: 'electronics',
      badge: 'Flash Sale',
      endsIn: Date.now() + 3 * 60 * 60 * 1000, // 3 hours
      stock: 3
    },
    {
      id: 6,
      name: 'Organic Cotton Bed Sheets Set',
      brand: 'SleepWell',
      originalPrice: 3499,
      salePrice: 1749,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop',
      rating: 4.8,
      reviews: 756,
      category: 'home',
      badge: 'New Deal',
      endsIn: Date.now() + 18 * 60 * 60 * 1000, // 18 hours
      stock: 25
    }
  ];

  const categories = [
    { value: 'all', label: 'All Deals' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Living' }
  ];

  const sortOptions = [
    { value: 'discount', label: 'Highest Discount' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'ending', label: 'Ending Soon' }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      deals.forEach(deal => {
        const diff = deal.endsIn - Date.now();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[deal.id] = { hours, minutes, seconds };
        } else {
          newTimeLeft[deal.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter and sort deals
  const filteredDeals = deals
    .filter(deal => selectedCategory === 'all' || deal.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price-low':
          return a.salePrice - b.salePrice;
        case 'price-high':
          return b.salePrice - a.salePrice;
        case 'ending':
          return a.endsIn - b.endsIn;
        default:
          return 0;
      }
    });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Flash Sale':
        return 'bg-red-500 text-white';
      case 'Best Seller':
        return 'bg-amber-500 text-white';
      case 'Limited Stock':
        return 'bg-orange-500 text-white';
      case 'Hot Deal':
        return 'bg-pink-500 text-white';
      case 'New Deal':
        return 'bg-green-500 text-white';
      default:
        return 'bg-indigo-500 text-white';
    }
  };

  const handleAddToCart = (deal) => {
    console.log('Add to cart from deals:', {
      productId: deal.id,
      name: deal.name,
      salePrice: deal.salePrice,
      discount: deal.discount,
      timestamp: new Date().toISOString()
    });
  };

  const handleWishlist = (deal) => {
    console.log('Add to wishlist from deals:', {
      productId: deal.id,
      name: deal.name,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center animate__animated animate__fadeInDown">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-semibold">Limited Time Offers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
              Mega Deals of the Day
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Up to 60% off on premium products. New deals every day. Don't miss out!
            </p>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500" />
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat.value
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image + Badges */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(deal.badge)}`}>
                    {deal.badge}
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                    {deal.discount}% OFF
                  </span>
                </div>
                <button
                  onClick={() => handleWishlist(deal)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                >
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                {deal.stock < 10 && (
                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Only {deal.stock} left
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                  {deal.brand}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {deal.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-900">{deal.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({deal.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ₹{deal.salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{deal.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Countdown Timer */}
                {timeLeft[deal.id] && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-700 mb-2">
                      <Clock className="w-4 h-4" />
                      Ends in:
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-center flex-1">
                        <div className="text-xl font-bold text-red-600">
                          {String(timeLeft[deal.id].hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-red-600">Hrs</div>
                      </div>
                      <div className="text-red-600 font-bold">:</div>
                      <div className="text-center flex-1">
                        <div className="text-xl font-bold text-red-600">
                          {String(timeLeft[deal.id].minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-red-600">Min</div>
                      </div>
                      <div className="text-red-600 font-bold">:</div>
                      <div className="text-center flex-1">
                        <div className="text-xl font-bold text-red-600">
                          {String(timeLeft[deal.id].seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-red-600">Sec</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(deal)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-20">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Never miss a deal again
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Get notified about flash sales and exclusive offers
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Sign Up for Alerts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Deals;