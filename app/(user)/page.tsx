
import HeroSectionComponent from "@/components/hero/HeroSectionComponent";
import '@/app/globals.css';
import CarouselComponent from "@/components/hero/courolsel-category";
import SectionComponent from "@/components/section/section";
import FeatureProduct from "@/components/productFeature/featureProduct";
import HightlightProducts from "@/components/product/HightlightPoducts";
import LastModifiedProducts from "@/components/product/LastModifiedProduct";

export default function Home() {

  return (
    <main className="flex flex-col gap-9">
      {/* Hero Section */}
      <HeroSectionComponent />

      {/* Featured Section */}
      <SectionComponent />

      {/* Trusted Brands Carousel */}
      <CarouselComponent />

      {/* Popular Products Section */}
      <HightlightProducts />

      <LastModifiedProducts />

      {/* Feature Product Section */}
      <section className="container mx-auto my-9">
        <FeatureProduct />
      </section>
    </main>
  );
}
