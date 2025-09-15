'use client';

import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const uri = process.env.NEXT_PUBLIC_BACKEND_URI ?? 'http://localhost:4200/api/graphql';

const makeClient = () => {
  const httpLink = new HttpLink({
    uri,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
};
