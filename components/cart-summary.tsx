'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { processDomainCheckout } from '@/app/actions/checkout'

export function CartSummary() {
  const { items, removeItem, clearCart } = useCartStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [successOrder, setSuccessOrder] = useState<string | null>(null)

  if (items.length === 0 && !successOrder) return null

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    setCheckoutError(null)

    try {
      const res = await processDomainCheckout(items)
      if (res.success && res.orderId) {
        setSuccessOrder(res.orderId)
        clearCart()
      } else {
        setCheckoutError(res.error || 'Checkout failed')
      }
    } catch {
      setCheckoutError('Network error during checkout')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border rounded bg-gray-50 text-black">
      {successOrder ? (
        <div className="text-center py-4">
          <h3 className="text-xl font-bold text-green-700 mb-2">Order Successful!</h3>
          <p className="text-sm text-gray-600 mb-4">Your order ID is: <span className="font-mono font-semibold">{successOrder}</span></p>
          <button
            onClick={() => setSuccessOrder(null)}
            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
          >
            New Search
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Your Domain Cart ({items.length})</h3>
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
              Clear All
            </button>
          </div>
          <ul className="divide-y divide-gray-200 mb-4">
            {items.map((item) => (
              <li key={item.domain} className="py-2 flex justify-between items-center text-sm">
                <span>{item.domain}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${item.price} {item.currency}</span>
                  <button
                    onClick={() => removeItem(item.domain)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {checkoutError && <p className="text-red-600 text-xs mb-2">{checkoutError}</p>}
          <div className="flex justify-between items-center pt-2 border-t font-bold">
            <span>Total: ${totalPrice.toFixed(2)} USD</span>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
