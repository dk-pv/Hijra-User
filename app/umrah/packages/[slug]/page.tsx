import { Suspense } from 'react';
import { PackageDetail, packageMetadata, packageParams } from '@/components/pilgrimage/package-detail';

// One Umrah package. The slug is URL data, read inside Suspense so the route's shared App Shell stays valid
// (Partial Prefetching); unknown slugs never reach this page: proxy.ts answers them with a real 404.

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packageParams('umrah');
}

export async function generateMetadata({ params }: Props) {
  return packageMetadata('umrah', (await params).slug);
}

export default function UmrahPackagePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <PackageDetail service="umrah" params={params} />
    </Suspense>
  );
}
