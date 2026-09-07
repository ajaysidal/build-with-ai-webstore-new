import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  domain: string
  price: number
  currency: string
  period?: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (domain: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        if (state.items.some((i) => i.domain === item.domain)) return state
        return { items: [...state.items, item] }
      }),
      removeItem: (domain) => set((state) => ({
        items: state.items.filter((i) => i.domain !== domain),
      })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'domain-cart-storage' }
  )
)
