import { Heart, Users, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description: 'Every piece is created with love and dedication to preserve our cultural heritage'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'We work closely with local artisans to support traditional weaving communities'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Uncompromising standards ensure each garment meets our luxury quality benchmarks'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'Bringing Assamese culture to the world while staying rooted in tradition'
    }
  ];

  const roadmap = [
    {
      title: 'Commitment to Quality',
      description: 'Every thread and pattern is crafted to uphold the highest standards of authenticity.',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
    },
    {
      title: 'Innovative Designs',
      description: 'Traditional weaving meets modern aesthetics in our exclusive collections.',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    },
    {
      title: 'Artisan Empowerment',
      description: 'We collaborate closely with artisans, preserving skills and providing fair opportunities.',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    },
    {
      title: 'Global Recognition',
      description: 'Our pieces have reached fashion lovers worldwide, celebrating Assamese heritage globally.',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg'
    }
  ];

  const team = [
    { name: 'Zinku', role: 'Founder & Creative Director', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
    { name: 'Arup', role: 'Lead Artisan', image: 'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg' },
    { name: 'Mina', role: 'Design Assistant', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
    { name: 'Rohit', role: 'Operations Manager', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }
  ];

  return (
    <div className="pt-14">
      {/* Brand Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
                The Julethi Legacy
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  In the heart of Assam, where the Brahmaputra flows with stories of ancient kingdoms and rich traditions, 
                  Julethi was born from a dream to preserve and celebrate our cultural heritage through fashion.
                </p>
                <p className="mb-6">
                  Founded with the vision of bringing the exquisite craftsmanship of Assamese textiles to the modern world, 
                  we have been dedicated to creating pieces that honor our past while embracing contemporary aesthetics.
                </p>
                <p className="mb-6">
                  Every thread tells a story, every pattern carries the wisdom of generations, and every garment represents 
                  our commitment to keeping the traditions of Assam alive in the hearts of fashion-conscious individuals 
                  around the world.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
                alt="Traditional weaving"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-teal-600 text-white p-8 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">1974</p>
                <p className="text-sm">Founded with passion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designer Profile */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
                alt="Designer Zinku"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
                Meet Zinku
                <span className="block text-xl text-teal-600 font-normal mt-2">Creative Director & Founder</span>
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  With over three decades of experience in textile design and a deep-rooted passion for Assamese culture, 
                  Zinku has dedicated her life to preserving and promoting the rich weaving traditions of Assam.
                </p>
                <p className="mb-6">
                  Born into a family of traditional weavers, Zinku grew up surrounded by the rhythmic sounds of handlooms 
                  and the vibrant colors of silk threads. Her childhood was filled with stories of ancient techniques 
                  passed down through generations.
                </p>
                <p className="mb-6">
                  After pursuing formal training in fashion design, Zinku returned to her roots with a mission to create 
                  contemporary interpretations of traditional Assamese textiles. Her work has been recognized nationally 
                  and internationally for its authenticity and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Journey */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          {/* Timeline on left */}
          <div className="hidden lg:flex flex-col items-center mr-12 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-teal-300"></div>
            {roadmap.map((_, idx) => (
              <motion.div
                key={idx}
                className="relative w-4 h-4 bg-teal-600 rounded-full mb-20 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              />
            ))}
          </div>

          {/* Content blocks */}
          <div className="flex-1 space-y-20">
            {roadmap.map((item, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col lg:flex-row items-center lg:space-x-12 ${
                  idx % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="lg:w-1/2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
