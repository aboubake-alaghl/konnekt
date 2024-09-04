import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function GuestGuard({ children }: {
  children: JSX.Element | JSX.Element[] 
}) {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
