import { Environment, Network, RecordSource, Store } from 'relay-runtime';
// import Cookies from 'js-cookie';
// import refreshToken from './mutations/refreshTokenMutation';
import { server } from './serverConfig';

async function fetchQuery(operation, variables, cacheConfig, uploadables) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  };
  // const token = Cookies.get('access_token');
  // if (token) {
  //   request.headers.Authorization = `Bearer ${token}`;
  // }
  const response = await fetch(server, request);
  const data = await response.json();
  if (!data.errors) {
    return data;
  }

  if (data.errors[0].message !== 'Not Authorised!' && data.errors[0].message !== 'jwt expired') {
    throw new Error(data.errors[0].message);
  }

  // const rToken = Cookies.get('refreshToken');
  // if (!rToken) {
  //   throw new Error(data.errors[0].message);
  // }

  // try {
  //   const res = await refreshToken(rToken);
  //   Cookies.set('access_token', res.refreshToken.token);
  //   return fetchQuery(operation, variables, cacheConfig, uploadables);
  // } catch (e) {
    // refresh token error, throw same error
    // Cookies.remove('access_token');
    // Cookies.remove('refreshToken');
    throw new Error(data.errors[0].message);
  // }
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
