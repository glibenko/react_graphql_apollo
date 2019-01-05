import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import App from './components/App';

const client = new ApolloClient({
  uri: "/graphql"
});

const AppApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppApollo />, document.getElementById('app'));
