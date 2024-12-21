import React from 'react';

export default function FeatureProduct() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Header Section */}
        <div className="text-center" data-aos="zoom-in">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            The Fine Details
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the thoughtful design and meticulous craftsmanship that go into every one of our products. Built for durability, functionality, and style.
          </p>
        </div>

        {/* Product Details */}
        <div className="mt-20 grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16">
          {/* Left Image and Description */}
          <div className="flex flex-col items-center lg:items-start" data-aos="fade-right">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.acer.com/is/image/acer/predator-triton-17x-ptx17-71-with-fingerprint-perkey-backlit-on-wallpaper-black-01-2?$Line-Overview-XL$"
                alt="Drawstring top with elastic loop closure and textured interior padding."
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-6 text-base text-gray-600 text-center lg:text-left">
              The 20L model has enough space for 370 candy bars, 6 cylinders of chips, 1220 standard gumballs, or any
              combination of on-the-go treats that your heart desires. Yes, we did the math.
            </p>
          </div>

          {/* Right Image and Description */}
          <div className="flex flex-col items-center lg:items-start" data-aos="fade-left">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.acer.com/is/image/acer/acer-swift-14-ai-sf14-11-with-fingerprint-with-backlit-on-wp-copilot-steel-gray-01-1?$Line-Overview-XL$"
                alt="Front zipper pouch with included key ring."
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-6 text-base text-gray-600 text-center lg:text-left">
              Up your snack organization game with multiple compartment options. The quick-access stash pouch is ready
              for even the most unexpected snack attacks and sharing needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
