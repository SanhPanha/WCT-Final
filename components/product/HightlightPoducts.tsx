"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/lib/constans";
import { useRouter } from "next/navigation";
import CardComponent from "./cardcomponent";
import app from "../../lib/firebase/firebaseConfiguration";
import { getDatabase, ref, get } from "firebase/database";

export default function HightlightProducts() {
  const router = useRouter();
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
          const highlightedProducts = data.filter(
            (product) => product.isHighLight === true
          ); // Only keep highlighted products
          setFilteredProducts(highlightedProducts); // Initialize filtered products
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <main className="flex flex-col gap-4 container mx-auto sm:px-6 lg:px-8">

    <h2 className="text-xl font-bold text-gray-800">Hightlight Products</h2>
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
              slug={product.slug}
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
