'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FavoriteType } from '@/lib/constans';
import { removeFavorite, selectFavorites } from '@/redux/feature/addToFavorite/favoriteSlice';
import { useRouter } from 'next/navigation';

export default function FavoriteView() {
    const router = useRouter();
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const placeHolderImage =
    'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1';

  return (
    <div className="bg-gray-50 h-full">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Your Favorite Products
        </h1>

        {favorites.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">
              You have no favorite items yet.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((favorite: FavoriteType, index) => (
              <div
                onClick={() => router.push(`/product/${favorite.id}`)}
                key={index}
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
                    onClick={() => dispatch(removeFavorite(favorite.id))}
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
