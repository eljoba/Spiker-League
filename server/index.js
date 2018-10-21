const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
// const { GraphQLDate } = require("graphql-iso-date");

mongoose.connect("mongodb://localhost/test5");

const Todo = mongoose.model("Todo", {
  text: String,
  complete: Boolean
});

const Announcement = mongoose.model("Announcement", {
  text: String,
  date_posted: Date
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    todos:[Todo]
    announcement:[Announcement]
  }
  type Todo{
      id: ID!
      text: String!
      complete: Boolean!

  }
  type Announcement{
    id: ID!
    text: String!
    date_posted: String
}
  type Mutation{
      createTodo(text:String!): Todo
      updateTodo(id: ID!, complete: Boolean!) : Boolean
      removeTodo(id: ID!) : Boolean
      createAnnouncement(text:String!): Announcement
      updateAnnouncement(id: ID!, text:String!) : Boolean
      removeAnnouncement(id: ID!) : Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    todos: () => Todo.find(),
    announcement: () => Announcement.find()
  },
  Mutation: {
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, complete }) => {
      await Todo.findByIdAndUpdate(id, { complete });
      return true;
    },
    removeTodo: async (_, { id }) => {
      await Todo.findByIdAndRemove(id);
      return true;
    },
    createAnnouncement: async (_, { text }) => {
      const today_date = new Date();
      const announcement = new Announcement({
        text,
        date_posted: today_date
      });
      await announcement.save();
      return announcement;
    },
    updateAnnouncement: async (_, { id, text }) => {
      await Announcement.findByIdAndUpdate(id, { text });
      return true;
    },
    removeAnnouncement: async (_, { id }) => {
      await Announcement.findByIdAndRemove(id);
      return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
