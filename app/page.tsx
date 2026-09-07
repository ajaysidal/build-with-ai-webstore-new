import { DomainSearch } from '@/components/domain-search';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Enterprise Domain Hub</h1>
        <p className="text-muted-foreground">Search and manage your global domain portfolio.</p>
      </div>
      <DomainSearch />
    </main>
  );
}
