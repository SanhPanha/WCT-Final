"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { ProductPostType, initialValues } from "@/lib/constans";
import { getDatabase, ref, set, push } from "firebase/database";
import app from "../../../lib/firebaseConfiguration";
import { Dropdown } from "flowbite-react";
import CustomInput from "../uploadimage/page";

// const FILE_SIZE = 1024 * 1024 * 2; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif", ""];

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  name: Yup.string().required("Product Name is required"),
  desc: Yup.string().nullable(),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  // fileProduct: Yup.mixed()
	// 	.test("fileFormat", "Unsupported Format", (value: any) => {
	// 		if (!value) {
	// 			return true;
	// 		}
	// 		return SUPPORTED_FORMATS.includes(value.type);
	// 	})
	// 	.test("fileSize", "File Size is too large", (value: any) => {
	// 		if (!value) {
	// 			true;
	// 		}
	// 		return value.size <= FILE_SIZE;
	// 	})
	// 	.required("Required"),
  fileProduct: Yup.string().nullable()
});

export default function Product() {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "products"));

    const productData: ProductPostType = {
      category: values.categoryName,
      name: values.name,
      desc: values.desc,
      image: values.fileProduct?.name || "",
      price: values.price,
      quantity: values.quantity,
    };

    try {
      await set(newDocRef, productData);
      alert("Product saved successfully");
      router.push("/myshop");
    } catch (error: any) {
      alert(`Error saving product: ${error.message}`);
    }
  };

  return (
    <main className={style.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="p-4 rounded-lg w-full container mx-auto">
            <div className="mb-4">
              <button
                type="button"
                onClick={() => router.push(`/myshop`)}
                className="text-yellow-500"
              >
                Back
              </button>
            </div>

            <div className={style.title}>
              <button
                type="button"
                onClick={() => router.push(`/add`)}
                className={style.title}
              >
                Create Product
              </button>
              <Dropdown color="yellow" label="Dropdown button">
                <Dropdown.Item
                  onClick={() => router.push(`/uploadimage`)}
                  className="text-yellow-500"
                >
                  Product Image
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => router.push(`/uploadIcon`)}
                  className="text-yellow-500"
                >
                  Product Icon
                </Dropdown.Item>
              </Dropdown>
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
              />
              <ErrorMessage name="name" component="div" className={style.error} />
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
              />
              <ErrorMessage name="price" component="div" className={style.error} />
            </div>

            <div className="mb-5">
              <label htmlFor="quantity" className={style.label}>
                Product Quantity
              </label>
              <Field
                type="number"
                name="quantity"
                id="quantity"
                className={style.input}
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className={style.error}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="categoryName" className={style.label}>
                Product Category Name
              </label>
              <Field
                type="text"
                name="categoryName"
                id="categoryName"
                className={style.input}
              />
              <ErrorMessage
                name="categoryName"
                component="div"
                className={style.error}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="fileProduct" className={style.label}>
                Product Image
              </label>
              <Field
                name="fileProduct"
                id="fileProduct"
                // component={CustomInput}
                setFieldValue={setFieldValue}
                className={style.input}
              />
              <ErrorMessage
                name="fileProduct"
                component="div"
                className={style.error}
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-yellow-500 py-2 px-3 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => router.push(`/myshop`)}
                className="bg-red-600 text-white px-3 py-2 ml-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
