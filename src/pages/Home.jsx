import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../redux/actions/productActions';
import { ArrowRight, Star, Instagram, Heart, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ImageCarousel from '../components/ImageCarousel';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const newArrivalsProducts = products?.filter((p) => p.isNewArrival).slice(0, 4);


  const heroSlides = [
    {
      title: 'Timeless Assamese Elegance',
      // subtitle: 'Discover handcrafted couture that celebrates our rich heritage while embracing contemporary style',
      image: '/images/hero1.png',
      cta: 'Explore Collection'
    },
    {
      title: 'Bridal Collection',
      // subtitle: 'Exquisite Muga silk ensembles for your most precious moments',
      image: '/images/hero2.png',
      cta: 'Explore Collection'
    },
    {
      title: 'Signature Drapes ',
      // subtitle: 'Where tradition meets modernity in perfect harmony',
      image: '/images/hero3.png',
      cta: 'Explore Collection'
    },
    {
      title: 'Occasion Classics',
      // subtitle: 'Where tradition meets modernity in perfect harmony',
      image: '/images/hero4.png',
      cta: 'Explore Collection'
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
      image: '/images/f1.png',
      link: '/shop/bridal'
    },
    {
      title: 'Occasion Classics',
      // description: 'Perfect for celebrations and festivities',
      image: '/images/f2.png',
      link: '/shop/occasion'
    },
    {
      title: 'Signature Drapes',
      // description: 'Contemporary meets traditional',
      image: '/images/f3.jpeg',
      link: '/shop/bridal'
    }
  ];


  const instagramFeed = [
    '/images/i2.jpg',
    '/images/i1.jpg',
    '/images/i3.jpg',
    '/images/i4.jpg',
    '/images/i5.jpg',
    '/images/i6.jpg'
  ];

  const spotlightItems = [
    { id: 1, name: 'Barsharani Bishaya', image: '/images/barsha.jpg' },
    { id: 2, name: 'Meghranjani', image: '/images/megh.jpg' },
    { id: 3, name: 'Diganggana Bora ', image: '/images/digg.jpg' },
    { id: 4, name: 'Reecha Chetry', image: '/images/reecha.jpg' },
    { id: 4, name: 'Parismita Boruah', image: '/images/pari.jpg' },
  ];

 const quotes = [
  "Every thread tells a story of Assam's rich heritage.",
  "We weave tradition into modern elegance.",
  "Each garment reflects love, craft, and generations of wisdom."
];

const [currentQuote, setCurrentQuote] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  }, 4000); // Change quote every 4 seconds
  return () => clearInterval(interval);
}, []);

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
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#fff8e7]">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-crimson-100 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="space-x-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center bg-[#fff8e7]/80 text-crimson-900 px-5 py-2.5 rounded-full font-medium hover:bg-crimson-600/90 transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>


                  {/* <Link
                    to="/about"
                    className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-crimson-900 transition-all duration-300"
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
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-amber-400' : 'bg-white/50'
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
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#fff8e7]">{collection.title}</h3>
                  <p className="text-base opacity-90 mb-5">{collection.description}</p>
                  <span className="inline-flex items-center text-amber-200 font-semibold">
                    Shop
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

{/* Designer Quotes - Compact, Bolder & Italic */}
<section className="relative py-6 pb-4 bg-gradient-to-br from-crimson-50 via-white to-crimson-100 overflow-hidden">
  {/* Decorative background pattern */}
  <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-center bg-cover" />

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Quote Icon */}
    <Quote className="h-8 w-8 text-amber-500 mx-auto mb-3" />

    {/* Rotating Quotes */}
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={currentQuote}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6 }}
          className="text-base md:text-lg font-serif font-semibold italic text-black leading-snug"
        >
          "{quotes[currentQuote]}"
        </motion.blockquote>
      </AnimatePresence>
    </div>
  </div>
</section>

