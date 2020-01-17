<script>

import gql from "graphql-tag"
import { Col, Container, Row, Button, Card, CardBody, Badge } from 'sveltestrap';
  

let random = 0;
let randoms = 0;

export let name;
export let client;

client.query({ query: gql`{ random }` }).then(result => {
	random = result.data.random;
});

client.subscribe({ query: gql`subscription { randoms }`}).subscribe(result => {
	randoms = result.data.randoms;
});

const handleClick = () => alert('I warned you!');

</script>

<main>

<Container>
  <Row>
  	<Col>

		<h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

		<Button color="danger" on:click={handleClick}>Do Not Press</Button>

		<Card>
			<CardBody>

				<h5>Query Random: <Badge>{random}</Badge></h5>
				<h5>Subscribe Randoms: <Badge>{randoms}</Badge></h5>
				
			</CardBody>
		</Card>

	</Col>
  </Row>
</Container>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
