import { ApolloServer, gql } from "apollo-server";

const colors = {
  yellow: '\x1b[33m%s\x1b[0m',
  red: "\x1b[31m%s\x1b[0m",
  blue: "\x1b[34m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
  pink: '\x1b[35m%s\x1b[0m',
  bgs: {
    white: "\x1b[47m%s\x1b[0m"
  }
  // crimson: "\x1b[38m%s\x1b[0m"
}

let books = [
  {
    id: "1",
    title: "First",
    author: "Author_1"
  },
  {
    id: "2",
    title: "Second",
    author: "Author_22"
  }
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Mutation {
    createBook(title: String!, author: String!): Book!
    updateBook(id: String!, title: String!, author: String!): Book!
    deleteBook(id: String!): Boolean!
    deleteAll: Boolean!
  }

  type Query {
    books: [Book!]!
  }
`;

type Resolver = (parent: any, args: any) => any;

let counts = {
  create: 1,
  deleteAll: 1,
  update: 1,
  delete: 1,
  getAll: 1
}
const resolvers: Record<string, Record<string, Resolver>> = {
  Mutation: {
    createBook: (_, { title, author }) => {
      console.log(colors.green, '__CREATE__ ', counts.create);
      counts.create++
      const book = { id: `${books.length + 1}`, title, author };

      books.push(book);

      return book;
    },
    updateBook: (_, book) => {
      console.log(colors.blue, '__UPDATE__ ', counts.update);
      counts.update++
      books = books.map(x => (x.id === book.id ? book : x));

      return book;
    },
    deleteBook: (_, { id }) => {
      console.log(colors.red, '__DELETE__ ', counts.delete);
      counts.delete++
      books = books.filter(x => x.id !== id);

      return true;
    },
    deleteAll: (_) => {
      console.log(colors.red, '__DELETE_ALL__ ', counts.deleteAll);
      counts.deleteAll++
      books = []
      return true
    }
  },
  Query: {
    books: () => {
      console.log(colors.pink, '__GET_ALL__ ', counts.getAll);
      counts.getAll++
      return books
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
