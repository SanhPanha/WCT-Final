'use client';
export default function FooterComponent() {
  return (
    <footer className="bg-white text-gray-800 py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo Section */}
          <div className="text-center lg:text-left">
            <img
              src="https://img.favpng.com/6/5/12/ecommerce-logo-png-favpng-c9XwFQHwsmZeVNHU6BRWQgabB.jpg"
              alt="CSTAD Logo"
              className="w-28 h-28 mx-auto lg:mx-0 rounded-full border-4 border-orange-500"
            />
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Your one-stop shop for the latest in computers, accessories, and tech services.
            </p>
            {/* Social Media Links */}
            <ul className="mt-6 flex justify-center gap-4 sm:justify-start">
              {['facebook', 'instagram', 'twitter', 'github', 'dribbble'].map((platform) => (
                <li key={platform}>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-orange-500 hover:text-orange-400 transition"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Replace this SVG with appropriate platform icons */}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <p className="text-lg font-semibold text-orange-500">About Us</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-400">Company History</a></li>
              <li><a href="#" className="hover:text-orange-400">Meet the Team</a></li>
              <li><a href="#" className="hover:text-orange-400">Employee Handbook</a></li>
              <li><a href="#" className="hover:text-orange-400">Careers</a></li>
            </ul>
          </div>

          {/* Our Services Section */}
          <div>
            <p className="text-lg font-semibold text-orange-500">Our Services</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-400">Web Development</a></li>
              <li><a href="#" className="hover:text-orange-400">Web Design</a></li>
              <li><a href="#" className="hover:text-orange-400">Marketing</a></li>
              <li><a href="#" className="hover:text-orange-400">Google Ads</a></li>
            </ul>
          </div>

          {/* Helpful Links Section */}
          <div>
            <p className="text-lg font-semibold text-orange-500">Helpful Links</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-400">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-400">Support</a></li>
              <li>
                <a href="#" className="group flex items-center gap-2 text-orange-500 hover:text-orange-400">
                  Live Chat
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <p className="text-lg font-semibold text-orange-500">Contact Us</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:john@doe.com" className="flex items-center gap-2 hover:text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                  </svg>
                  john@doe.com
                </a>
              </li>
              <li>
                <a href="tel:+0123456789" className="flex items-center gap-2 hover:text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +0123456789
                </a>
              </li>
              <li>
                <a href="https://maps.google.com" className="flex items-center gap-2 hover:text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Tech Street, Phnom Penh, Cambodia
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} | All rights reserved.
        </div>
      </div>
    </footer>
  );
}
