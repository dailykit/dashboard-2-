import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../sections/Header";
import Sidebar from "../../sections/Sidebar";
import { useAuth } from "../../store/auth";

export const Layout = ({ children }) => {
  const router = useRouter();
  const { authenticated } = useAuth();
  const [isSidebarVisible, toggleSidebar] = React.useState(false);

  // useEffect(() => {
  //   if (!authenticated) router.push("/login");
  // }, []);
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar visible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <main>{children}</main>
    </>
  );
};
