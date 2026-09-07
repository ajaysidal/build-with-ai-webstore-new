'use client'

import { useState } from 'react'
import { DomainSearch } from '@/components/domain-search'
import { TldPricingGrid } from '@/components/tld-pricing-grid'
import { CartSummary } from '@/components/cart-summary'

export default function Home() {
  const [searchedDomain, setSearchedDomain] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="z-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Enterprise Domain Hub</h1>
        <div onBlur={(e) => {
          const input = e.currentTarget.querySelector('input') as HTMLInputElement
          if (input?.value) setSearchedDomain(input.value)
        }}>
          <DomainSearch />
        </div>
        {searchedDomain && <TldPricingGrid baseName={searchedDomain} />}
        <CartSummary />
      </div>
    </main>
  )
}
