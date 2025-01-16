"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { CatageoryType, ProductType } from "@/lib/constans";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "../../../lib/firebase/firebaseConfiguration";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/context";
import toast, { Toaster } from "react-hot-toast"; // Import toast

const initialValues = {
  slug: "",
  category: "",
  name: "",
  desc: "",
  image: "",
  price: 0,
  quantity: 0,
  isHighLight: false,
  isCheckOut: false,
};

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  name: Yup.string().required("Product Name is required"),
  desc: Yup.string().nullable(),
  price: Yup.number().required("Price is required"),
  image: Yup.string().required("Image is required"),
});

export default function Product() {
  const router = useRouter();
  const [categories, setCategories] = useState<CatageoryType[]>([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "categories");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const categoryList = Object.entries(data).map(([key, value]: any) => ({
            id: key,
            ...value,
          }));
          setCategories(categoryList);
        } else {
          toast.error("No categories found.");
        }
      } catch (error) {
        toast.error("Error fetching categories.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values: any) => {
    const db = getDatabase(app);
    const productRef = push(ref(db, `products`));

    const productData: ProductType = {
      slug: values.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      category: values.category,
      name: values.name,
      desc: values.desc,
      image: values.image, // Image file name, handle upload separately if needed
      price: values.price,
      quantity: values.quantity,
      isHighLight: false,
      isCheckOut: false,
      date: new Date().toISOString(),
      seller: currentUser?.displayName || "Unknown Seller",
    };

    setIsLoading(true);

    try {
      await set(productRef, productData);
      toast.success("Product saved successfully!");
      router.push("/myshop");
    } catch (error: any) {
      toast.error(`Error saving product: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={style.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="rounded-lg w-full container mx-auto bg-white shadow-lg p-10">
            <div className="flex justify-between items-center mb-5">
              <button
                type="button"
                onClick={() => router.push(`/products/product`)}
                className="bg-orange-400 text-lg font-medium hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
              >
                Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Create Product</h2>
            </div>

            <div className="mb-5">
              <label htmlFor="slug" className={style.label}>
                Product Slug
              </label>
              <Field
                type="text"
                name="slug"
                id="slug"
                className={style.input}
                readOnly
              />
            </div>

            <div className="mb-5">
              <label htmlFor="name" className={style.label}>
                Product Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className={style.input}
                placeholder="e.g., Fancy T-Shirt"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const name = e.target.value;
                  setFieldValue("name", name);
                  setFieldValue(
                    "slug",
                    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
                  );
                }}
                value={values.name}
              />
              <ErrorMessage name="name" component="div" className={style.error} />
            </div>

            <div className="mb-5">
              <label htmlFor="category" className={style.label}>
                Product Category
              </label>
              <Field as="select" name="category" className={style.input}>
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className={style.error} />
            </div>

            <div className="mb-5">
              <label htmlFor="desc" className={style.label}>
                Product Description
              </label>
              <Field
                as="textarea"
                name="desc"
                id="desc"
                className={style.input}
                placeholder="Write a short description"
              />
              <ErrorMessage name="desc" component="div" className={style.error} />
            </div>

            <div className="mb-5">
              <label htmlFor="price" className={style.label}>
                Product Price
              </label>
              <Field
                type="number"
                name="price"
                id="price"
                className={style.input}
                placeholder="e.g., 49.99"
              />
              <ErrorMessage name="price" component="div" className={style.error} />
            </div>

            <div className="mb-5">
              <label htmlFor="image" className={style.label}>
                Product Image
              </label>
              <Field
                type="text"
                name="image"
                id="image"
                className={style.input}
                placeholder="Image URL or file name"
              />
              <ErrorMessage name="image" component="div" className={style.error} />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={() => router.push(`/products/product`)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 ${
                  isLoading && "cursor-not-allowed opacity-50"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
