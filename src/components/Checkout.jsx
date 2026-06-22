import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Truck,
  Lock,
  ChevronLeft,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import 'animate.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('shipping'); // shipping, payment, review
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Options
    saveInfo: false,
    shippingMethod: 'standard'
  });

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      brand: 'SoundMax Pro',
      price: 4999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      brand: 'FitTech',
      price: 3499,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
    }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 0, days: '5-7 days', icon: Truck },
    { id: 'express', name: 'Express Delivery', price: 99, days: '2-3 days', icon: Truck },
    { id: 'overnight', name: 'Overnight Delivery', price: 299, days: '1 day', icon: Truck }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedShipping = shippingOptions.find(opt => opt.id === formData.shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shippingCost + tax;

  const validateShipping = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    if (paymentMethod !== 'card') return true;
    
    const newErrors = {};
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;

    if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
    else if (!cardRegex.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Enter valid 16-digit card number';
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (!expiryRegex.test(formData.expiryDate)) newErrors.expiryDate = 'Use MM/YY format';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    else if (!cvvRegex.test(formData.cvv)) newErrors.cvv = 'Enter valid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'? checked : formattedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (step === 'shipping' && validateShipping()) {
      setStep('payment');
      console.log('Shipping validated:', { shippingInfo: formData });
    } else if (step === 'payment' && validatePayment()) {
      setStep('review');
      console.log('Payment validated:', { paymentMethod, cardLast4: formData.cardNumber.slice(-4) });
    }

    navigate('/order-success')
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const orderData = {
      items: cartItems,
      shipping: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        method: formData.shippingMethod
      },
      payment: {
        method: paymentMethod,
        cardLast4: formData.cardNumber.slice(-4)
      },
      pricing: {
        subtotal,
        shipping: shippingCost,
        tax,
        total
      },
      timestamp: new Date().toISOString()
    };

    console.log('Order placed:', orderData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/order-success', { state: { orderId: 'POP' + Date.now() } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Cart</span>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8 animate__animated animate__fadeInDown">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {['shipping', 'payment', 'review'].map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                  step === s
                   ? 'bg-indigo-600 text-white scale-110'
                    : idx < ['shipping', 'payment', 'review'].indexOf(step)
                     ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {idx < ['shipping', 'payment', 'review'].indexOf(step)? (
                    <Check className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`hidden sm:inline text-sm font-semibold capitalize ${
                  step === s? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  {s}
                </span>
                {idx < 2 && <div className="w-8 sm:w-16 h-0.5 bg-gray-300"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 animate__animated animate__fadeInUp">
              {/* Shipping Step */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                    Shipping Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.firstName
                           ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.lastName
                           ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.email
                             ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-indigo-500'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.phone
                             ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-indigo-500'
                          }`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.address
                         ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-indigo-500'
                      }`}
                      placeholder="House No., Building, Street"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.city
                           ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                        }`}
                        placeholder="Delhi"
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.state
                           ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                        }`}
                        placeholder="Delhi"
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-600">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.pincode
                           ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                        }`}
                        placeholder="110001"
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.shippingMethod === option.id
                             ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={option.id}
                              checked={formData.shippingMethod === option.id}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600"
                            />
                            <option.icon className="w-5 h-5 text-gray-600" />
                            <div>
                              <div className="font-semibold text-gray-900">{option.name}</div>
                              <div className="text-xs text-gray-600">{option.days}</div>
                            </div>
                          </div>
                          <div className="font-bold text-gray-900">
                            {option.price === 0? 'FREE' : `₹${option.price}`}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Payment Step */}
              {step === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                    Payment Method
                  </h2>

                  <div className="space-y-3 mb-6">
                    <label
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'card'
                         ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'upi'
                         ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-semibold text-gray-900">UPI</span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'cod'
                         ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6 animate__animated animate__fadeIn">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.cardNumber
                             ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-indigo-500'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.cardName
                             ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-indigo-500'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-xs text-red-600">{errors.cardName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              errors.expiryDate
                               ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-indigo-500'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              errors.cvv
                               ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-indigo-500'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6 animate__animated animate__fadeIn">
                      <p className="text-sm text-gray-700">
                        You'll be redirected to your UPI app to complete the payment after reviewing your order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6 animate__animated animate__fadeIn">
                      <p className="text-sm text-gray-700">
                        Pay with cash upon delivery. Additional ₹40 handling fee may apply.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('shipping')}
                      className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {step === 'review' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                    Review Your Order
                  </h2>

                  <div className="space-y-6 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        Shipping Address
                      </h3>
                      <p className="text-sm text-gray-700">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.pincode}<br />
                        {formData.country}<br />
                        {formData.phone}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        Payment Method
                      </h3>
                      <p className="text-sm text-gray-700 capitalize">
                        {paymentMethod === 'card'? `Card ending in ${formData.cardNumber.slice(-4)}` : paymentMethod.toUpperCase()}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-indigo-600" />
                        Items ({cartItems.length})
                      </h3>
                      <div className="space-y-3">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex gap-3">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-600">{item.brand}</div>
                              <div className="text-sm text-gray-900 mt-1">
                                ₹{item.price.toLocaleString()} × {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('payment')}
                      className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting? 'Processing...' : `Place Order • ₹${total.toLocaleString()}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 animate__animated animate__fadeInUp">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{item.name}</div>
                      <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shippingCost === 0? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-semibold text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString()}</span>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700">
                    <div className="font-semibold text-gray-900 mb-1">Secure Checkout</div>
                    Your payment information is encrypted and secure. We never store your card details.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
