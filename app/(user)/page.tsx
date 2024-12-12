'use client'
import HeroSectionComponent from "@/components/hero/HeroSectionComponent";
import '@/app/globals.css'
import CarouselComponent from "@/components/hero/courolsel";
import Products from "@/components/product/products";
import SectionComponent from "@/components/section/section";
import FeatureProduct from "@/components/productFeature/featureProduct";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Home() {
  useEffect(() => {
    AOS.init({
         duration: 800,
         once: false,
       })
 }, [])
  return (
    <main>
      <HeroSectionComponent/>
	   <SectionComponent/>
        <CarouselComponent/>
        <section>
          <p className="text-xl font-bold container mx-auto my-9">Popular Products</p>
          <Products/>
        </section>
        <section>
        <FeatureProduct/>
        </section>
		</main>
		  );
		}
