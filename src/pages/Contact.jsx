import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Boutique Address',
      details: ['House no 10, 2, Karbi Namghar Path', 'SBI Colony, Bormotoria', 'Guwahati, Assam 781036']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 7002772312', '+91 9101197172']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@julethi.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Sat: 10:00 AM - 9:00 PM', 'Sunday: By Appointment']
    }
  ];

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-crimson-900 to-crimson-700 text-white py-12">
        <div className="absolute inset-0">
          <img
            src="/images/j1.jpeg"
            alt="Contact hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-crimson-100 max-w-2xl mx-auto">
            Visit our atelier or reach out to us for personalized styling consultation.
            We serve really awesome coffee.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Visit Our Boutique
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-crimson-100 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-crimson-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/julethi_by_zinku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-crimson-100 p-3 rounded-lg text-crimson-600 hover:bg-crimson-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/zinkumk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-crimson-100 p-3 rounded-lg text-crimson-600 hover:bg-crimson-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Section replacing form */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="bg-gradient-to-r from-crimson-800 to-crimson-600 rounded-2xl p-12 text-center text-white shadow-lg">
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Book a Personal Consultation
                </h2>
                <p className="text-crimson-100 text-lg mb-8">
                  Experience personalized service with our design experts. Schedule a one-on-one consultation
                  to create your perfect ensemble.
                </p>
                <button
                  className="bg-yellow-400 text-crimson-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                  onClick={() => {
                    const phone = "917002772312";
                    const message = encodeURIComponent(
                      "Hey, I am interested in booking an appointment for a personal consultation. Please share the available slots."
                    );
                    const url = `https://wa.me/${phone}?text=${message}`;
                    window.open(url, "_blank");
                  }}
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique & Factory Map Section (Compact + Visual) */}
<section className="py-10 bg-gradient-to-br from-rose-50 via-white to-rose-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
        Our Locations
      </h2>
      <p className="text-gray-600 text-sm">
        Visit our boutique or explore our production unit — where artistry meets craftsmanship.
      </p>
    </div>

    {/* Two Columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Boutique */}
      <div className="space-y-3 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243 5.657-5.657z" />
          </svg>
          <h3 className="text-lg font-serif font-semibold text-gray-800">Boutique</h3>
        </div>

        <div className="rounded-2xl overflow-hidden h-60 shadow-md border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.414019810468!2d91.8094467!3d26.150642599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59bea69bb819%3A0xbba455d0bb27d7b4!2sJulethi!5e0!3m2!1sen!2sin!4v1760682410201!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="text-gray-600 text-xs">
          Located in the heart of Guwahati’s fashion district
        </p>
      </div>

      {/* Factory */}
      <div className="space-y-3 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-crimson-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v11a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
          </svg>
          <h3 className="text-lg font-serif font-semibold text-gray-800">Factory</h3>
        </div>

        <div className="rounded-2xl overflow-hidden h-60 shadow-md border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14330.918865269847!2d91.7047147009593!3d26.10774023417452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDA1JzU4LjQiTiA5McKwNDMnMTMuMiJF!5e0!3m2!1sen!2sin!4v1762778856334!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="text-gray-600 text-xs">
          Our hub of craftsmanship and production excellence
        </p>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Contact;
