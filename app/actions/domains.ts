'use server';

import { openproviderRequest } from '@/lib/openprovider';

export async function checkDomainAvailability(domainName: string, extension: string) {
  try {
    const data = await openproviderRequest<any>('/domains/check', 'POST', {
      domains: [{ name: domainName, extension }],
      with_price: true,
    });
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
