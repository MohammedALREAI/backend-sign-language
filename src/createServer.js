const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

const db = require("./db");

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
      SearchResult: {
        ____resolveType(obj) {
          if (obj) {
            if (obj.type === "Item") {
              return "Item";
            }
            if (obj.type === "Catogory") {
              return "Catogory";
            }
          }
        }
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
