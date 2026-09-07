interface OpenproviderResponse<T> {
  code: number;
  desc: string;
  data: T;
}

let cachedToken: string | null = null;

async function getAuthToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const url = `${process.env.OPENPROVIDER_API_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.OPENPROVIDER_USERNAME,
      password: process.env.OPENPROVIDER_PASSWORD,
      ip: '0.0.0.0',
    }),
  });

  const result: OpenproviderResponse<{ token: string }> = await response.json();
  if (result.code !== 0) {
    throw new Error(`Openprovider Auth Failed: ${result.desc} (Code: ${result.code})`);
  }

  cachedToken = result.data.token;
  return cachedToken;
}

export async function openproviderRequest<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
  const token = await getAuthToken();
  const url = `${process.env.OPENPROVIDER_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result: OpenproviderResponse<T> = await response.json();
  
  if (result.code !== 0) {
    throw new Error(`Openprovider API Error: ${result.desc} (Code: ${result.code})`);
  }

  return result.data;
}
