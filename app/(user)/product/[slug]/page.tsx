import React from 'react';
import CardDetail from '@/components/product/productDetail';
import { getDatabase, ref, get } from 'firebase/database';
import app from '@/lib/firebase/firebaseConfiguration';
import { Metadata } from 'next';
import { ProductType } from '@/lib/constans';

// Fetch product details based on the slug
const fetchProductBySlug = async (slug: string): Promise<ProductType | null> => {
  const db = getDatabase(app);
  const dbRef = ref(db, 'products');

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const products: Record<string, ProductType> = snapshot.val();

      // Find the product by slug
      const foundProductEntry = Object.entries(products).find(
        ([_, value]) => value.slug === slug
      );

      if (foundProductEntry) {
        const [key, value] = foundProductEntry;
        return { ...value, key: key }; // Include the Firebase key
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Metadata generation for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);

  if (product) {
    return {
      title: product.name,
      description: product.desc || 'Explore our product in detail.',
      openGraph: {
        images: [product.image],
      },
    };
  }

  return {
    title: 'Product Not Found',
    description: 'The requested product could not be found.',
  };
}

// Page component for product detail
const ProductDetail = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    return <p>Product not found. Redirecting...</p>;
  }

  return (
    <div>
      <CardDetail
        id={product.slug}
        quantity={product.quantity}
        name={product.name}
        desc={product.desc}
        image={product.image}
        price={product.price}
      />
    </div>
  );
};

export default ProductDetail;
