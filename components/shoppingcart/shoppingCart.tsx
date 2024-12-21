'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import { FaCheck, FaClock, FaQuestion } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { removeFromCart, selectProducts, selectTotalPrice, incrementQuantity, decrementQuantity } from '@/redux/feature/addToCart/cartSlice';
import { CartProductType } from '@/lib/constans';
import { decrement } from '@/redux/feature/counter/couterSlice';

export default function ProductView() {
  const products = useAppSelector(selectProducts);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10">Shopping Cart</h1>

        {products.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">Your cart is empty</h2>
          </div>
        ) : (
          <form className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            {/* Product List */}
            <section aria-labelledby="cart-heading" className="lg:col-span-8">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 bg-white rounded-lg shadow">
                {products.map((product: CartProductType, index) => (
                  <li key={index} className="flex py-6 sm:py-10 px-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name || 'undefined'}
                        className="h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-800">
                          {product.name}
                        </h3>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            dispatch(removeFromCart({ id: product.id, quantity: product.quantity }));
                            dispatch(decrement());
                          }}
                        >
                          <MdDelete className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => dispatch(decrementQuantity(product.id))}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={product.quantity}
                            className="w-12 text-center text-gray-900 bg-white border-x focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => dispatch(incrementQuantity(product.id))}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-lg font-semibold text-gray-800">
                          ${product.quantity * product.price}
                        </span>
                      </div>

                      <p className="mt-4 flex items-center space-x-2 text-sm text-gray-700">
                        <FaCheck className="h-5 w-5 text-green-500" />
                        <span>In stock</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order Summary */}
            <section
              aria-labelledby="summary-heading"
              className="h-[380px] lg:mt-0 lg:col-span-4 bg-white rounded-lg shadow p-6"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Items</dt>
                  <dd className="text-sm font-medium text-gray-900">{products.length}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Shipping estimate</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Tax estimate</dt>
                  <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${totalPrice}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-yellow-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
