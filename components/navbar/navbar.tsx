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
import { useAppSelector } from '@/redux/hooks';
import { useSession, signOut } from 'next-auth/react';

type MenuItems = {
  title: string;
  path: string;
  active: boolean;
};

export default function NavbarComponent() {
  const [menu] = useState<MenuItems[]>(MenuList);
  const router = useRouter();
  const pathName = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session } = useSession();
  const cartCount = useAppSelector((state) => state.cart.products.length);
  const favoriteCount = useAppSelector((state) => state.favorite.favorites.length);

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    }
  }, [session]);

  return (
    <Navbar
      className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900 transition duration-200"
      fluid
    >
      <NavbarBrand href="/" className="flex items-center gap-2">
        <img
          src="https://img.favpng.com/6/5/12/ecommerce-logo-png-favpng-c9XwFQHwsmZeVNHU6BRWQgabB.jpg"
          className="mr-3 h-8 sm:h-10 rounded-full"
          alt="Cambo Shop Logo"
        />
        <span className="self-center text-2xl font-semibold dark:text-white">
          Cambo Shop
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 gap-4 items-center">
        {/* Cart Icon */}
        <div className="relative">
          <IoCart
            onClick={() => router.push(`/cart`)}
            className="text-3xl text-yellow-500 cursor-pointer hover:text-yellow-600 transition"
          />
          {cartCount > 0 && (
            <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-2">
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
                <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-2">
                {favoriteCount}
                </span>
            )}
        </div>

        {/* Avatar and Authentication */}
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <Avatar
              img={session?.user?.image as string}
              alt="User Avatar"
              rounded
              className="cursor-pointer"
              onClick={() => router.push('/profile')}
            />
          ) : (
            <Button
              onClick={() => router.push(`/login`)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Button>
          )}

          {loggedIn && (
            <Button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          )}
        </div>

        <NavbarToggle />
      </div>

      <NavbarCollapse className="md:order-1">
        {menu.map((pro, key) => (
          <NavbarLink
            key={key}
            as={Link}
            href={pro.path}
            className={`px-5 py-2 rounded-md text-base font-medium ${
              pro.path === pathName ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            {pro.title}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
}
