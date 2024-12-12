
import CardDetail from '@/components/product/productDetail'
import { ProductDetailType } from '@/lib/constans'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
const getProduct=async(id:number)=>{
    const data=await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${id}`)
    const respone=await data.json()
    return respone;
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const id = params.id
    const product = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${id}/`).then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: product.name,
      description:product.desc,
      openGraph: {
        images: [product.image, ...previousImages],
      },
    }
  }
export default async function ProductDetail(props:ProductDetailType) {
    const data= await getProduct(props.params.id)
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
