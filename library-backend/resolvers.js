const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      const filter = {};

      if (author) {
        const foundAuthor = await Author.findOne({ name: author });

        if (!foundAuthor) return [];

        filter.author = foundAuthor._id;
      }

      if (genre) {
        filter.genres = genre;
      }

      return Book.find(filter).populate("author");
    },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },

  Mutation: {
    addBook: async (_root, args) => {
      const { author: name, ...rest } = args;

      try {
        let author = await Author.findOne({ name });

        if (!author) {
          author = new Author({ name });
          await author.save();
        }

        const book = new Book({ ...rest, author });
        return await book.save();
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    editAuthor: async (_root, { name, setBornTo }) => {
      try {
        const author = await Author.findOne({ name });

        if (!author) return null;

        author.born = setBornTo;
        return await author.save();
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
  },
};

module.exports = resolvers;
