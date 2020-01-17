const express = require('express'),
	compression = require('compression'),
 	{ createServer } = require('http'),
 	{ ApolloServer } = require('apollo-server-express'),
	{ resolvers, typeDefs } = require('./schema'),
	prod = process.env.NODE_ENV === 'production',
	port = process.env.PORT || 3000

const start = async () => {
	try {
		const apollo = new ApolloServer({
			typeDefs,
			resolvers,
			context: async req => {
				let token = false

				if (req.connection && req.connection.context && req.connection.context.token) {
					token = req.connection.context.token
				}

				return {
					token,
				}
			},
			introspection: !prod,
			playground: !prod,
		})

		const app = express()
		const path = '/graphql'

		apollo.applyMiddleware({ app, path })

		app.use(compression({ threshold: 0 }))
		
		const server = createServer(app)

		apollo.installSubscriptionHandlers(server)

		server.listen({ port }, (err) => {
			if (err) console.log('error', err);

			console.log(`🚀 Server ready at http://0.0.0.0:${port}${apollo.graphqlPath}`);
		});
	} catch (e) {
		console.error('Error:', e.toString())
	}
}

start()
