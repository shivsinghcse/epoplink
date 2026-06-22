import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  ChevronRight,
  X
} from 'lucide-react';
import 'animate.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones Pro',
      brand: 'SoundMax Pro',
      price: 6499,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      color: 'Midnight Black',
      quantity: 1,
      stock: 12
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      brand: 'FitTech',
      price: 4499,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      color: 'Space Gray',
      quantity: 2,
      stock: 8
    },
    {
      id: 3,
      name: 'Premium Leather Backpack',
      brand: 'Urban Carry',
      price: 2499,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      color: 'Brown',
      quantity: 1,
      stock: 5
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate()

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          if (newQty >= 1 && newQty <= item.stock) {
            console.log('Quantity updated:', {
              productId: id,
              name: item.name,
              oldQuantity: item.quantity,
              newQuantity: newQty,
              timestamp: new Date().toISOString()
            });
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    const item = cartItems.find(i => i.id === id);
    console.log('Item removed from cart:', {
      productId: id,
      name: item.name,
      quantity: item.quantity,
      timestamp: new Date().toISOString()
    });
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    // Mock promo validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoError('');
      console.log('Promo applied:', {
        code: promoCode,
        discount: 10,
        timestamp: new Date().toISOString()
      });
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout:', {
      items: cartItems,
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      total: total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date().toISOString()
    });

    navigate('/checkout')
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const savings = originalTotal - subtotal;
  const promoDiscount = promoApplied? subtotal * 0.1 : 0;
  const discount = savings + promoDiscount;
  const shipping = subtotal >= 999? 0 : 99;
  const total = subtotal - promoDiscount + shipping;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center animate__animated animate__fadeIn">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-indigo-600 uppercase mb-1">
                          {item.brand}
                        </div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-base sm:text-lg font-bold text-gray-900 hover:text-indigo-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.color && (
                          <div className="text-sm text-gray-600 mt-1">
                            Color: {item.color}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-center font-semibold min-w-[50px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                      <div className="mt-2 text-xs text-orange-600 font-medium">
                        Only {item.stock} left in stock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 animate__animated animate__fadeInRight">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Enter code"
                      disabled={promoApplied}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  {promoApplied? (
                    <button
                      onClick={() => {
                        setPromoApplied(false);
                        setPromoCode('');
                      }}
                      className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {promoError && (
                  <p className="mt-2 text-xs text-red-600">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Promo code applied - 10% off
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">
                      -₹{discount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium">Free shipping on orders over ₹999</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="text-right text-sm text-green-600 font-medium mt-1">
                      You save ₹{savings.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/shop"
                className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
