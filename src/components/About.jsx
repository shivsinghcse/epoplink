import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Globe, Award, Shield, Zap, Heart, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import 'animate.css';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Products Sold', value: '2M+', icon: ShoppingBag },
    { label: 'Countries', value: '30+', icon: Globe },
    { label: 'Partner Brands', value: '500+', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Every transaction is protected with bank-level encryption. Shop with complete confidence knowing your data is safe.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'From browsing to checkout to delivery tracking — we optimize every step for speed without compromising quality.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction drives us. 24/7 support, hassle-free returns, and personalized recommendations that actually help.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Rahul Verma',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Ananya Patel',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      name: 'Arjun Singh',
      role: 'VP Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center animate__animated animate__fadeInUp">
            <div className="flex justify-center mb-8">
              <Logo size="xl" showTagline={true} linkTo="/" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Redefining how you{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                shop online
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
              Poplink was born from a simple idea: premium products should be accessible, 
              discovery should be delightful, and delivery should be dependable.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate__animated animate__fadeInLeft">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2024 in Delhi, Poplink started when our team got frustrated with 
                  cluttered marketplaces and endless scrolling to find quality products.
                </p>
                <p>
                  We asked: What if shopping felt curated instead of chaotic? What if every product 
                  was verified, every review was real, and delivery was something you could count on?
                </p>
                <p>
                  Today, we partner with 500+ premium brands to bring you products that matter. 
                  No dropshipping, no counterfeits, no surprises — just Click. Shop. Delivered.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative animate__animated animate__fadeInRight">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Poplink team working"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              What we stand for
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Three principles guide every decision we make at Poplink
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Meet the team
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Builders, dreamers, and problem-solvers united by one mission
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate__animated animate__fadeInUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to experience better shopping?
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10 leading-relaxed">
            Join 50,000+ customers who've made the switch to Poplink. 
            Premium products, verified reviews, lightning-fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg border-2 border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;