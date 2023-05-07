import { useQuery, useMutation } from "react-apollo";
import { moviesQuery, deleteMovieMutation } from "../queries/queries";
import { IMovie, IPageProps } from "../types/types";
import { FC } from "react";
import MovieInfoModal from "../components/Movies/MovieInfoModal";

const Movies: FC<IPageProps> = ({ openModal, setModalContent }) => {
  const { data: movies, loading } = useQuery(moviesQuery);
  const [deleteMovie] = useMutation(deleteMovieMutation, {
    refetchQueries: [
      {query: moviesQuery}
    ]
  })

  const onShow = (movie:IMovie) => {
    openModal(true)
    setModalContent(
      <MovieInfoModal id={movie.id}/>
    )
  }
  const onDelete = (event:React.MouseEvent<HTMLSpanElement>, movie:IMovie) => {
    event.stopPropagation()
    deleteMovie({variables: {id: movie.id}})
  }

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <ul>
      {movies.movies.map((movie: IMovie) => (
        <li className="list-item" key={movie.id} onClick={() => onShow(movie)}>
          <div>
            <div>{movie.name}</div>
            <small>{movie.genre}</small>
          </div>
          <span onClick={event => onDelete(event, movie)}>&#10006;</span>
        </li>
      ))}
    </ul>
  );
};

export default Movies;
