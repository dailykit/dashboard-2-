import '../styles/globals.css';
import React from 'react';
import { ApolloProvider } from '../lib/apollo';
import { AuthProvider } from '../store/auth';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