{/* New Arrivals */}
<section className="pt-8 pb-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-4">
        New Arrivals
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {newArrivalsProducts.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-none mb-4">
            {item.isNewArrival && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                New
              </span>
            )}

            {/* Image Carousel */}
            <ImageCarousel images={item.images || [item.imgUrl]} />

            {/* Wishlist Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

                {/* Product Info */}
                <h3 className="text-sm text-gray-700 mb-2">{item.name}</h3>

                <div className="flex items-center gap-1">
                  {item.discountedPrice ? (
                    <>
                      <span className="text-sm font-semibold text-rose-600">
                        ₹{item.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        ({Math.round(((item.price - item.discountedPrice) / item.price) * 100)}% OFF)
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-crimson-700">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop?filter=new"
              className="inline-flex items-center bg-crimson-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-crimson-700 transition-colors"
            >
              View All New Arrivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* Heritage Story
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
              A Legacy Woven in Gold
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              In the heart of Assam, where the Brahmaputra flows with ancient stories, our artisans continue a tradition that spans centuries. Each Muga silk thread is spun with the same care and precision that our ancestors used, creating garments that are not just clothing, but pieces of living history.
            </p>
            <div className="flex items-center justify-center space-x-8 text-crimson-600">
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

            {/* a2 - Top Right Content → now crimson gradient */}
            <div className="flex flex-col justify-center rounded-none p-12 bg-gradient-to-tr from-white via-crimson-50 to-crimson-100 shadow-lg h-[36rem] lg:h-[48rem]">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-6">
                Celebrating Assamese Heritage
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every piece in our collection tells a story of Assam's rich cultural heritage. From the golden threads of Muga silk to the intricate patterns passed down through generations, we honor our ancestors while creating for the future.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-crimson-600 text-white px-6 py-3 rounded-none font-semibold hover:bg-crimson-700 transition-colors"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* b1 - Bottom Left Custom Content → now golden gradient */}
            <div className="flex flex-col justify-center rounded-none p-12 bg-gradient-to-br from-white via-amber-50 to-amber-100 shadow-lg h-[36rem] lg:h-[48rem]">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-6">
                Customize Your Attire
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Work with our designers to create a one-of-a-kind outfit that perfectly reflects your style and heritage.
              </p>
              <Link
  to="/custom"
  className="inline-flex items-center bg-amber-400 text-crimson-900 px-6 py-3 rounded-none font-semibold hover:bg-amber-300 transition-colors"
>
  Customise Your Attire
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
      <section className="py-16 bg-gradient-to-br from-amber-50 via-rose-50 to-crimson-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-4">
              The Spotlight
            </h2>
            <p className="text-lg text-gray-600 italic">
              Celebrities and style icons adorned in our collections
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
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[30rem] object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Optional overlay text inside photo */}
                    {item.text && (
                      <div className="absolute bottom-4 left-4 bg-black/40 text-white italic text-sm md:text-base p-2 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.text}
                      </div>
                    )}
                  </div>

                  {/* Cream name box (reduced width) */}
                  <div className="p-3 bg-[#FFF9E6]">
                    <h3 className="text-lg font-serif italic font-medium text-gray-700 text-center">
                      {item.name}
                    </h3>
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
          <div className="bg-gradient-to-r from-crimson-900 to-crimson-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Quote className="h-8 w-8 text-amber-300 mb-4" />
                <blockquote className="text-xl md:text-2xl font-serif mb-6 leading-relaxed">
                  "When I weave, I don't just create fabric. I weave dreams, stories, and the hopes of generations into every thread."
                </blockquote>
                <cite className="text-amber-300 font-semibold">— Rita Devi, Master Weaver</cite>
                <p className="text-crimson-200 text-sm mt-2">20 years of weaving excellence</p>
              </div>
              <div className="relative">
                <img
                  src="/images/8.jpeg"
                  alt="Master weaver at work"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-amber-400 text-crimson-900 p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-sm">Supporting 150+ Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       
      {/* Compact Google Reviews / Testimonials */}
<section className="py-12 bg-gradient-to-br from-rose-50 via-white to-rose-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-crimson-900 mb-2">
        Our Client Experiences
      </h2>
      <p className="text-sm md:text-base text-gray-600">
        Verified Google Reviews
      </p>
    </div>

    {/* Swiper Carousel */}
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-2 sm:px-4 lg:px-6"
    >
      {[
        {
          id: 1,
          name: "Raj Kamal Gautam",
          quote: "I had the privilege of choosing Julethi – A Boutique of Assam Silk for designing my Wedding Reception costumes for both the bride and groom, and I couldn’t be happier with the experience."
        },
        {
          id: 2,
          name: "Soonity Goswami",
          quote: "I had a wonderful experience shopping at Julethi. The collection is truly exquisite, with a wide variety of traditional and modern designs. The fabric quality is excellent. Each piece reflects fine craftsmanship and attention to detail, showcasing the rich Assamese culture beautifully. Highly recommended!"
        },
        {
          id: 3,
          name: "Munni Ahmed",
          quote: "I had ordered a Sador-Mekhela and honestly, it turned out to be absolutely amazing. From the quality of the fabric to the design, every detail reflects care and craftsmanship. The color combination, weaving, and finishing are simply perfect."
        },
        {
          id: 4,
          name: "Shanghamitra Goswami",
          quote: "Your ability to blend craftsmanship with culture results in truly breathtaking creations. My first experience with Julethi was fantastic. Thanks, Julethi!"
        },
        {
          id: 5,
          name: "Jugal Gogoi",
          quote: "Worth a review after I brought a couple of 'Chadar Mekhela' for my Mom. It's purely authentic. 100% you can rely upon. The quality of the fabrics and other items are top notch. Amazing products. Thumbs up!"
        },
        {
          id: 6,
          name: "Prerna Hazarika",
          quote: "Exceptional designs and impeccable craftsmanship also understands your style and brings it to life…Highly recommend 💯🤍"
        },
        {
          id: 7,
          name: "Rinku Khound",
          quote: "I love the collections. Very unique colours and designs. I bought a set of chadar mekhela and the quality of silk is outstanding. Highly recommended boutique of Assam silk traditional wear."
        }
      ].map((item) => (
        <SwiperSlide key={item.id}>
          <div className="group cursor-pointer overflow-hidden shadow rounded-lg bg-white p-4 flex flex-col">
            {/* Quote */}
            <p className="text-gray-700 italic text-sm mb-4">&quot;{item.quote}&quot;</p>

            {/* Reviewer Name with Icon */}
            <div className="flex items-center gap-2 mt-auto">
              <User className="text-amber-400 w-5 h-5" />
              <h3 className="text-base font-semibold text-crimson-900">{item.name}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>
      {/* Instagram Feed */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-4">
              <a
                href="https://www.instagram.com/julethi_by_zinku"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                @julethi_by_zinku
              </a>
            </h2>

            <p className="text-lg text-gray-600">Follow us for behind-the-scenes and style inspiration</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramFeed.map((image, index) => (
              <a
                key={index}
                href="https://www.instagram.com/julethi_by_zinku/"
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

      {/* Newsletter
      <section className="py-16 bg-crimson-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-4">
            Stay In Touch
          </h2>
          <p className="text-xl text-crimson-100 mb-8">
            Be the first to know about new collections, exclusive events, and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="submit"
              className="bg-amber-400 text-crimson-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-crimson-300 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section> */}
    </div >
  );
};

export default Home;