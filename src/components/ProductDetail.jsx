import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  Check,
  ChevronRight
} from 'lucide-react';
import 'animate.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: id || '1',
    name: 'Wireless Noise-Cancelling Headphones Pro',
    brand: 'SoundMax Pro',
    price: 6499,
    originalPrice: 12999,
    discount: 50,
    rating: 4.8,
    reviewsCount: 2341,
    stock: 12,
    sku: 'SMP-WH-001',
    description: 'Experience premium sound quality with advanced noise-cancelling technology. 40-hour battery life, premium comfort, and crystal-clear calls.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e0fa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a', available: true },
      { name: 'Pearl White', hex: '#f5f5f5', available: true },
      { name: 'Navy Blue', hex: '#1e3a8a', available: false }
    ],
    sizes: [],
    features: [
      'Active Noise Cancellation up to 35dB',
      '40-hour battery life with ANC on',
      'Premium memory foam ear cushions',
      'Bluetooth 5.3 with multipoint connection',
      'Built-in mic with voice assistant support',
      'Foldable design with carrying case included'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery': '1000mAh Lithium-ion',
      'Charging': 'USB-C, 2 hours full charge',
      'Weight': '250g',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    reviewsList: [
      {
        id: 1,
        author: 'Rahul S.',
        rating: 5,
        date: '2026-06-15',
        comment: 'Best headphones I\'ve owned. ANC is incredible and battery lasts forever.',
        verified: true
      },
      {
        id: 2,
        author: 'Priya M.',
        rating: 4,
        date: '2026-06-10',
        comment: 'Great sound quality. Only wish the case was a bit smaller.',
        verified: true
      },
      {
        id: 3,
        author: 'Amit K.',
        rating: 5,
        date: '2026-06-05',
        comment: 'Perfect for work calls and music. Highly recommend!',
        verified: true
      }
    ]
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor && product.colors.length > 0) {
      console.log('Add to cart validation failed:', { error: 'Please select a color' });
      return;
    }

    console.log('Add to cart:', {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      timestamp: new Date().toISOString()
    });
  };

  const handleBuyNow = () => {
    if (!selectedColor && product.colors.length > 0) {
      console.log('Buy now validation failed:', { error: 'Please select a color' });
      return;
    }

    console.log('Buy now:', {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      timestamp: new Date().toISOString()
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', {
      productId: product.id,
      name: product.name,
      wishlisted:!isWishlisted,
      timestamp: new Date().toISOString()
    });
  };

  const handleShare = () => {
    console.log('Share product:', {
      productId: product.id,
      name: product.name,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Electronics</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="animate__animated animate__fadeInLeft">
            <div className="sticky top-24">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                      ? 'border-indigo-600 scale-105'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <div className="mb-4">
              <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                {product.brand}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  {product.discount}% OFF
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(product.originalPrice - product.price).toLocaleString()}
              </p>
            </div>

            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Color: {selectedColor || 'Select'}
                  </label>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.available && setSelectedColor(color.name)}
                      disabled={!color.available}
                      className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                        selectedColor === color.name
                        ? 'border-indigo-600 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${!color.available? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check className="w-6 h-6 text-white absolute inset-0 m-auto" />
                      )}
                      {!color.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-gray-400 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-900 mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-center font-semibold min-w-[60px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-4 border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isWishlisted
                  ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted? 'fill-red-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-4 border-2 border-gray-300 hover:border-gray-400 text-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg mb-8"
            >
              Buy Now
            </button>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-xs font-semibold text-gray-900">Free Delivery</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-xs font-semibold text-gray-900">7-Day Returns</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-xs font-semibold text-gray-900">1 Year Warranty</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              SKU: {product.sku}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold text-sm capitalize transition-colors duration-200 ${
                  activeTab === tab
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="animate__animated animate__fadeIn">
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              <h3 className="font-bold text-gray-900 mb-4">Key Features:</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="animate__animated animate__fadeIn">
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="animate__animated animate__fadeIn">
              <div className="space-y-6">
                {product.reviewsList.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-indigo-600">{review.author[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.author}</div>
                          {review.verified && (
                            <div className="text-xs text-green-600 font-medium">Verified Purchase</div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
