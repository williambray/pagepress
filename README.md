# PagePress 📃 ⚛️
JavaScript WordPress clone by William Bray
___
## 📚 The Stack

### Frontend:

- ⚛️ [React](https://reactjs.org/) - Frontend Javascript Library of choice. - Component based to keep rendering lightweight and quick when using the app.

- 🌠 [React-Apollo](https://github.com/apollographql/react-apollo) for interfacing with Apollo Client

- 💅🏻 [Styled-Components](https://www.styled-components.com/) to make styling a breeze.

- 🚀 [Apollo Client](https://www.apollographql.com/) - Performing GraphQL Mutations - Fetching GraphQL Queries - Caching GraphQL Data - Managing Local State - Error and Loading UI States - Apollo replaces the need for Redux + Data fetching & caching libraries

### Backend:

- 🧘🏻‍♀️ [GraphQL Yoga](https://github.com/prisma/graphql-yoga) - Implementing Query and Mutation Resolvers - Custom server side logic - Performing JWT Authentication - Permission checking

- 🌈 [Prisma](https://www.prisma.io/) - Provides set of GraphQL CRUD APIs for MySQL database. - Schema Definition - Data Relationships - Queried directly from yoga server - Self-hosted or as-a-service.

---

## 🚀 Getting started with PagePress Development

There are a few prerequisite required to create a development environment and without them you'll struggle:

- Git - Required for source control
- Node
- NPM / Yarn - Personal Choice of package manager for installing and running modules
- GraphQL - Query Language CLI tools
- Docker - Running the development instance

Once you have all the required prerequisites installed on your machine grab a copy of the most recent version of PagePress

```
 $ git clone https://github.com/search4local-ltd/PagePress
 $ cd PagePress
```

Once we have a local clone of the repository for development we need to install our node packages locally to ensure everything works as required.

```
 $ cd frontend
 $ npm install

 ### Allow npm to install frontend packages...

 $ cd ../backend
 $ npm install

```

### 🧮 Backend Environment Variables

Before we can start up our development server we will need to create a `variables.env` file within `/backend` and insert our environment variables.

```
 $ cd backend
 $ touch variables.env
 $ nano variables.env
```

We can just copy and paste these values into our `variables.env` file:

```
FRONTEND_URL="http://localhost"
PRISMA_ENDPOINT="http://prisma:5577"
PRISMA_SECRET="a1s2d3f4g5h6j7k8l9"
APP_SECRET="jwtsecret123"
PORT=4466
```

Save the file and exit nano.

### 🏃🏻‍♂️ Composing and starting the environment

Before we can launch our services we need to set up the `.env` file for the whole application. This currently contains our MySQL variables for our database. In the root directory of the app, create a `.env` file and for the development environment, paste the following:
```
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASS=prisma
```
These values are used by the `docker-compose.prod.yml` and `docker-compose.dev.yml` files to connect to the database.

NOTE: LIVE DATABASE VALUES ARE A SECRET AND SHOULD NOT BE PASSED OUT OR HARDCODED.

```
 $ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Tip: Might be a good idea to create an alias for this command so you don't have to run it all the time! For example:

```
 alias PagePressdev='printf "\n>>> Composing PagePress DEV environment\n\n" && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up'
```

If this is your first time launching the services you will need to wait until the services are up and then run `prisma deploy` in your `backend` directory. This will upload the schema to the mysql endpoint.

Your local development server will now be up and running at: `http://localhost` and if needed the port is: `8080`

That's it! We will now be able to start dev'ing away to our hearts content on PagePress.

Happy Developing! 🤟🏻 🚀 💻