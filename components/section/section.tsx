import Image from 'next/image';
import React from 'react';

export default function SectionComponent() {
  return (
    <section className='bg-orange-50'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-[-40px]">
        <header className="text-center" data-aos="zoom-in-up">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Explore the Latest Tech</h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Discover cutting-edge laptops, desktops, and more. Elevate your productivity and gaming experience with our premium collection.
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li>
            <a href="#" className="group relative block" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <Image
                width={774}
                height={774}
                src="https://images.acer.com/is/image/acer/acer-swift-14-ai-sf14-11-with-fingerprint-with-backlit-on-wp-copilot-steel-gray-01-1?$Line-Overview-XL$"
                alt="High-Performance Laptop"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Swift AI Laptop</h3>
                <span
                  className="mt-1.5 inline-block bg-yellow-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Explore Now
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group relative block" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <Image
                width={774}
                height={774}
                src="https://images.acer.com/is/image/acer/Aspire-Vero-16?$Line-Overview-L$"
                alt="Eco-Friendly Laptop"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Eco-Friendly Laptops</h3>
                <span
                  className="mt-1.5 inline-block bg-yellow-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Buy Now
                </span>
              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="#" className="group relative block" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <Image
                width={774}
                height={774}
                src="https://images.acer.com/is/image/acer/Aspire-Vero-16?$Line-Overview-L$"
                alt="Sustainable PC"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Sustainable PCs</h3>
                <span
                  className="mt-1.5 inline-block bg-yellow-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Learn More
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
