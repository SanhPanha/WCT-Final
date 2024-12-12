import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
  } from "react-icons/hi";
  
  export  const MenuList = [
    {
       name: "Home",
        path: "/",
        icon: HiArrowSmRight,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HiChartPie,
    },
    {
      name: "Setting",
      path: "/setting",
      icon: HiViewBoards,
    },
    {
      name: "About US",
      path: "/about",
      icon: HiInbox,
      label: "3",
    },
    {
      name: "Contact US",
      path: "/contact",
      icon: HiUser,
    },
    {
      name: "Products",
      path: "#",
      icon: HiShoppingBag,
    }
  ];
  