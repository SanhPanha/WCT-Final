'use client'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/lib/constans'
import { useRouter } from 'next/navigation'
import CardComponent from './cardcomponent'
import { useGetAllProductsQuery } from '@/redux/service/product'
import products from '@/mock/products.json'

export default function Products() {
//   const[products,setProduct]=useState<ProductType[]>([])
  const[currentPage,setCurrentPage] = useState(1)
  const router = useRouter()
  const[page, setPage] = useState(1);
  const[pageSize, setPageSize] = useState(8);

//   const nextPage = () => {
//     setPage(page + 1);
// };

// const prevPage = () => {
//     if (page > 1) {
//         setPage(page - 1);
//     }
// };

    // const{data,isLoading} = useGetAllProductsQuery({page:page,pageSize:pageSize})
    // console.log('this is data',data)	
    
    // useEffect(()=>{
    //   if(data && !isLoading){
    //     setProduct(data.results)
    //   }
    // },[data,isLoading])

  return (
    <main>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-[24px] container mx-auto' data-aos="fade-up"
                   data-aos-duration="1000">
                {products.map((pro, key) => (
                    <CardComponent
                    
                        quantity={pro.quantity}
                        key={key}
                        id={pro.id}
                        onClick={() => router.push(`/service/${pro.id}`)}
                        name={pro.name}
                        price={pro.price}
                        image={pro.image}
                        desc={pro.desc}
                    />
                ))}
            </div>
            
            {/* <div className="flex justify-center p-4 mt-[50px]">
                    <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 mx-1 rounded-lg">Previous</button>
                    {renderPageNumbers(data)}
                    <button onClick={nextPage} disabled={isLoading } className="px-4 py-2 mx-1 rounded-lg">Next</button>
                </div>
             */}
    </main>
  )
}
