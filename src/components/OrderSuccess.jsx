import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  ArrowRight,
  Home,
  ShoppingBag,
  Calendar,
  MapPin
} from 'lucide-react';
import 'animate.css';

const OrderSuccess = () => {
  const location = useLocation();
  
  // Mock order data - replace with location.state from checkout
  const order = location.state?.order || {
    orderId: 'POP-2026-0623-8429',
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    total: 8998,
    subtotal: 7499,
    shipping: 0,
    discount: 1500,
    items: [
      {
        id: 1,
        name: 'Wireless Noise-Cancelling Headphones Pro',
        brand: 'SoundMax Pro',
        price: 6499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        color: 'Midnight Black'
      },
      {
        id: 2,
        name: 'Premium Cotton T-Shirt',
        brand: 'EcoWear',
        price: 899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        color: 'White'
      }
    ],
    shippingAddress: {
      name: 'Rahul Sharma',
      address: '42, Green Park Extension',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 98765 43210'
    },
    paymentMethod: 'UPI',
    email: 'rahul.sharma@example.com'
  };

  useEffect(() => {
    console.log('Order success page loaded:', {
      orderId: order.orderId,
      total: order.total,
      itemCount: order.items.length,
      timestamp: new Date().toISOString()
    });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownloadInvoice = () => {
    console.log('Download invoice:', {
      orderId: order.orderId,
      timestamp: new Date().toISOString()
    });
  };

  const handleTrackOrder = () => {
    console.log('Track order:', {
      orderId: order.orderId,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Success Header */}
        <div className="text-center mb-12 animate__animated animate__fadeInDown">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate__animated animate__bounceIn">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for shopping with Poplink
          </p>
          <p className="text-sm text-gray-500">
            Order confirmation sent to <span className="font-semibold text-gray-900">{order.email}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate__animated animate__fadeInUp">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 sm:px-8 py-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm text-indigo-100 mb-1">Order Number</div>
                <div className="text-2xl font-bold">{order.orderId}</div>
              </div>
              <button
                onClick={handleDownloadInvoice}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="px-6 sm:px-8 py-8 border-b border-gray-100">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Order Confirmed</div>
                  <div className="text-sm text-gray-600">{formatDate(order.orderDate)}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Processing</div>
                  <div className="text-sm text-gray-600">1-2 business days</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Estimated Delivery</div>
                  <div className="text-sm text-gray-600">{formatDate(order.estimatedDelivery)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-indigo-600 uppercase mb-1">
                      {item.brand}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    {item.color && (
                      <div className="text-sm text-gray-600">Color: {item.color}</div>
                    )}
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
                <div className="text-gray-700 leading-relaxed">
                  <div className="font-semibold">{order.shippingAddress.name}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </div>
                  <div className="mt-1">{order.shippingAddress.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-6 sm:px-8 py-6 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold">
                  {order.shipping === 0? 'FREE' : `₹${order.shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-3 border-t border-gray-300">
                <span>Total Paid</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Payment Method</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          <button
            onClick={handleTrackOrder}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Package className="w-5 h-5" />
            Track Your Order
          </button>
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate__animated animate__fadeInUp animate__delay-1s">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              to="/orders"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <Package className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">My Orders</div>
                <div className="text-xs text-gray-600">View all orders</div>
              </div>
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <Mail className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">Support</div>
                <div className="text-xs text-gray-600">Get help</div>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <Home className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">Back Home</div>
                <div className="text-xs text-gray-600">Return to homepage</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-8 text-center text-sm text-gray-600 animate__animated animate__fadeInUp animate__delay-2s">
          <p className="mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Expected delivery by <span className="font-semibold text-gray-900">{formatDate(order.estimatedDelivery)}</span>
          </p>
          <p>
            We'll send you tracking details once your order ships
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
