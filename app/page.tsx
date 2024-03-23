import { MapFilterItems } from '@/components/MapFilterItems';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Suspense>
        <MapFilterItems />
      </Suspense>
      <h1 className="text-center text-4xl md:text-5xl my-10">
        Something great is coming to life
      </h1>
    </div>
  );
}
