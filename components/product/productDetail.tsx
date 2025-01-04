  'use client';
  import { CartProductType } from "@/lib/constans";
  import { useDispatch } from "react-redux";
  import { addToCart } from "@/redux/feature/addToCart/cartSlice";
  import { addFavorite } from "@/redux/feature/addToFavorite/favoriteSlice";

  export default function CardDetail(pros: CartProductType) {
    const dispatch = useDispatch();
    
    return (
      <main className="flex items-center justify-center min-h-[60vh] p-9">
        <div className="flex gap-10 items-center bg-white p-20 shadow-xl rounded-lg">
          {/* Product Image */}
          <div className="w-full h-full">
            <img
              src={pros?.image}
              alt={pros.name || "Product"}
              className="rounded-lg object-cover max-w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">{pros.name}</h1>

            <div className="flex gap-6">
              <p className="text-xl font-semibold text-gray-800">Price :</p>
              <p className="text-xl font-semibold text-orange-500">$ {pros.price}</p>
            </div>

            {/* description */}
            <p className="text-xl font-normal leading-8 text-gray-800">{pros.desc}</p>

            <div className="flex items-center justify-between gap-6">
            <div className="flex flex-grow gap-2">
              <button
                className="w-full rounded-md flex-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  dispatch(
                    addFavorite({
                      id: pros.id,
                      name: pros.name,
                      image: pros.image,
                      price: pros.price,
                      desc: pros.desc,
                    })
                  );
                }}
              >
                Favorite
              </button>
          </div>

            <div className="flex flex-grow gap-2">
              <button
                className="rounded-md flex-1 bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: pros.id,
                      name: pros.name,
                      image: pros.image,
                      price: pros.price,
                      desc: pros.desc,
                      quantity: pros.quantity,
                    })
                  );
                }}
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
