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
      desc: "Share your vision and story. Our designer connects with you personally to understand your preferences, colors, and inspirations.",
    },
    {
      title: "Design & Concept",
      icon: <Scissors className="w-6 h-6 text-crimson-800" />,
      desc: "We create design sketches and curate color palettes that capture your essence — traditional, modern, or fusion.",
    },
    {
      title: "Fabric Selection",
      icon: <Ruler className="w-6 h-6 text-crimson-800" />,
      desc: "Choose from Assamese Silk, Eri, or Tussar — each weave handpicked to complement your comfort and occasion.",
    },
    {
      title: "Handloom Weaving",
      icon: <Package className="w-6 h-6 text-crimson-800" />,
      desc: "Our master weavers bring your design to life — thread by thread — combining artistry and heritage.",
    },
    {
      title: "Finishing Touches",
      icon: <Star className="w-6 h-6 text-crimson-800" />,
      desc: "Embroidery, detailing, and hand-finishing give your piece the signature finesse Julethi is known for.",
    },
    {
      title: "Delivery & Joy",
      icon: <Truck className="w-6 h-6 text-crimson-800" />,
      desc: "Your bespoke attire arrives beautifully packed and ready to wear, gift, or treasure forever.",
    },
  ];

  return (
    <div className="pt-14 min-h-screen bg-white text-gray-800">
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <a
          href="https://wa.me/+917002772312?text=Hi%20Julethi!%20I’d%20like%20to%20customize%20my%20bridal%20attire.%20Please%20share%20the%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-5 py-3 text-sm shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <img src="/images/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
          <span>Consult Now</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="text-center py-10 sm:py-12 bg-gradient-to-r from-crimson-900 to-crimson-700 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">
          Create Your Own Attire
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-amber-100 px-4">
          Every masterpiece begins with a conversation. Let's craft something
          timeless and personal- just for you.
        </p>
      </section>

      {/* Steps Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-center text-crimson-900 mb-8 sm:mb-10">
          Your Custom Journey
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg p-4 sm:p-5 shadow-sm border border-rose-100"
            >
              <div className="bg-amber-100 p-2 rounded-full shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-crimson-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-12 text-center border-t border-rose-100">
        <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-crimson-800 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-crimson-900 mb-2 sm:mb-3">
          Ready to Begin?
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mb-5 sm:mb-6 px-4">
          Start your bespoke journey with a quick consultation on WhatsApp.
        </p>
        <a
          href="https://wa.me/+917002772312?text=Hi%20Julethi!%20I’d%20like%20to%20customize%20my%20bridal%20attire.%20Please%20share%20the%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-crimson-800 to-crimson-700 hover:from-crimson-900 hover:to-crimson-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
};

export default CustomOrder;
