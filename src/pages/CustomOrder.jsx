import { motion } from "framer-motion";
import {
  Sparkles,
  Scissors,
  Ruler,
  Package,
  Star,
  Truck,
  Heart,
} from "lucide-react";

const CustomOrder = () => {
  const steps = [
    {
      title: "Consultation",
      icon: <Sparkles className="w-6 h-6 text-crimson-800" />,
      desc: "Share your vision, story, or occasion. Our designer connects with you personally to understand your preferences, colors, and inspirations.",
      img: "/images/custom-consultation.jpg",
    },
    {
      title: "Design & Concept",
      icon: <Scissors className="w-6 h-6 text-crimson-800" />,
      desc: "We create design sketches, select motifs, and curate color palettes that capture your essence — traditional, modern, or fusion.",
      img: "/images/custom-design.jpg",
    },
    {
      title: "Fabric Selection",
      icon: <Ruler className="w-6 h-6 text-crimson-800" />,
      desc: "From the looms of Assam — choose Assamese Silk, Eri, or Tussar. Every weave is hand-picked to complement your comfort and occasion.",
      img: "/images/custom-fabric.jpg",
    },
    {
      title: "Handloom Weaving",
      icon: <Package className="w-6 h-6 text-crimson-800" />,
      desc: "Our master weavers bring your design to life — thread by thread — combining artistry and heritage into a living masterpiece.",
      img: "/images/custom-weaving.jpg",
    },
    {
      title: "Finishing Touches",
      icon: <Star className="w-6 h-6 text-crimson-800" />,
      desc: "Embroidery, detailing, and hand-finishing give your piece the signature finesse and luxury Julethi is known for.",
      img: "/images/custom-finishing.jpg",
    },
    {
      title: "Delivery & Joy",
      icon: <Truck className="w-6 h-6 text-crimson-800" />,
      desc: "Your bespoke attire arrives beautifully packed with a Certificate of Authenticity — ready to wear, gift, or treasure forever.",
      img: "/images/custom-delivery.jpg",
    },
  ];

  return (
    <div className="pt-14 min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 relative">
      {/* Floating WhatsApp CTA */}
      <div className="fixed top-20 right-6 z-50">
        <a
          href="https://wa.me/918822084740?text=Hi%20Julethi!%20I%27d%20like%20to%20customize%20my%20attire."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-600 text-crimson-900 font-semibold rounded-full px-4 py-2 text-sm shadow-lg flex items-center space-x-2 transition transform hover:scale-105"
        >
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-4 h-4" />
          <span>Chat to Customise</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-crimson-900 to-crimson-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/custom-bg.jpg"
            alt="Custom order hero"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-wide"
          >
            The Art of Creating with You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
          >
            Every masterpiece begins with a conversation. From a single thread to
            your final drape — we weave your story into art.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-crimson-700 to-amber-500 mx-auto my-12 rounded-full"></div>

      {/* Journey Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold text-center text-crimson-900 mb-12"
        >
          Your Custom Journey
        </motion.h2>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="lg:w-1/2">
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-2xl shadow-md w-full h-72 object-cover border border-amber-100"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-amber-100 rounded-full p-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-crimson-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-rose-50 border-t border-crimson-100 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <Heart className="w-8 h-8 text-crimson-800 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-crimson-900 mb-6">
            Every Creation is a Collaboration
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10">
            From the first sketch to the final weave, you are part of the
            process. Our artisans, designers, and stylists ensure your attire
            mirrors your identity — rooted in tradition, yet timelessly elegant.
          </p>
          <img
            src="/images/custom-collab.jpg"
            alt="Artisan collaboration"
            className="rounded-2xl shadow-md mx-auto w-full max-w-4xl object-cover"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center bg-gradient-to-r from-crimson-900 to-crimson-700 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Begin Your Creation?
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            Let's turn your vision into fabric — woven with meaning, emotion, and
            heritage.
          </p>
          <a
            href="https://wa.me/918822084740?text=Hi%20Julethi!%20I%27d%20like%20to%20customize%20my%20attire."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-amber-500 hover:bg-amber-600 text-crimson-900 font-semibold text-base px-8 py-4 rounded-xl shadow-md transition transform hover:scale-105">
              Customise Your Attire Now
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CustomOrder;
