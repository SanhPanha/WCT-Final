"use client";

import { CartProductType } from "@/lib/constans";
import { Card } from "flowbite-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/feature/addToCart/cartSlice";
import { addFavorite } from "@/redux/feature/addToFavorite/favoriteSlice";


export default function CardComponent(props: CartProductType) {
  const dispatch = useAppDispatch();
  const placeHolderImage =
    "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1";

  return (
    <Card
      className="container mx-auto h-[500px] w-[320px] cursor-pointer rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      renderImage={() => (
        <img
          className="w-full h-[220px] rounded-t-lg object-cover"
          src={props?.image || placeHolderImage}
          alt={props.name}
          onClick={props.onClick}
        />
      )}
    >
      <div className="flex flex-col gap-6 p-5">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
          {props?.name || "Product Name"}
        </h5>

        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
          {props?.desc || "Product Description"}
        </p>

        <span className="text-xl font-bold text-gray-900 dark:text-white">
          ${props.price?.toFixed(2)}
        </span>

        <div className="flex items-center justify-between">
           <div className="flex gap-2">
            <button
              className="w-full rounded-md  bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                dispatch(
                  addFavorite({
                    id: props.id,
                    name: props.name,
                    image: props.image,
                    price: props.price,
                    desc: props.desc,
                  })
                );
              }}
            >
              Favorite
            </button>
        </div>

          <div className="flex gap-2">
            <button
              className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: props.id,
                    name: props.name,
                    image: props.image,
                    price: props.price,
                    desc: props.desc,
                    quantity: props.quantity,
                  })
                );
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

       
      </div>
    </Card>
  );
}
