import { MapFilterItems } from '@/components/MapFilterItems';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <h1 className="text-center text-4xl md:text-5xl my-10">
        Something great is coming to life
      </h1>
    </div>
  );
}
