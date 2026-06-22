import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  Share2,
  ArrowRight,
  ShoppingBag,
  X
} from 'lucide-react';
import 'animate.css';

const Wishlist = () => {
  // Mock wishlist data - replace with context/state/API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones Pro',
      brand: 'SoundMax Pro',
      price: 6499,
      originalPrice: 12999,
      discount: 50,
      rating: 4.8,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      inStock: true,
      addedDate: '2026-06-20'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Series 5',
      brand: 'FitTech',
      price: 4499,
      originalPrice: 8999,
      discount: 50,
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      inStock: true,
      addedDate: '2026-06-18'
    },
    {
      id: 3,
      name: 'Premium Leather Backpack',
      brand: 'Urban Carry',
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      rating: 4.9,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      inStock: false,
      addedDate: '2026-06-15'
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      brand: 'ComfortPro',
      price: 7999,
      originalPrice: 15999,
      discount: 50,
      rating: 4.7,
      reviews: 1203,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
      inStock: true,
      addedDate: '2026-06-12'
    }
  ]);

  const handleRemoveFromWishlist = (productId) => {
    const item = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id!== productId));

    console.log('Remove from wishlist:', {
      productId: productId,
      name: item.name,
      timestamp: new Date().toISOString()
    });
  };

  const handleMoveToCart = (product) => {
    console.log('Move to cart from wishlist:', {
      productId: product.id,
      name: product.name,
      price: product.price,
      timestamp: new Date().toISOString()
    });

    // Optionally remove from wishlist after adding to cart
    // handleRemoveFromWishlist(product.id);
  };

  const handleMoveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    console.log('Move all to cart:', {
      itemCount: inStockItems.length,
      items: inStockItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price
      })),
      timestamp: new Date().toISOString()
    });
  };

  const handleClearWishlist = () => {
    console.log('Clear wishlist:', {
      itemCount: wishlistItems.length,
      timestamp: new Date().toISOString()
    });
    setWishlistItems([]);
  };

  const handleShare = (product) => {
    console.log('Share wishlist item:', {
      productId: product.id,
      name: product.name,
      url: `${window.location.origin}/product/${product.id}`,
      timestamp: new Date().toISOString()
    });
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  const inStockCount = wishlistItems.filter(item => item.inStock).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1? 'item' : 'items'} saved for later
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center animate__animated animate__fadeIn">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and move them to your cart when you're ready.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Actions Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{inStockCount}</span> of{' '}
                  <span className="font-semibold text-gray-900">{wishlistItems.length}</span> items in stock
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleMoveAllToCart}
                    disabled={inStockCount === 0}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add All to Cart
                  </button>
                  <button
                    onClick={handleClearWishlist}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {wishlistItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate__animated animate__fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          {item.discount}% OFF
                        </span>
                        {!item.inStock && (
                          <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-md"
                      >
                        <X className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                        {item.brand}
                      </div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-base font-bold text-gray-900 hover:text-indigo-600 line-clamp-2 mb-2 block min-h-[3rem]"
                      >
                        {item.name}
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({item.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-extrabold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          disabled={!item.inStock}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:scale-105"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {item.inStock? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button
                          onClick={() => handleShare(item)}
                          className="p-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 animate__animated animate__fadeInRight">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Wishlist Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-semibold text-gray-900">{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">In Stock</span>
                    <span className="font-semibold text-green-600">{inStockCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Out of Stock</span>
                    <span className="font-semibold text-red-600">
                      {wishlistItems.length - inStockCount}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value</span>
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{totalValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Savings</span>
                    <span className="font-semibold text-green-600">
                      ₹{totalSavings.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleMoveAllToCart}
                  disabled={inStockCount === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg mb-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add All to Cart
                </button>

                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
