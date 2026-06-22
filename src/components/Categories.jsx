import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Dumbbell, 
  Book, 
  Baby, 
  Car,
  Laptop,
  Watch,
  Sofa,
  ShoppingBag,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import 'animate.css';

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
      productCount: 2847,
      trending: true,
      subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Cameras'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Fashion',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
      productCount: 5632,
      trending: true,
      subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Shoes', 'Bags', 'Accessories'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 3,
      name: 'Home & Living',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      productCount: 1923,
      trending: false,
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Lighting'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 4,
      name: 'Beauty & Care',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      productCount: 1456,
      trending: true,
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Wellness'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      name: 'Sports & Fitness',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      productCount: 987,
      trending: false,
      subcategories: ['Gym Equipment', 'Sportswear', 'Outdoor', 'Yoga', 'Cycling'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      name: 'Books & Stationery',
      icon: Book,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      productCount: 3421,
      trending: false,
      subcategories: ['Fiction', 'Non-Fiction', 'Notebooks', 'Art Supplies', 'Office'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 7,
      name: 'Kids & Baby',
      icon: Baby,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      productCount: 2134,
      trending: false,
      subcategories: ['Toys', 'Clothing', 'Baby Care', 'School Supplies', 'Games'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 8,
      name: 'Automotive',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
      productCount: 756,
      trending: false,
      subcategories: ['Car Accessories', 'Tools', 'Care Products', 'Electronics', 'Interior'],
      color: 'from-gray-600 to-slate-700'
    }
  ];

  const featuredCategories = [
    { icon: Laptop, name: 'Laptops', count: '450+' },
    { icon: Watch, name: 'Watches', count: '320+' },
    { icon: Sofa, name: 'Furniture', count: '280+' },
    { icon: ShoppingBag, name: 'Handbags', count: '540+' }
  ];

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', {
      id: category.id,
      name: category.name,
      productCount: category.productCount,
      timestamp: new Date().toISOString()
    });
  };

  const handleSubcategoryClick = (categoryName, subcategory) => {
    console.log('Subcategory clicked:', {
      category: categoryName,
      subcategory: subcategory,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center animate__animated animate__fadeInDown">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
              Shop by Category
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
              Explore thousands of premium products across all categories. 
              Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories - Quick Access */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredCategories.map((item, index) => (
              <Link
                key={item.name}
                to={`/shop?category=${item.name.toLowerCase()}`}
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-indigo-200 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image Header */}
              <Link
                to={`/shop?category=${category.name.toLowerCase()}`}
                onClick={() => handleCategoryClick(category)}
                className="block relative h-48 overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <category.icon className="w-7 h-7 text-gray-900" />
                </div>

                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Hot
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.productCount.toLocaleString()} products
                    </p>
                  </div>
                </div>

                {/* Subcategories */}
                <div className="space-y-2">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <Link
                      key={sub}
                      to={`/shop?category=${category.name.toLowerCase()}&sub=${sub.toLowerCase()}`}
                      onClick={() => handleSubcategoryClick(category.name, sub)}
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-indigo-600 py-1.5 transition-colors duration-200 group/sub"
                    >
                      <span>{sub}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200" />
                    </Link>
                  ))}
                </div>

                {/* View All Link */}
                <Link
                  to={`/shop?category=${category.name.toLowerCase()}`}
                  onClick={() => handleCategoryClick(category)}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Browse all {categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}+ products or use our search
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;
