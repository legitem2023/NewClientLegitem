'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EnsureTabsInUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(window.location.href);
    const hasTabA = url.searchParams.has('TabA');
    const hasTabB = url.searchParams.has('TabB');

    if (!hasTabA || !hasTabB) {
      if (!hasTabA) url.searchParams.set('TabA', '0'); // or any default value
      if (!hasTabB) url.searchParams.set('TabB', '0'); // or any default value

      router.replace(url.toString(), { scroll: false });
    }
  }, [router, searchParams]);

  return null;
}
