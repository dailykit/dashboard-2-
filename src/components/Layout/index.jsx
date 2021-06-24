import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../store/auth';

function Redirect({ to }) {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
}
export const Layout = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) <Redirect to="/login" />;

  return <main>{children}</main>;
};
