"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/lib/constans";
import { useRouter } from "next/navigation";
import CardComponent from "./cardcomponent";
import app from "../../lib/firebase/firebaseConfiguration";
import { getDatabase, ref, get } from "firebase/database";

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "products");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val()) as ProductType[];
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products by search term
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredProducts(filtered);
  };

  return (
    <main className="container mx-auto sm:px-6 lg:px-8 py-9">
      {/* Search Input */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            onChange={handleFilter}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3.5 right-4 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.25 10.75a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
            />
          </svg>
        </div>
      </div>

      {/* Product Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CardComponent
              key={product.slug}
              quantity={product.quantity}
              id={product.slug}
              onClick={() => router.push(`/product/${product.slug}`)}
              name={product.name}
              price={product.price}
              image={product.image}
              desc={product.desc}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found.
          </p>
        )}
      </div>
    </main>
  );
}
