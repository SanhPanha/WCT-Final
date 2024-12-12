'use client';
import React, { useState } from 'react'
import { Sidebar } from 'flowbite-react';
import "@/app/globals.css";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
import nextLink from 'next/link';
import Link from 'next/link';
import { MenuList } from './menuList';
type Menu={
  icon:React.ElementType;
  name:string;
  path:string;
}
export default function SidebarComponent() {
  const[menu,setMenu]=useState<Menu[]>(MenuList)
  return (
       <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" as={Link} icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
       
           {menu.map((item,index)=>
             <Sidebar.Item key={index} href={item.path} as={Link} icon={item.icon}>
             {item.name}
           </Sidebar.Item>
           )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
 
  )
}
 