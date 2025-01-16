'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'flowbite-react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import app from "../../lib/firebase/firebaseConfiguration";
import { getDatabase, ref, get, remove } from "firebase/database";
import { SearchComponent } from '@/components/seach_button/searchButton';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CatageoryType, ProductType } from '@/lib/constans';
import { useAuth } from '@/lib/context/context';

const placeHolderImage = 'https://via.placeholder.com/150';

export default function DashBoard() {
  const router = useRouter();
  const [categories, setCategories] = useState<CatageoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { currentUser } = useAuth();

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
            key, // Add the Firebase key to each product object
          })) as ProductType[];

          // Filter products by currentUser's display name
          const filtered = currentUser?.displayName
            ? data.filter(product => product.seller === currentUser.displayName)
            : [];

          setProducts(filtered);
          setFilteredProducts(filtered);
          console.log('Filtered Products:', filtered);
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

  // Filter products by search term
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredProducts(filtered);
  };

  // Filter products by selected category
  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    // Filter products by category and currentUser's display name
    const filtered = products.filter(product =>
      (selected === '' || product.category === selected) &&
      product.seller === currentUser?.displayName
    );
    setFilteredProducts(filtered);
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!productId) return;

    try {
      const db = getDatabase(app);
      const productToDelete = products.find(product => product.slug === productId);

      if (!productToDelete) {
        alert("Product not found.");
        return;
      }

      const productKey = productToDelete.key; // Get the Firebase key
      const productRef = ref(db, `products/${productKey}`);

      // Remove the product from Firebase
      await remove(productRef);

      // Update the local state
      setProducts(prev => prev.filter(product => product.key !== productKey));
      setFilteredProducts(prev => prev.filter(product => product.key !== productKey));

      setOpenDeleteModal(false);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const columns: TableColumn<ProductType>[] = [
    {
      name: 'Product Title',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Seller',
      selector: row => row.seller || 'N/A',
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Price (USD)',
      selector: row => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Image',
      cell: row => (
        <img
          className="w-[80px] h-[70px]"
          src={row.image || placeHolderImage}
          alt={row.name || 'Placeholder'}
        />
      ),
    },
    {
      name: 'Action',
      cell: row => (
        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 p-1 space-x-2">
  {/* Edit Button */}
  <button
    onClick={() => router.push(`/myshop/edit/${row.slug}`)}
    className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 transition whitespace-nowrap"
    aria-label="Edit Product"
  >
    Edit
  </button>

  {/* View Button */}
  <button
    onClick={() => {
      setProductDetail(row);
      setOpenDetailModal(true);
    }}
    className="rounded-md px-4 py-2 text-sm font-medium text-blue-600 bg-white hover:text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-300 transition whitespace-nowrap"
    aria-label="View Product"
  >
    View
  </button>

  {/* Delete Button */}
  <button
    onClick={() => {
      setProductId(row.slug);
      setOpenDeleteModal(true);
    }}
    className="rounded-md px-4 py-2 text-sm font-medium text-red-600 bg-white hover:text-red-800 hover:bg-red-100 focus:outline-none focus:ring focus:ring-red-300 shadow-sm transition whitespace-nowrap"
    aria-label="Delete Product"
  >
    Delete
  </button>
</div>

      ),
    },
  ];

  return (
    <main className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 ">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Category Filter */}
      <Select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryFilter}
        className="w-full sm:w-64 text-sm bg-white border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-400 dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.slug} value={category.slug}>
            {category.title}
          </option>
        ))}
      </Select>
  
      {/* Search & Add Button */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <SearchComponent
          onChange={handleFilter}
          path="/myshop/add"
          title="Add Product"
        />
      </div>
    </div>
  
    <section className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        persistTableHead
        noDataComponent={<div className="text-center p-4">No products found</div>}
      />
    </section>
  
    {/* Detail Modal */}
    <Modal show={openDetailModal} onClose={() => setOpenDetailModal(false)}>
      <Modal.Header>Product Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <img
            src={productDetail?.image || placeHolderImage}
            alt={productDetail?.name || 'Untitled'}
            className="w-full h-60 object-contain bg-gray-100 rounded-lg"
          />
          <div className="flex flex-col gap-3">
            {[
              { label: 'Product Name', value: productDetail?.name },
              { label: 'Description', value: productDetail?.desc },
              { label: 'Category', value: productDetail?.category },
              { label: 'Price', value: `$${productDetail?.price?.toFixed(2) || '0.00'}` },
              { label: 'Seller', value: productDetail?.seller },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-orange-400">{item.label}:</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.value || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  
    {/* Delete Confirmation Modal */}
    <Modal
      show={openDeleteModal}
      size="md"
      onClose={() => setOpenDeleteModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </main>
  
  );
}
