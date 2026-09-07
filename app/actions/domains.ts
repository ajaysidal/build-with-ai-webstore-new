'use server'

import { openprovider } from '@/lib/openprovider'

export async function checkDomainAvailability(domain: string) {
  try {
    const response = await openprovider.domains.check({
      domain: domain,
    })
    
    return {
      success: true,
      domain: response.domain,
      status: response.status, // e.g., 'active' (taken) or 'free' (available)
      price: response.price,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to check domain availability',
    }
  }
}
