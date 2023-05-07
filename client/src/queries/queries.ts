import {gql} from 'apollo-boost'

export const moviesQuery = gql`
  query moviesQuery {
    movies {
      id
      name
      genre
    }
  }

`

export const oneMovieQuery = gql`
  query oneMovieQuery($id: ID) {
    movie(id: $id) {
      name
      genre
      director {
        name
      }
    }
  }
`

export const directorsQuery = gql`
  query directorsQuery {
    directors {
      id
      name
    }
  }
`

export const oneDirectorQuery = gql`
  query oneDirectorQuery($id: ID) {
    director(id: $id) {
      name
      age
    }
  }
`


export const createMovieMutation = gql`
  mutation createMovieMutation($name: String!, $genre:String!, $directorId:ID) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      id
      name
      genre,
      director {
        id
        name
      }
    }
  }
`

export const deleteMovieMutation = gql`
  mutation deleteMovieMutation($id: ID) {
    deleteMovie(id: $id) {
      id
    }
  }
`

export const createDirectorMutation = gql`
  mutation createDirectorMutation ($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
      name
      age
    }
  }
`

export const deleteDirectorMutation = gql`
  mutation deleteDirectorMutation ($id: ID) {
    deleteDirector(id: $id) {
      id
    }
  }
`