import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function AuthGuard({ children }: {
  children: JSX.Element | JSX.Element[]
}) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    push('/')
    return;
    // return <Login />;
  }

  return <>{children}</>;
}
