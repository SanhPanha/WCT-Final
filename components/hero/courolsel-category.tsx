"use client"
import { CatageoryType } from '@/lib/constans';
import { getDatabase, ref, get } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import app from '../../lib/firebase/firebaseConfiguration';

export default function CarouselComponent() {
  const [categories, setCategories] = useState<CatageoryType[]>([]);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, 'categories');
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val()) as CatageoryType[];
          setCategories(data);
        } else {
          console.error('No categories found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
            {categories.map((category) => (
              <div key={category.key} className="text-center">
                <img
                  className="max-h-12 w-full object-contain transition duration-300 hover:scale-105"
                  src={category.image || ""} // Dynamically map the image URL
                  alt={category.title} // Alt text from category name
                  width={158}
                  height={48}
                />
                <p className="mt-2 text-sm text-gray-700">{category.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
