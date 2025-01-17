'use client';

import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import { MenuList } from '@/components/navbar/menu';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/app/globals.css';
import { IoCart, IoHeart } from 'react-icons/io5';
import { useAuth } from '@/lib/context/context';
import { getDatabase, ref, onValue } from 'firebase/database';

type MenuItems = {
  title: string;
  path: string;
  active: boolean;
};

export default function NavbarComponent() {
  const [menu] = useState<MenuItems[]>(MenuList);
  const router = useRouter();
  const pathName = usePathname();
  const { currentUser, userLoggedIn, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);


  console.log("currentUser", currentUser);

  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      const db = getDatabase();
      const cartRef = ref(db, `carts/${currentUser.uid}`);
  
      // Listen for cart data changes
      const unsubscribeCart = onValue(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Count the number of unique products in the cart
          const totalUniqueItems = Object.keys(data).length;
  
          // Update cart count only if it has changed to prevent unnecessary re-renders
          setCartCount((prevCount) => {
            if (prevCount !== totalUniqueItems) {
              return totalUniqueItems;
            }
            return prevCount;
          });
        } else {
          setCartCount(0);
        }
      });
  
      // Optional: Fetch favorites count similarly
      const favoriteRef = ref(db, `favorites/${currentUser.uid}`);
      const unsubscribeFavorites = onValue(favoriteRef, (snapshot) => {
        if (snapshot.exists()) {
          setFavoriteCount(Object.keys(snapshot.val()).length);
        } else {
          setFavoriteCount(0);
        }
      });
  
      // Cleanup listeners on unmount
      return () => {
        unsubscribeCart();
        unsubscribeFavorites();
      };
    }
  }, [userLoggedIn, currentUser]);
  
  

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <Navbar className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-200" fluid>
      <NavbarBrand href="/" className="flex items-center gap-2">
        <img
          src="https://img.favpng.com/6/5/12/ecommerce-logo-png-favpng-c9XwFQHwsmZeVNHU6BRWQgabB.jpg"
          className="h-10 w-10 rounded-full"
          alt="Cambo Shop Logo"
        />
        <span className="text-2xl font-semibold text-gray-800 dark:text-white">Cambo Shop</span>
      </NavbarBrand>

      <div className="flex md:order-2 items-center gap-4">
        {/* Cart Icon */}
        <div className="relative">
          <IoCart
            onClick={() => router.push(`/cart`)}
            className="text-3xl text-yellow-500 cursor-pointer hover:text-yellow-600 transition"
          />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </div>

        {/* Favorite Icon */}
        <div className="relative">
          <IoHeart
            onClick={() => router.push(`/favorite`)}
            className="text-3xl text-pink-500 cursor-pointer hover:text-pink-600 transition"
          />
          {favoriteCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2">
              {favoriteCount}
            </span>
          )}
        </div>

         {/* Avatar and Authentication */}
         <div className="flex items-center gap-2">
          {!userLoggedIn ? (
            <Button
              onClick={() => router.push("/login")}
              className="bg-red-500 hover:bg-red-600"
              aria-label="Login Button"
            >
              Login
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar
                img={currentUser?.photoURL || ""}
                alt={currentUser?.displayName || "User Avatar"}
                rounded
              />
              <span className="hidden md:block text-gray-700 dark:text-gray-300 text-sm font-medium">
              {currentUser?.displayName ? (
                currentUser.displayName
              ) : (
                currentUser?.email
              )}

               
              </span>
            </div>
          )}
        </div>

        {userLoggedIn && (
          <Button
            onClick={handleLogout}
            className="hidden md:block bg-orange-400 hover:bg-orange-500 text-white"
          >
            Log out
          </Button>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse className="md:order-1">
        {menu.map((pro, key) => (
          <NavbarLink
            key={key}
            as={Link}
            href={pro.path}
            className={`px-5 py-2 rounded-md text-base font-medium transition ${
              pro.path === pathName
                ? 'text-orange-500 dark:text-orange-400'
                : 'text-gray-600 dark:text-gray-300'
            } hover:text-orange-500 hover:dark:text-orange-400`}
          >
            {pro.title}
          </NavbarLink>
        ))}
        {userLoggedIn && (
          <Button
            onClick={handleLogout}
            className="block md:hidden w-full bg-orange-400 hover:bg-orange-500 text-white mt-2"
          >
            Log out
          </Button>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
