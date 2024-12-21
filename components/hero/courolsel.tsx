import Image from 'next/image';
import React from 'react';

export default function CarouselComponent() {
  return (
    <main className="bg-gray-100 container mx-auto shadow-lg rounded-lg">
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the World’s Leading Tech Brands
          </h2>
          <div
            className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5"
            data-aos="fade-right"
          >
            <Image
              className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
              src="https://www.asus.com/media/Odin/images/header/ROG_hover.svg"
              alt="ASUS - Innovative Technology"
              width={158}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReDeQ5pUa65txf1jrSbmhTkz1rGpWDSWuwyX-D0peF65G_FJnPfMtwblDRD7RnMUhT7sZiv1wj3RiLMkRrDy1AQDlhaF8mMLVlss_MZLbS"
              alt="HP - Reliable Computing"
              width={158}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
              src="https://p3-ofp.static.pub/fes/cms/2023/03/22/8hjmcte754uauw07ypikjkjtx0m5ib450914.svg"
              alt="Lenovo - Smart Solutions"
              width={158}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
              src="https://storage-asset.msi.com/frontend/imgs/logo.png"
              alt="MSI - Gaming Laptops"
              width={158}
              height={48}
            />
            <Image
              className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
              src="https://images.acer.com/is/content/acer/acer-4"
              alt="Acer - Trusted PCs"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
