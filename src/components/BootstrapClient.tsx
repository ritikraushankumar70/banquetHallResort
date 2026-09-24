'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error Bootstrap does not have typings here
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}
