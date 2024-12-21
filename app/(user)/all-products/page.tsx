
import '@/app/globals.css';
import Products from '@/components/product/products';
import 'aos/dist/aos.css';

export default function AllProducts() {
  return (
    <main>
      {/* Popular Products Section */}
      <section className="container mx-auto">
        <Products />
      </section>

    </main>
  );
}
