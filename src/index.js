import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:
        "https://graphql.contentful.com/content/v1/spaces/" +
        process.env.REACT_APP_SPACE_ID,
    headers: {
        Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <HelmetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </ApolloProvider>
    </React.StrictMode>
);
