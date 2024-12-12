'use client'

import { Avatar, Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {MenuList} from "@/components/navbar/menu";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import '@/app/globals.css'
import { IoCart } from "react-icons/io5";
import {  useAppSelector } from "@/redux/hooks"
import { useSession ,  signOut } from "next-auth/react";
type MenuItems = {
    title:string,
    path:string,
    active:boolean
}
export default function NavbarComponent() {
    const[menu,setMenu] = useState<MenuItems[]>(MenuList)
    const router = useRouter();
    const pathName = usePathname();
    const[loggedIn,setLoggedIn] = useState(false)
    const{data:session} = useSession();
    const count = useAppSelector(state=>state.cart.products)

    useEffect(() => {
        if (session) {
            setLoggedIn(true);
        }
    }, [session]);

    console.log('this is my sesstion',session)
    console.log('this is my loggedIn',loggedIn)
    return (
        <Navbar >
            <NavbarBrand href="/">
                <img src="https://img.favpng.com/6/5/12/ecommerce-logo-png-favpng-c9XwFQHwsmZeVNHU6BRWQgabB.jpg" className="mr-3 h-6 sm:h-9 rounded-full" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Cambo Product</span>
            </NavbarBrand>

             <div className="flex md:order-2">
                <div>
                    <span className="text-xl text-yellow-500 relative top-[-10px] left-8">{count.length}</span>
                </div>
                <div>   
                    <IoCart onClick={()=>router.push(`/cart`)} className="text-5xl mr-2 text-yellow-500" />
                    </div>
                    <div>
             {loggedIn ? 
              <Avatar img={session?.user?.image as string} alt="avatar of Jese" rounded />
                 : (
               <Button onClick={()=>router.push(`/login`)} className="bg-red-500">Login</Button>
                  )}
</div>
                 <div className="ml-[10px]">
                 {loggedIn && (
              <Button onClick={()=>signOut()}  className="bg-red-500">Log out</Button>
      )}
                 </div>
                <NavbarToggle />
            </div>
            
            <NavbarCollapse>
                {menu.map((pro,key)=>(
                    <NavbarLink
                      key={key}
                      as={Link}
                      href={pro.path}
                      active={pro.path === pathName}
                    >
                        {pro.title}
                    </NavbarLink>
                ))}
            </NavbarCollapse>
        </Navbar>
    );
}
