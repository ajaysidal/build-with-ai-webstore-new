'use client';

import { useState } from 'react';
import { checkDomainAvailability } from '@/app/actions/domains';
import { Button } from '@/components/ui/button';

export function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [extension, setExtension] = useState('com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const res = await checkDomainAvailability(domain, extension);
    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card border rounded-xl shadow-sm">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter domain name..."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={extension}
          onChange={(e) => setExtension(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="com">.com</option>
          <option value="net">.net</option>
          <option value="org">.org</option>
          <option value="io">.io</option>
          <option value="co.nz">.co.nz</option>
        </select>
        <Button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Search'}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50">
          <h3 className="font-semibold text-sm mb-2">Availability Result:</h3>
          <pre className="text-xs overflow-x-auto p-2 bg-background rounded border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
