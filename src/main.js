import App from './App.svelte';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

const link = new WebSocketLink({
	uri: 'ws://localhost:3000/graphql',
	options: {
		lazy: true,
		reconnect: true,
		timeout: 30000,
		connectionParams: () => ({
			token: localStorage.getItem('auth')
		})
	}
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		client,
	}
});

export default app;