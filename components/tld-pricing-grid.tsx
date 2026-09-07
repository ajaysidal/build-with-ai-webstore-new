'use client'

import { useCartStore, CartItem } from '@/lib/store/cart'

interface TldPricingGridProps {
  baseName: string
}

const POPULAR_TLDS = ['.com', '.net', '.org', '.io', '.co', '.ai']

export function TldPricingGrid({ baseName }: TldPricingGridProps) {
  const addItem = useCartStore((state) => state.addItem)
  const cartItems = useCartStore((state) => state.items)

  const cleanBase = baseName.includes('.') ? baseName.split('.')[0] : baseName

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-3">Alternative TLDs</h3>
      <div className="grid grid-cols-2 gap-3">
        {POPULAR_TLDS.map((tld) => {
          const fullDomain = `${cleanBase}${tld}`
          const isSelected = cartItems.some((item: CartItem) => item.domain === fullDomain)
          const mockPrice = 12.99

          return (
            <div key={tld} className="border p-3 rounded flex items-center justify-between">
              <div>
                <span className="font-bold">{fullDomain}</span>
                <p className="text-xs text-gray-500">${mockPrice}/yr</p>
              </div>
              <button
                onClick={() => addItem({ domain: fullDomain, price: mockPrice, currency: 'USD' })}
                disabled={isSelected}
                className={`px-3 py-1 text-sm rounded ${
                  isSelected ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                {isSelected ? 'Added' : 'Add'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
