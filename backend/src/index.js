const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const cookieParser = require("cookie-parser");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Mutation,
    Query
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db })
});

server.express.use(cookieParser());

// Decode JWT so we can get the user id on every request.
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto req for future requests
    req.userId = userId;
  }
  next();
});

// Populate user on each request
server.express.use(async (req, res, next) => {
  // if not logged in, skip this..
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: { id: req.userId }
    },
    "{ id, permissions, email, name }"
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    bodyParserOptions: { limit: "10mb", type: "application/json" }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
