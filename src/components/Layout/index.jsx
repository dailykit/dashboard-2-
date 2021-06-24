import React from "react";
import { useRouter } from "next/router";
import Header from "../../sections/Header";
import Sidebar from "../../sections/Sidebar";
import { useAuth } from "../../store/auth";

function Redirect({ to }) {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
}
export const Layout = ({ children }) => {
  const { authenticated } = useAuth();
  const [isSidebarVisible, toggleSidebar] = React.useState(false);

  if (!authenticated) <Redirect to="/login" />;

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar visible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <main>{children}</main>
    </>
  );
};
