'use client';
import { Button, Modal, Select, Popover } from 'flowbite-react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import app from "../../lib/firebase/firebaseConfiguration";
import { getDatabase, ref, get, remove, update } from "firebase/database";
import { SearchComponent } from '@/components/seach_button/searchButton';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CatageoryType, ProductType } from '@/lib/constans';
import { useAuth } from '@/lib/context/context';
import { useEffect, useState } from 'react';

const placeHolderImage = 'https://via.placeholder.com/150';

export default function DashBoard() {
  const router = useRouter();
  const [categories, setCategories] = useState<CatageoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [highlightFilter, setHighlightFilter] = useState<string>('');
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

 

  // Fetch products from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "products");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([key, value]) => ({
            ...(typeof value === 'object' && value !== null ? value : {}),
            key,
          })) as ProductType[];

          const filtered = currentUser?.displayName
            ? data.filter(product => product.seller === currentUser.displayName)
            : [];

          setProducts(filtered);
          setFilteredProducts(filtered);
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser?.displayName]);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "categories");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([key, value]: any) => ({
            id: key,
            ...value,
          }));
          setCategories(data);
        } else {
          console.error("No categories found.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (userLoggedIn === false) {
    router.push("/login"); // Redirect to login if the user is not logged in
    return;
  }


  const handleHighlight = async (product: ProductType) => {
    if (!product.key) {
      alert("Invalid product ID.");
      return;
    }

    const db = getDatabase(app);
    const productRef = ref(db, `products/${product.key}`);

    try {
      setLoading(true);
      await update(productRef, { ...product, isHighLight: true });
      setProducts(prev => prev.map(p => (p.key === product.key ? { ...p, isHighLight: true } : p)));
      alert("Product highlighted successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert('Error updating product');
    } finally {
      setLoading(false);
    }
  };

  const handleNotHighlight = async (product: ProductType) => {
    if (!product.key) {
      alert("Invalid product ID.");
      return;
    }

    const db = getDatabase(app);
    const productRef = ref(db, `products/${product.key}`);

    try {
      setLoading(true);
      await update(productRef, { ...product, isHighLight: false });
      setProducts(prev => prev.map(p => (p.key === product.key ? { ...p, isHighLight: true } : p)));
      alert("Product not highlighted successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert('Error updating product');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    const filtered = products.filter(product =>
      (selected === '' || product.category === selected) &&
      product.seller === currentUser?.displayName
    );
    setFilteredProducts(filtered);
  };

  const handleHighlightFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setHighlightFilter(selected);

    const filtered = products.filter(product => {
      const isHighlighted = selected === 'true' ? product.isHighLight : !product.isHighLight;
      return selected === '' || isHighlighted;
    });

    setFilteredProducts(filtered);
  };

  const handleDelete = async () => {
    if (!productId) return;

    try {
      const db = getDatabase(app);
      const productToDelete = products.find(product => product.slug === productId);

      if (!productToDelete) {
        alert("Product not found.");
        return;
      }

      const productRef = ref(db, `products/${productToDelete.key}`);
      await remove(productRef);
      setProducts(prev => prev.filter(product => product.key !== productToDelete.key));
      setFilteredProducts(prev => prev.filter(product => product.key !== productToDelete.key));

      setOpenDeleteModal(false);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const columns: TableColumn<ProductType>[] = [
    { name: 'Product Title', selector: row =>( row.name), sortable: true },
    { name: 'Category', selector: row => row.category, sortable: true },
    { name: 'Price (USD)', selector: row => `$${row.price.toFixed(2)}`, sortable: true },
    { 
      name: 'Image', 
      cell: row => (
        <img 
          className="w-[80px] h-[70px]" 
          src={row.image || placeHolderImage} 
          alt={row.name || 'Placeholder'} 
        />
      ) 
    },
    {
      name: 'Action',
      cell: row => (
        <div className="flex flex-1 p-2 gap-2">
          <Button size="sm"  className="whitespace-nowrap" onClick={() => router.push(`/myshop/edit/${row.slug}`)}>Edit</Button>
          <Button 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => row.isHighLight ? handleNotHighlight(row) : handleHighlight(row)}
          >
            {row.isHighLight ? 'Not Highlight' : 'Highlight'}
          </Button>
          <Button 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => { 
              setProductDetail(row); 
              setOpenDetailModal(true); 
            }}
          >
            View
          </Button>
          <Button 
            size="sm" 
            className="whitespace-nowrap"
            color="failure" 
            onClick={() => { 
              setProductId(row.slug); 
              setOpenDeleteModal(true); 
            }}
          >
            Delete
          </Button>
        </div>
      )
    },
  ];
  
  

  return (
    <main className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

        <div className='flex gap-2'>
        <Select value={selectedCategory} onChange={handleCategoryFilter} className="w-full sm:w-64">
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.slug} value={category.slug}>{category.title}</option>
          ))}
        </Select>

        <Select value={highlightFilter} onChange={handleHighlightFilter} className="w-full sm:w-64">
          <option value="">All Products</option>
          <option value="true">Highlighted</option>
          <option value="false">Not Highlighted</option>
        </Select>
        </div>
        

        <SearchComponent onChange={handleFilter} path="/myshop/add" title="Add Product" />
      </div>

      <section className="relative border rounded-lg shadow-sm">
        <DataTable
          className='overflow-auto rounded-lg '
          columns={columns}
          data={filteredProducts}
          pagination
          persistTableHead
          noDataComponent={<div className="text-center p-4">No products found</div>}
        />
      </section>

      <Modal show={openDetailModal} onClose={() => setOpenDetailModal(false)}>
        <Modal.Header>Product Details</Modal.Header>
        <Modal.Body>
          <div>
            <img src={productDetail?.image || placeHolderImage} alt={productDetail?.name || 'Untitled'} className="w-full h-60 object-contain" />
            <div className="mt-4">
              {[
                { label: 'Product Name', value: productDetail?.name },
                { label: 'Description', value: productDetail?.desc },
                { label: 'Category', value: productDetail?.category },
                { label: 'Price', value: `$${productDetail?.price?.toFixed(2) || '0.00'}` },
                { label: 'Seller', value: productDetail?.seller },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <h3 className="font-semibold text-orange-400">{item.label}:</h3>
                  <p>{item.value || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)} size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="text-lg font-normal">Are you sure you want to delete this product?</h3>
            <div className="mt-4 flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>Yes, I'm sure</Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}