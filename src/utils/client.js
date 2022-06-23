import { InMemoryCache, ApolloClient} from '@apollo/client';

const { REACT_APP_API_KEY } = process.env;

export const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers:{
      authorization: `Bearer ${REACT_APP_API_KEY}`
    }
  });