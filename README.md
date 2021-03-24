# 🤖 Nkọwa okwu Twitter Bot

Twitter bot for [@nkowaokwu](https://twitter/nkowaokwu)

## Getting Started

Clone the repo:

```
https://github.com/ijemmao/nkowaokwu_twitter.git
```

Install dependencies:

```
yarn install
```

Start the Igbo API with Docker:

```
yarn start:docker
```

In another terminal, start development server:

```
yarn dev
```

For production, build the project and then start it with:

```
yarn build
yarn start
```

### Local Development

To protect the @nkowaokwu account, the related consumer keys and access tokens are
hidden as environment variables. You can create your own tokens and hook them 
into this project to run the code with a personal Twitter account.

Create a `.env` file and provide values for the following keys

```
CONSUMER_KEY=private_consumer_key
CONSUMER_SECRET=private_consumer_secret
ACCESS_TOKEN=private_access_token
ACCESS_TOKEN_SECRET=private_access_token_secret
```

### Testing

To run tests locally, start the Igbo API:

```
yarn start:docker
```

Then in another tab, run the tests:

```
yarn mocha
```

### Semantic Versioning and Commitlint

This project uses [Semantic Versioning](https://semver.org/) and 
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 
to keep the project version consistent with the state of features.