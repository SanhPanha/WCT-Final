  'use client';
  import { CartProductType } from "@/lib/constans";
  import { useDispatch } from "react-redux";
  import { addToCart } from "@/redux/feature/addToCart/cartSlice";
  import { addFavorite } from "@/redux/feature/addToFavorite/favoriteSlice";
import { useAuth } from "@/lib/context/context";
import { useAppDispatch } from "@/redux/hooks";

  export default function CardDetail(props: CartProductType) {
    
    const { currentUser } = useAuth(); // Get the current user
    const dispatch = useAppDispatch();
    const handleAddToCart = () => {
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
      <main className="flex items-center justify-center min-h-[60vh] p-9">
        <div className="flex gap-10 items-center bg-white p-20 shadow-xl rounded-lg">
          {/* Product Image */}
          <div className="w-full h-full">
            <img
              src={props?.image}
              alt={props.name || "Product"}
              className="rounded-lg object-cover max-w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">{props.name}</h1>

            <div className="flex gap-6">
              <p className="text-xl font-semibold text-gray-800">Price :</p>
              <p className="text-xl font-semibold text-orange-500">$ {props.price}</p>
            </div>

            {/* description */}
            <p className="text-xl font-normal leading-8 text-gray-800">{props.desc}</p>

            <div className="flex items-center justify-between gap-6">
            <div className="flex flex-grow gap-2">
              <button
                className="w-full rounded-md flex-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddToCart}
              >
                Favorite
              </button>
          </div>

            <div className="flex flex-grow gap-2">
              <button
                className="rounded-md flex-1 bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                onClick={handleAddToFaourite}
              >
                Add to Cart
              </button>
            </div>
          </div>
          </div>
        </div>
      </main>
    );
  }
