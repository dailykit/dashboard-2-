import "../styles/globals.css";
import React from "react";
import ApolloProvider from '../lib/apollo'
import { AuthProvider } from "../store/auth";
import { TabProvider } from "../store/tabs";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider>
      <AuthProvider>
        <TabProvider>
          <Component {...pageProps} />
        </TabProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
