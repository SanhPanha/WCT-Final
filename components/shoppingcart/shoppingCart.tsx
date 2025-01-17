'use client';

import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useAuth } from '@/lib/context/context';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { ProductType } from '@/lib/constans';
import app from '@/lib/firebase/firebaseConfiguration';

export default function ProductView() {
  const { currentUser, userLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
 const [loading, setLoading] = useState<string | null>(null);


  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      const db = getDatabase();
      const cartRef = ref(db, `carts/${currentUser.uid}`);

      // Listen for changes to the cart data in Firebase
      const unsubscribeCart = onValue(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }));

          setCartItems(items);

          // Calculate total price
          const total = items.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          );
          setTotalPrice(total);
        } else {
          setCartItems([]);
          setTotalPrice(0);
        }
      });

      return () => unsubscribeCart();
    }
  }, [userLoggedIn, currentUser]);

  const handleCheckOut = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty!");
      return;
    }
  
    const db = getDatabase(app);
    const ordersRef = ref(db, `orders`);
    const newOrders = cartItems.map((item) => ({
      ...item,
      orderId: `${item.id}-${Date.now()}`, // Generate a unique order ID
      buyer: currentUser?.displayName || currentUser?.email,
      createdAt: new Date().toISOString(),
    }));
  
    try {
      // Push new orders to Firebase
      const updates: Record<string, any> = {};
      newOrders.forEach((order) => {
        updates[`${order.orderId}`] = order;
      });
      await update(ordersRef, updates);
  
      // Optionally, clear the cart after successful checkout
      const cartRef = ref(db, `carts`);
      await remove(cartRef);
  
      alert("Checkout successful! Your orders are now pending approval.");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };
  

  const handleRemoveItem = async (itemId: string) => {
    setLoading(itemId);
    const db = getDatabase();
    const itemRef = ref(db, `carts/${currentUser?.displayName}/${itemId}`);

    try {
      await remove(itemRef);
    } catch (error) {
      console.error("Error removing item:", error);
      // Optionally show an error message to the user
    } finally {
      setLoading(null);
    }
  };


  const handleQuantityChange = async (itemId: string, delta: number) => {
    const db = getDatabase();
    const itemRef = ref(db, `carts/${currentUser?.uid}/${itemId}`);
    const item = cartItems.find((item) => item.id === itemId);
  
    if (item) {
      const newQuantity = Math.max(1, (item.quantity || 1) + delta);
  
      try {
        await update(itemRef, { quantity: newQuantity });
      } catch (error) {
        console.error("Error updating quantity:", error);
        // Optionally, handle the error (e.g., show a message to the user)
      }
    }
  };
  
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">Your cart is empty</h2>
          </div>
        ) : (
          <form className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            {/* Product List */}
            <section aria-labelledby="cart-heading" className="lg:col-span-8">
              <ul role="list" className="divide-y divide-gray-200 bg-white rounded-lg shadow">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-10 px-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name || 'undefined'}
                        className="h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <MdDelete className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={item.quantity || 1}
                            className="w-12 text-center text-gray-900 bg-white border-x focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                          ${item.quantity * item.price}
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
                    <dd className="text-sm font-medium text-gray-900">{cartItems.length}</dd>
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
                    <dd className="text-base font-medium text-gray-900">
                      ${(totalPrice + 5.0 + 8.32).toFixed(2)}
                    </dd>
                  </div>
                </dl>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={handleCheckOut}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                  disabled={cartItems.length === 0 || loading !== null}
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>
              </section>

          </form>
        )}
      </div>
    </div>
  );
}
