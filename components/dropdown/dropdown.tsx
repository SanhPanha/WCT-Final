'use client'
import React, { useEffect, useState } from 'react'
import { ImageType } from '@/lib/constans'
import { useGetImagesQuery , useGetIconsQuery } from '@/redux/service/images'
import Product from '@/app/(myshop)/add/page';
import { useAppDispatch } from '@/redux/hooks';
export default function Dropdown() {
   
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const[props,setProps]=useState([])
    const[icons,setIcons]=useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const{data:data,isLoading:isLoading,isFetching:isFethching}=useGetImagesQuery({page:page,pageSize:pageSize}) 

  ///fetch icons
     
    const{data:data1,isLoading:isLoading1,isFetching:isFetching1}=useGetIconsQuery({page:page,pageSize:pageSize})
    useEffect(()=>{
        if(!isLoading1 && data1){
            setIcons(data1.results)
        }
    },[data1,isLoading1])   
     


    const totalPages = Math.ceil(data?.total/ pageSize) || 4;
   
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    useEffect(()=>{
        if(!isLoading && data){
            setProps(data.results)
        }
    },[data,isLoading])


const handleSelect = (index: number, props: any, icons: any, type: string) => {
    if (type === 'selectImage') {
        setSelectedPhoto(props[index].image);
     
   
    } else if (type === 'data1Icon') {
        setSelectedIcon(icons[index].image);
      
     
    }
};

  


   const nextPage = () => {
    setPage(page + 1);
};

const prevPage = () => {
    if (page > 1) {
        setPage(page - 1);
    }
};

const renderPageNumbers = (data:any) => {
    const pagesToShow = [];
    const totalPageCount = Math.ceil(data?.total / pageSize);
    const maxPageNumberToShow = 5; 

    let startPage = Math.max(1, page - Math.floor(maxPageNumberToShow / 2));
    let endPage = Math.min(totalPageCount, startPage + maxPageNumberToShow - 1);

    if (endPage - startPage < maxPageNumberToShow - 1) {
        startPage = Math.max(1, endPage - maxPageNumberToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(
            <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 mx-1 rounded-lg ${i === page ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
                {i}
            </button>
        );
    }

    return pagesToShow;
};


  return (
    <main className="w-[25%] container mx-auto ">
  <details className="group [&_summary::-webkit-details-marker]:hidden mx-auto" open>
    <summary
      className="flex  mx-auto cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">Select Images</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
     {props.map((image:ImageType,index)=>
                <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-50">
                    <img src={image.image} alt={image.name} className="w-20 h-20 object-cover rounded-lg" onClick={()=>handleSelect(index,props,data1,'selectImage')}/>
                    <h3 className="text-gray-900">{image.name}</h3>
                </div>
        
     )}

<div className="flex justify-center p-4">
                    <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 mx-1 rounded-lg">Previous</button>
                    {renderPageNumbers(data)}
                    <button onClick={nextPage} disabled={isLoading || isFethching} className="px-4 py-2 mx-1 rounded-lg">Next</button>
                </div>
  </details>
  {selectedPhoto && <img src={selectedPhoto} alt="" />}
   <div className='mt-4'></div>
  <details className="group [&_summary::-webkit-details-marker]:hidden mx-auto" open>
    <summary
      className="flex  mx-auto cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">Select Icons</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    {icons.map((image:ImageType,index)=>
                    <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-50">
                        <img src={image.image} alt={image.name} className="w-20 h-20 object-cover rounded-lg" onClick={()=>handleSelect(index,props,icons,'data1Icon')}/>
                        <h3 className="text-gray-900">{image.name}</h3>
                    </div>
            
        )}
        <div className="flex justify-center p-4">
                    <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 mx-1 rounded-lg">Previous</button>
                    {renderPageNumbers(data1)}
                    <button onClick={nextPage} disabled={isLoading1 || isFetching1} className="px-4 py-2 mx-1 rounded-lg">Next</button>
                </div>
        </details>
        {selectedIcon && <img src={selectedIcon} alt="" />}
</main>
  )
}
