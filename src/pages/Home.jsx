import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Instagram, Heart, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Timeless Assamese Elegance',
      // subtitle: 'Discover handcrafted couture that celebrates our rich heritage while embracing contemporary style',
      image: '/images/1.jpeg',
      cta: 'Explore Collection'
    },
    {
      title: 'Bridal Collection',
      // subtitle: 'Exquisite Muga silk ensembles for your most precious moments',
      image: '/images/2.jpeg',
      cta: 'View Bridal Wear'
    },
    {
      title: 'Fusion Heritage',
      // subtitle: 'Where tradition meets modernity in perfect harmony',
      image: '/images/3.jpg',
      cta: 'Shop Fusion'
    },
    {
      title: 'Occasion Classics',
      // subtitle: 'Where tradition meets modernity in perfect harmony',
      image: '/images/4.jpeg',
      cta: 'Shop Fusion'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const featuredCollections = [
    {
      title: 'Bridal Collection',
      // description: 'Timeless elegance for your special day',
      image: '/images/2.1.jpeg',
      link: '/shop/bridal'
    },
    {
      title: 'Occasion Wear',
      // description: 'Perfect for celebrations and festivities',
      image: '/images/3.jpg',
      link: '/shop/occasion'
    },
    {
      title: 'Fusion Collection',
      // description: 'Contemporary meets traditional',
      image: '/images/4.jpeg',
      link: '/shop/fusion'
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: 'Mekhela Chador Royale',
      price: '₹45,000',
      image: '/images/5.jpg',
      isNew: true
    },
    {
      id: 2,
      name: 'Golden Silk Ensemble',
      price: '₹32,000',
      image: '/images/6.jpeg',
      isNew: true
    },
    {
      id: 3,
      name: 'Heritage Weave Saree',
      price: '₹28,000',
      image: '/images/7.jpeg',
      isNew: true
    },
    {
      id: 4,
      name: 'Contemporary Kurta Set',
      price: '₹15,000',
      image: '/images/8.jpeg',
      isNew: true
    }
  ];

  const bestSellers = [
    {
      id: 1,
      name: 'Classic Muga Silk Mekhela',
      price: '₹55,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 5,
      reviews: 24
    },
    {
      id: 2,
      name: 'Handwoven Eri Silk Saree',
      price: '₹35,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 18
    },
    {
      id: 3,
      name: 'Designer Lehenga Set',
      price: '₹42,000',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 4,
      reviews: 31
    }
  ];

  const instagramFeed = [
    '/images/1.jpeg',
    '/images/2.1.jpeg',
    '/images/3.jpg',
    '/images/4.jpeg',
    '/images/5.jpg',
    '/images/6.jpeg'
  ];

  const spotlightItems = [
    { id: 1, name: 'Celebrity 1', image: '/images/1.jpeg' },
    { id: 2, name: 'Celebrity 2', image: '/images/2.jpeg' },
    { id: 3, name: 'Photoshoot 1', image: '/images/3.jpg' },
    { id: 4, name: 'Photoshoot 2', image: '/images/4.jpeg' },
  ];

  return (
    // <div
    //   className="pt-14 min-h-screen bg-fixed bg-center bg-cover"
    //   style={{ backgroundImage: "url('/images/Background.png')" }}
    // >
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-[50%_5%]"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center max-w-4xl mx-auto px-4 translate-y-1/2">
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-teal-100 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="space-x-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center bg-yellow-400/80 text-teal-900 px-5 py-2.5 rounded-full font-medium hover:bg-yellow-400/90 transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>


                  {/* <Link
                    to="/about"
                    className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-900 transition-all duration-300"
                  >
                    Our Story
                  </Link> */}

                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <Link
                key={index}
                to={collection.link}
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-none"
              >
                <div>
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-[32rem] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-3">{collection.title}</h3>
                  <p className="text-base opacity-90 mb-5">{collection.description}</p>
                  <span className="inline-flex items-center text-yellow-300 font-semibold">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


    {/* Designer Quote */}
<section className="relative py-8 bg-gradient-to-br from-teal-50 via-white to-teal-100 overflow-hidden">
  {/* Decorative background (pattern.svg should be inside /public) */}
  <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-center bg-cover" />

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Icon animation */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Quote className="h-12 w-12 text-yellow-500 mx-auto mb-6" />
    </motion.div>

    {/* Quote animation */}
    <motion.blockquote
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-2xl md:text-3xl font-serif text-yellow-600 mb-6 leading-relaxed"
    >
      "Every thread tells a story, every pattern carries the wisdom of generations,
      and every garment represents our commitment to keeping the traditions of Assam alive."
    </motion.blockquote>

    {/* Author animation */}
    <motion.cite
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      viewport={{ once: true }}
      className="text-yellow-700 font-semibold block"
    >
      — Zinku, Creative Director
    </motion.cite>
  </div>
</section>


      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">
              New Arrivals
            </h2>
            {/* <p className="text-lg text-gray-600">Fresh designs that capture the essence of modern Assamese couture</p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {newArrivals.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-none mb-4">
                  {item.isNew && (
                    <span className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                      New
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[28rem] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm text-gray-700 mb-2">{item.name}</h3>
                <p className="text-teal-600 text-sm">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
            >
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Story
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
              A Legacy Woven in Gold
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              In the heart of Assam, where the Brahmaputra flows with ancient stories, our artisans continue a tradition that spans centuries. Each Muga silk thread is spun with the same care and precision that our ancestors used, creating garments that are not just clothing, but pieces of living history.
            </p>
            <div className="flex items-center justify-center space-x-8 text-teal-600">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Years of Tradition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm">Master Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Heritage Teaser 2x2 Full Width & Taller Cells */}
      <section className="w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-0">

            {/* a1 - Top Left Video */}
            <div className="relative rounded-none overflow-hidden h-[36rem] lg:h-[48rem]">
              <video
                src="/videos/video1.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>

            {/* a2 - Top Right Content */}
            <div className="flex flex-col justify-center rounded-none p-12 bg-white shadow-lg h-[36rem] lg:h-[48rem]">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-6">
                Celebrating Assamese Heritage
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every piece in our collection tells a story of Assam's rich cultural heritage. From the golden threads of Muga silk to the intricate patterns passed down through generations, we honor our ancestors while creating for the future.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-none font-semibold hover:bg-teal-700 transition-colors"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* b1 - Bottom Left Custom Content */}
            <div className="flex flex-col justify-center rounded-none p-12 bg-white shadow-lg h-[36rem] lg:h-[48rem]">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-6">
                Customize Your Attire
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Work with our designers to create a one-of-a-kind outfit that perfectly reflects your style and heritage.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-yellow-400 text-teal-900 px-6 py-3 rounded-none font-semibold hover:bg-yellow-300 transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* b2 - Bottom Right Video */}
            <div className="relative rounded-none overflow-hidden h-[36rem] lg:h-[48rem]">
              <video
                src="/videos/video2.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>



      {/* The Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">
              The Spotlight
            </h2>
            <p className="text-lg text-gray-600">
              Photoshoots and celebrities wearing our collections
            </p>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-4 sm:px-6 lg:px-8"
          >
            {spotlightItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group cursor-pointer overflow-hidden shadow-lg rounded-none">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      {/* Artisan Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Quote className="h-8 w-8 text-yellow-300 mb-4" />
                <blockquote className="text-xl md:text-2xl font-serif mb-6 leading-relaxed">
                  "When I weave, I don't just create fabric. I weave dreams, stories, and the hopes of generations into every thread."
                </blockquote>
                <cite className="text-yellow-300 font-semibold">— Kamala Devi, Master Weaver</cite>
                <p className="text-teal-200 text-sm mt-2">40 years of weaving excellence</p>
              </div>
              <div className="relative">
                <img
                  src="/images/8.jpeg"
                  alt="Master weaver at work"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-teal-900 p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-sm">Supporting 150+ Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">
              @JulethiByZinku
            </h2>
            <p className="text-lg text-gray-600">Follow us for behind-the-scenes and style inspiration</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramFeed.map((image, index) => (
              <a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 w-6" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">
            Stay In Touch
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Be the first to know about new collections, exclusive events, and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-teal-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-teal-300 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div >
  );
};

export default Home;