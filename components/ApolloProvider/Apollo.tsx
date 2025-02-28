/*"use client";
import { ApolloClient, InMemoryCache, ApolloProvider, split, from } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useMemo } from 'react';
import { onError } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'; // For file uploads

// Apollo Provider Component
export const Apollo = ({ children }: { children: React.ReactNode }) => {
  // HTTP link for queries and mutations
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_LINK, // GraphQL HTTP endpoint
    credentials: 'include', // Send cookies along with requests
  });

  // WebSocket link for subscriptions
  const wsLink = new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_WS_SERVER_LINK?.replace(/^http/, 'ws'), // Replace http with ws for WebSocket link
    options: {
      reconnect: true, // Automatically reconnect if the connection is lost
    },
  });

  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      // console.error(`[Network error]: ${networkError}`);
    }
  });

  // Link splitting based on operation type (query/mutation or subscription)
  const link = from([
    errorLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink, // Use WebSocket link for subscriptions
      httpLink // Use HTTP link for queries and mutations
    ),
  ]);

  // Apollo Client setup with cache and link
  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link, // Use the link created above
    });
  }, [link]);

  // Return the ApolloProvider wrapping your children components
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};*/

"use client";
import { ApolloClient, InMemoryCache, ApolloProvider, split, from } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { useEffect, useMemo, useRef } from "react";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"; // For file uploads

export const Apollo = ({ children }: { children: React.ReactNode }) => {
  // HTTP link for queries and mutations
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_LINK, // GraphQL HTTP endpoint
    credentials: "include", // Send cookies with requests
  });

  // Create WebSocket link only if running on the client
  const wsLink = typeof window !== "undefined" && process.env.NEXT_PUBLIC_WS_SERVER_LINK
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS_SERVER_LINK.replace(/^http/, "ws"), // Convert http to ws
        options: { reconnect: true },
      })
    : null;

  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.error(`[Network error]:`, networkError);
    }
  });

  // Link selection: Use WebSocket for subscriptions, HTTP for everything else
  const link = from([
    errorLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink || httpLink, // Use WebSocket if available, otherwise fallback to HTTP
      httpLink
    ),
  ]);

  // Apollo Client with cleanup
  const clientRef = useRef<ApolloClient<any> | null>(null);
  if (!clientRef.current) {
    clientRef.current = new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });
  }

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      clientRef.current?.stop();
      clientRef.current = null;
    };
  }, []);

  // WebSocket event listeners for debugging (optional)
  useEffect(() => {
    if (wsLink && "subscriptionClient" in wsLink) {
      const client = wsLink.subscriptionClient;
      client.on("connecting", () => console.log("WebSocket is connecting..."));
      client.on("connected", () => console.log("WebSocket connected!"));
      client.on("reconnecting", () => console.log("WebSocket reconnecting..."));
      client.on("error", (error: any) => console.error("[WebSocket Error]:", error));
    }
  }, [wsLink]);

  return <ApolloProvider client={clientRef.current}>{children}</ApolloProvider>;
};
