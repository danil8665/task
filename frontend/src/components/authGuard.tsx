'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/welcome');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
