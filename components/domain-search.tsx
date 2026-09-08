'use client'

import { useState } from 'react'
import { checkDomainAvailability } from '@/app/actions/domains'

export function DomainSearch() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain) return
    setLoading(true)
    try {
      const res = await checkDomainAvailability(domain)
      setResult(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter your domain (e.g., example.com)"
          className="border p-2 rounded flex-1"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded">
          {loading ? 'Checking...' : 'Search'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 border rounded">
          {result.success ? (
            <div>
              <p><strong>Domain:</strong> {result.domain}</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Price:</strong> ${result.price?.price} {result.price?.currency}</p>
            </div>
          ) : (
            <p className="text-red-500">{result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}


