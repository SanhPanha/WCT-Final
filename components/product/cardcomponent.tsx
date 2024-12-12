"use client";
import { CartProductType, ProductRespone, ProductType } from "@/lib/constans";
import { Card } from "flowbite-react";
import { useAppDispatch } from "@/redux/hooks";
import {increment,decrement, incrementByAmount} from "@/redux/feature/counter/couterSlice";
import { addToCart } from "@/redux/feature/addToCart/cartSlice";
export default function CardComponent(props:CartProductType) {
 const disPatch = useAppDispatch();
 const placeHolderImage="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
  return (
    <Card
     
      className="container mx-auto h-[400px] w-[300px] cursor-pointer"
      renderImage={()=>(<img className='w-[310px] h-[400px] overflow-hidden object-fit' src={props?.image||placeHolderImage} alt={props.name} onClick={props.onClick} />
      )}  
    >
      <h5 className="mt-[-40px] text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props?.name||"Product Name"}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
        {props?.desc||"Product Description"}
      </p>
    
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white">${props.price}</span>
        <button
        
          className="rounded-lg bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          onClick={()=>{
          disPatch(addToCart({
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            desc: props.desc,
            quantity: props.quantity,
          }));
          }}
        >
          Add to cart 
        </button>
      </div>
    </Card>
  );
}