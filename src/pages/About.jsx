import { Link } from "react-router-dom";
import { Heart, Users, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description:
        'Every piece is created with love and dedication to preserve our cultural heritage',
    },
    {
      icon: Users,
      title: 'Community Support',
      description:
        'We work closely with local artisans to support traditional weaving communities',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description:
        'Uncompromising standards ensure each garment meets our luxury quality benchmarks',
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description:
        'Bringing Assamese culture to the world while staying rooted in tradition',
    },
  ];

  const roadmap = [
    {
      title: 'Commitment to Quality',
      description:
        'Every thread and pattern is crafted to uphold the highest standards of authenticity.',
      image: '/images/j1.jpeg',
    },
    {
      title: 'Innovative Designs',
      description:
        'Traditional weaving meets modern aesthetics in our exclusive collections.',
      image: '/images/j2.jpeg',
    },
    {
      title: 'Artisan Empowerment',
      description:
        'We collaborate closely with artisans, preserving skills and providing fair opportunities.',
      image: '/images/j3.jpeg',
    },
    {
      title: 'Global Recognition',
      description:
        'Our pieces have reached fashion lovers worldwide, celebrating Assamese heritage globally.',
      image: '/images/8.jpeg',
    },
  ];

  const team = [
    {
      name: 'Zinku',
      role: 'Founder & Creative Director',
      image: '/images/designer.png',
    },
    {
      name: 'Arup',
      role: 'Lead Artisan',
      image: 'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg',
    },
    {
      name: 'Mina',
      role: 'Design Assistant',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      name: 'Rohit',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ];

  return (
    <div className="pt-14">
      {/* ---------------- Brand Story ---------------- */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-gray-50 to-crimson-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-crimson-800 mb-4 sm:mb-6 text-left">
                About Julethi
                <span className="block font-normal text-base sm:text-xl text-crimson-700 mt-1 sm:mt-2">
                  Handwoven Silk & Cotton Couture from Assam
                </span>
              </h2>

              <div className="prose prose-sm sm:prose-base text-gray-600 leading-relaxed text-left">
                <p className="mb-3 sm:mb-4">
                 Born in the cultural heartland of Assam, Julethi celebrates the timeless art of handloom weaving- uniting luxury, authenticity, and craftsmanship. From our own weaving unit, we create handwoven silk couture and contemporary cotton wear that reflect Assam’s soul, using traditional looms and pure Assam Silk, Tussar, Mulberry, and Eri. 
                </p>
                {/* <p className="mb-4 sm:mb-6">
                  Each creation at Julethi- from elegant Mekhla Chadar sets to modern stoles and jackets- carries the patience, heritage, and artistry of our master weavers.
                </p> */}

                {/* Explore Collection Button */}
                <div className="flex justify-start">
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-5 py-2.5 bg-crimson-500 text-white font-medium rounded-full shadow-md hover:bg-crimson-700 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Explore Julethi
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 relative w-full"
            >
              <img
                src="/images/about.png"
                alt="Traditional weaving"
                className="rounded-2xl shadow-2xl w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover object-center mx-auto hover:scale-105 transition-transform duration-700"
              />
              {/* <motion.div
                className="absolute bottom-2 left-2 sm:-bottom-6 sm:-left-8 bg-crimson-600 text-white p-2.5 sm:p-4 rounded-2xl shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <p className="text-base sm:text-xl font-bold">2020</p>
                <p className="text-[10px] sm:text-xs">Founded with passion</p>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ---------------- House of Luit ---------------- */}
<section className="py-10 sm:py-14 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">

      {/* Designer Image — shown first on mobile */}
      <motion.div
        className="order-1 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/luit.png"
          alt="House of Luit"
          className="rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg h-[300px] sm:h-[400px] md:h-[450px] object-cover mx-auto hover:scale-105 transition-transform duration-700"
        />
      </motion.div>

      {/* Designer Text — shown after image on mobile */}
      <motion.div
        className="order-2 lg:order-2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-crimson-800 mb-4 sm:mb-6">
          House of Luit
          <span className="block text-base sm:text-lg text-crimson-600 font-normal mt-1 sm:mt-2">
            The Cotton Line by Julethi
          </span>
        </h2>
        <div className="prose prose-sm sm:prose-base text-gray-600 leading-relaxed">
          <p className="mb-3 sm:mb-5">
            Under the banner of “House of Luit”, Julethi introduces its affordable cotton attire collection- a tribute to the everyday elegance of handloom.
            Inspired by the gentle flow of the river Luit (Brahmaputra), this line brings lightweight handwoven cottons, everyday drapes, and minimalist designs
            for those who cherish comfort, authenticity, and cultural identity.
          </p>

          {/* Explore Collection Button */}
          <div className="flex justify-start">
            <Link
              to="/house-of-luit"
              className="inline-flex items-center px-5 py-2.5 bg-crimson-500 text-white font-medium rounded-full shadow-md hover:bg-crimson-700 transition-colors duration-300 text-sm sm:text-base"
            >
              Explore House of Luit
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>



      {/* ---------------- Journey Roadmap Section ---------------- */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-crimson-50 to-crimson-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-crimson-800 text-center mb-12 sm:mb-16">
            The Julethi Essence
          </h2>

          {/* ---------------- Desktop View ---------------- */}
          <div className="hidden lg:flex relative flex-col items-center">
            {/* Vertical line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 bg-gray-300 rounded-full z-0"
            />

            {roadmap.map((item, idx) => (
              <motion.div
                key={idx}
                className={`relative flex w-full items-center justify-between mb-24 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
              >
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-crimson-800 rounded-full shadow-lg border-4 border-white z-10"></div>

                {/* Image */}
                <div className="w-1/2 flex justify-end px-12">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="rounded-2xl shadow-2xl w-full max-w-md aspect-[5/4] object-cover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Text */}
                <div className="w-1/2 px-12 text-left">
                  <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ---------------- Mobile & Tablet View ---------------- */}
          <div className="flex flex-col lg:hidden relative">
            {/* Left vertical line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="absolute top-0 left-6 w-1.5 bg-gray-300 rounded-full z-0"
            />

            {roadmap.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative flex flex-col items-start mb-12 pl-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
              >
                <div className="flex items-start mb-2">
                  {/* Dot next to text header */}
                  <div className="w-4 h-4 bg-crimson-800 rounded-full shadow-lg border-2 border-white mt-1 mr-3"></div>
                  {/* Text Section */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Image below text */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="rounded-2xl shadow-2xl w-full max-w-xs aspect-[5/4] object-cover"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* ---------------- Factory, Mission & Team Section ---------------- */}
<section className="py-14 sm:py-20 bg-gradient-to-br from-white via-rose-50 to-crimson-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
    {/* ---------- Factory & Craftsmanship ---------- */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12 sm:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-crimson-800 mb-6 sm:mb-8">
        Our Factory & Craftsmanship
      </h2>
      <div className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-5">
        <p>
          In the heart of Assam, our artisans weave heritage into every thread. From Sualkuchi to
          Ahom Gaon, each loom tells a story of tradition, care, and timeless artistry.
        </p>
        <p>
          Every creation at Julethi is handwoven- ensuring authenticity, precision, and a deep
          connection to our cultural roots. We believe in slow fashion that empowers our artisans
          and preserves our legacy.
        </p>
      </div>
    </motion.div>

    {/* ---------- Our Team Section ---------- */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-serif font-bold text-crimson-900 mb-6 sm:mb-8">
        Meet Our Team
      </h2>

      {/* Team Banner */}
      <img
        src="/images/team.jpeg"
        alt="Our Team Banner"
        className="mx-auto mb-8 sm:mb-12 w-5/6 sm:w-3/4 max-w-xl rounded-xl shadow-xl hover:scale-105 transition-transform duration-700"
      />

      {/* Two Team Members */}
      <div className="flex flex-row gap-3 sm:gap-5 justify-center items-center mt-4 sm:mt-6 overflow-x-auto scrollbar-hide px-2">
        {[
          {
            name: "Zinku",
            role: "Creative Director",
            image: "/images/zinku.jpg",
          },
          {
            name: "Ranjan",
            role: "Operations Head",
            image: "/images/ranjan.jpeg",
          },
        ].map((member, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-col items-center text-center min-w-[160px] sm:min-w-[200px] hover:shadow-lg transition-all duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-2 border border-amber-200 shadow-sm"
            />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-tight">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* ---------- Mission Section ---------- */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-10 sm:mt-12"
    >
      <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed text-base sm:text-lg">
        Our mission is to preserve Assamese weaving while bringing it to the modern world.
        Through Julethi and House of Luit, we bridge heritage and innovation- where luxury meets
        accessibility, and craftsmanship empowers communities.
      </p>
      <p className="text-crimson-700 italic mt-4">
        “When you wear Julethi, you wear Assam’s soul.”
      </p>
    </motion.div>
  </div>
</section>




    </div>
  );
};

export default About;
