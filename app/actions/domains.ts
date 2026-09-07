'use server'

import { queryOpenproviderDomain } from '@/lib/openprovider'

interface DomainCheckResult {
  domain: string
  available: boolean
  price?: number
  currency?: string
}

export async function checkDomainAvailability(domainName: string): Promise<DomainCheckResult> {
  const domain = domainName.trim().toLowerCase()
  const result = await queryOpenproviderDomain(domain)
  
  return {
    domain,
    available: result.available,
    price: result.price,
    currency: result.currency,
  }
}
