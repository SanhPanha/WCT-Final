'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import app from "../../../lib/firebaseConfiguration";
import { getDatabase, ref, get } from "firebase/database";
import { SearchComponent } from '@/components/seach_button/searchButton';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ProductType } from '@/lib/constans';

const placeHolderImage = 'https://via.placeholder.com/150';

export default function DashBoard() {
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "products"); // Fixed typo
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val()) as ProductType[];
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products by search term
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredProducts(search ? filtered : products);
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (productId === null) return;

    try {
      // Call API or Firebase function to delete the product here
      setFilteredProducts(prev => prev.filter(product => product.id !== productId));
      setOpenDeleteModal(false);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const columns: TableColumn<ProductType>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Product Title',
      selector: row => row.name,
      sortable: true,
      style: {
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
      },
    },
    {
      name: 'Seller',
      selector: row => row.seller || 'N/A',
    },
    {
      name: 'Price (USD)',
      selector: row => `$${row.price.toFixed(2)}`,
      sortable: true,
      style: {
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
      },
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
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
          <button
            onClick={() => router.push(`/edit/${row.id}`)}
            className="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setProductDetail(row);
              setOpenDetailModal(true);
            }}
            className="inline-block rounded-md px-4 py-2 text-sm text-blue-700 hover:text-gray-700 focus:relative"
          >
            View
          </button>
          <button
            onClick={() => {
              setProductId(row.id);
              setOpenDeleteModal(true);
            }}
            className="inline-block rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <main>
      <SearchComponent onChange={handleFilter} />
      <section className="mt-[20px] p-10">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          persistTableHead
          noDataComponent={<div>No products found</div>}
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
              className="w-full h-96 object-contain"
            />
            <p className="text-base leading-relaxed text-gray-500">
              {productDetail?.desc || 'No description available.'}
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              {productDetail?.name || 'No name available.'}
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDelete}
              >
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
