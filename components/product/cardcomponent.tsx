"use client";

import { CartProductType } from "@/lib/constans";
import { Card } from "flowbite-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/feature/addToCart/cartSlice";
import { addFavorite } from "@/redux/feature/addToFavorite/favoriteSlice";
import { useAuth } from "@/lib/context/context";
import { useRouter } from "next/navigation";

export default function CardComponent(props: CartProductType) {
  const dispatch = useAppDispatch();
  const { currentUser, userLoggedIn } = useAuth(); // Get the current user
  const router = useRouter()
  const placeHolderImage =
    "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1";

    console.log("userLoggedIn", userLoggedIn)

  const handleAddToCart = () => {

    if (userLoggedIn === false) {
      router.push("/login"); // Redirect to login if the user is not logged in
      return;
    }

    if (currentUser) {
      dispatch(
        addToCart({
          uid: currentUser.uid, // Pass the current user's UID to the action
          product: {
            slug: props.slug,
            name: props.name,
            image: props.image,
            price: props.price,
            desc: props.desc,
            quantity: props.quantity,
          },
        })
      );
    }
  };

  const handleAddToFaourite = () => {
    if (userLoggedIn === false) {
      router.push("/login"); // Redirect to login if the user is not logged in
      return;
    }
    if (currentUser) {
      dispatch(
        addFavorite({
          uid: currentUser.uid, // Pass the current user's UID to the action
          product: {
            slug: props.slug,
            name: props.name,
            image: props.image,
            price: props.price,
            desc: props.desc,
          },
        })
      );
    }
  };

  return (
    <Card
      className="flex flex-col h-full w-full max-w-sm mx-auto cursor-pointer rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 sm:max-w-md lg:max-w-lg"
      renderImage={() => (
        <img
          className="w-full h-48 rounded-t-lg object-cover sm:h-56 md:h-64"
          src={props?.image || placeHolderImage}
          alt={props.name}
          onClick={props.onClick}
        />
      )}
    >
      <div className="flex flex-col gap-4 p-4 md:p-5">
        <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white truncate md:text-lg">
          {props?.name || "Product Name"}
        </h5>

        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2 md:text-base">
          {props?.desc || "Product Description"}
        </p>

        <span className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
          ${props.price?.toFixed(2)}
        </span>

        <div className="flex items-center justify-between mt-2">
          <button
            className="flex-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:px-4 md:py-2"
            onClick={handleAddToFaourite}
          >
            Favorite
          </button>

          <button
            className="ml-2 flex-1 rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 md:px-4 md:py-2"
            onClick={handleAddToCart} // Use the function for adding to the cart
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  );
}
