import CardDetail from '@/components/product/productDetail'
import { ProductType } from '@/lib/constans'
import { Metadata } from 'next'
import React from 'react'

// Fetch product details based on slug
const getProduct = async (slug: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}/products/${slug}`)
  const response = await data.json()
  return response;
}

// Metadata generation for the page
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}/api/products/${slug}/`)
    .then((res) => res.json())
  return {
    title: product.name,
    description: product.desc,
    openGraph: {
      images: [product.image],
    },
  }
}

// Page component for product detail
const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const data = await getProduct(params.slug)

  return (
    <div>
      <CardDetail
        id={data.id}
        quantity={data.quantity}
        name={data.name}
        desc={data.desc}
        image={data.image}
        price={data.price}
      />
    </div>
  )
}

export default ProductDetail
