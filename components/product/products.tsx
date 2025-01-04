"use client";

import React, { useEffect, useState } from "react";
import { CatageoryType, ProductType } from "@/lib/constans";
import { useRouter } from "next/navigation";
import CardComponent from "./cardcomponent";
import app from "../../lib/firebase/firebaseConfiguration";
import { getDatabase, ref, get } from "firebase/database";
import { Select } from "flowbite-react";

// Custom hook to fetch data
function useFetch<T>(path: string): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, path);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const fetchedData = Object.values(snapshot.val()) as T[];
          setData(fetchedData);
        } else {
          setError(`No data found for ${path}`);
        }
      } catch (err) {
        setError(`Failed to fetch data: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path]);

  return { data, loading, error };
}

export default function Products() {
  const router = useRouter();

  // Fetch data using custom hook
  const { data: products, loading: productsLoading, error: productsError } = useFetch<ProductType>("products");
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch<CatageoryType>("categories");

  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = products.filter((product) => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilter = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredProducts(filtered);
  }, 300);

  if (productsError) {
    return <p className="text-center text-red-500">{productsError}</p>;
  }

  if (categoriesError) {
    console.error(categoriesError);
  }

  return (
    <main className="flex flex-col gap-6 container mx-auto px-4 py-9">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilter}
          />
        </div>

        <Select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="w-full sm:w-48 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <p className="text-gray-500 text-center col-span-full">No products found.</p>
        )}
      </div>
    </main>
  );
}
