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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-teal-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-teal-800 mb-6 sm:mb-8">
              The Julethi Legacy
            </h2>
            <div className="prose prose-sm sm:prose-lg text-gray-600 leading-relaxed">
              <p className="mb-4 sm:mb-6">
                Founded with the vision of bringing the exquisite craftsmanship
                of Assamese textiles to the modern world, we have been dedicated
                to creating pieces that honor our past while embracing
                contemporary aesthetics.
              </p>
             
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full"
          >
            <img
              src="/images/j4.jpeg"
              alt="Traditional weaving"
              className="rounded-2xl shadow-2xl w-full sm:h-[400px] md:h-[500px] object-cover object-center"
            />
            <motion.div
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-10 bg-teal-600 text-white p-4 sm:p-5 rounded-2xl shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p className="text-xl sm:text-2xl font-bold">2020</p>
              <p className="text-xs sm:text-sm">Founded with passion</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ---------------- Designer Profile ---------------- */}
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Designer Image */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/designer.png"
              alt="Designer Zinku"
              className="rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg h-[350px] sm:h-[450px] md:h-[500px] object-cover mx-auto hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Designer Text */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-teal-800 mb-6 sm:mb-8">
              Meet Zinku
              <span className="block text-lg sm:text-xl text-teal-600 font-normal mt-1 sm:mt-2">
                Creative Director & Founder
              </span>
            </h2>
            <div className="prose prose-sm sm:prose-lg text-gray-600 leading-relaxed">
              <p className="mb-4 sm:mb-6">
                Experienced in textile design and a
                deep-rooted passion for Assamese culture, Zinku has dedicated
                herself to preserving and promoting the rich weaving
                traditions of Assam.
              </p>
            
            </div>
          </motion.div>
        </div>
      </div>
    </section>

     {/* ---------------- Journey Roadmap Section ---------------- */}
<section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-teal-50 overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-teal-800 text-center mb-12 sm:mb-16">
      The Journey
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
          className={`relative flex w-full items-center justify-between mb-24 ${
            idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: idx * 0.2 }}
        >
          {/* Dot */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-800 rounded-full shadow-lg border-4 border-white z-10"></div>

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
        <div className="w-4 h-4 bg-teal-800 rounded-full shadow-lg border-2 border-white mt-1 mr-3"></div>
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



     {/* ---------------- Team Section ---------------- */}
<section className="py-16 sm:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
      Meet Our Team
    </h2>

    {/* Image below heading */}
    <img
      src="/images/team.jpeg"
      alt="Our Team Banner"
      className="mx-auto mb-8 sm:mb-12 w-5/6 sm:w-3/4 max-w-xl rounded-lg shadow-lg"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {team.map((member, idx) => (
        <motion.div
          key={idx}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-500"
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-2 sm:mb-3 border-2 border-teal-200"
          />
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">{member.name}</h3>
          <p className="text-gray-600 text-xs sm:text-xs">{member.role}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default About;
