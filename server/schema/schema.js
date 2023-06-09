const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const Movies = require('../models/movie')
const Directors = require('../models/director')

const MovieType = new GraphQLObjectType({
  name: 'movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve (parent, args) {
        return Directors.findById(parent.directorId)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return Movies.find({ directorId: parent.id })
      }
    }
  })
})

// --------------------------------Query--------------------------

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(m => m.id == args.id)
        return Movies.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(d => d.id == args.id)
        return Directors.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        // return movies
        return Movies.find()
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        // return directors
        return Directors.find()
      }
    }
  })
})

// -----------------------------Mutations--------------------------------------

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age
        })
        return director.save()
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId
        })
        return movie.save()
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findByIdAndDelete(args.id)
      }
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findByIdAndDelete(args.id)
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return Directors.findByIdAndUpdate(args.id, {
          name: args.name, age: args.age
        }, {new: true})
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return MovieType.findByIdAndUpdate(args.id, {
          name: args.name,
          genre: args.genre,
          directorId: args.directorId
        }, {new: true})
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})