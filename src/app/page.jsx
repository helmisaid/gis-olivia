'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-4">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
        Peta Kabupaten di Indonesia
      </h1>
      <div className="w-full h-[80vh]">
        <Map />
      </div>
    </main>
  );
}