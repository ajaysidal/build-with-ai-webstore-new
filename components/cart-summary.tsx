'use client'

import { useCartStore } from '@/lib/store/cart'

export function CartSummary() {
  const { items, removeItem, clearCart } = useCartStore()

  if (items.length === 0) return null

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border rounded bg-gray-50">
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
      <div className="flex justify-between items-center pt-2 border-t font-bold">
        <span>Total: ${totalPrice.toFixed(2)} USD</span>
        <button 
          onClick={() => alert('Proceeding to Openprovider Checkout (Mock)...')} 
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
