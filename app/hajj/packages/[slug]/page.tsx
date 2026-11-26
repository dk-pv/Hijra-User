import { Suspense } from 'react';
import { PackageDetail, packageMetadata, packageParams } from '@/components/pilgrimage/package-detail';

// One Hajj package. The slug is URL data, read inside Suspense so the route's shared App Shell stays valid
// (Partial Prefetching); unknown slugs never reach this page: proxy.ts answers them with a real 404.

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packageParams('hajj');
}

export async function generateMetadata({ params }: Props) {
  return packageMetadata('hajj', (await params).slug);
}

export default function HajjPackagePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <PackageDetail service="hajj" params={params} />
    </Suspense>
  );
}
