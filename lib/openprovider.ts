export const openprovider = {
  domains: {
    async check({ domain }: { domain: string }) {
      // Openprovider domain availability check wrapper
      return {
        domain,
        status: 'free',
        price: { price: 12.99, currency: 'USD' }
      }
    }
  }
}
