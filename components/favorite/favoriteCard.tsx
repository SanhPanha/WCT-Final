'use client';

import{ useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/context';
import { getDatabase, onValue, ref, remove } from 'firebase/database';

export default function FavoriteView() {
  const router = useRouter();
  const { currentUser, userLoggedIn } = useAuth();
  const [favouriteItems, setFavouriteItems] = useState<any[]>([]);
 const [loading, setLoading] = useState<string | null>(null);


  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      const db = getDatabase();
      const cartRef = ref(db, `favorites/${currentUser.uid}`);

      // Listen for changes to the cart data in Firebase
      const unsubscribeCart = onValue(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }));

          setFavouriteItems(items);

          // Calculate total price
          const total = items.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          );
        } else {
          setFavouriteItems([]);
        
        }
      });

      return () => unsubscribeCart();
    }
  }, [userLoggedIn, currentUser]);

  const handleRemoveItem = async (itemId: string) => {
    setLoading(itemId);
    const db = getDatabase();
    const itemRef = ref(db, `favorites/${currentUser?.uid}/${itemId}`);

    try {
      await remove(itemRef);
    } catch (error) {
      console.error("Error removing item:", error);
      // Optionally show an error message to the user
    } finally {
      setLoading(null);
    }
  };

  const placeHolderImage =
    'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1';

  return (
    <div className="bg-gray-50 h-full">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Your Favorite Products
        </h1>

        {favouriteItems.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">
              You have no favorite items yet.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favouriteItems.map((favorite) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/product/${favorite.slug}`)}}
                key={favorite.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                <img
                  className="w-full h-[200px] rounded-t-lg object-cover"
                  src={favorite.image || placeHolderImage}
                  alt={favorite.name || 'Product Name'}
                />
                <div className="p-5 flex flex-col justify-between h-[280px]">
                  <div>
                    <h5 className="text-lg font-semibold tracking-tight text-gray-800 truncate">
                      {favorite.name || 'Product Name'}
                    </h5>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {favorite.desc || 'Product Description'}
                    </p>
                    <span className="block mt-3 text-lg font-bold text-gray-900">
                      ${favorite.price?.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => {handleRemoveItem(favorite.id)}}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
