import { useQuery } from "react-apollo";
import { oneMovieQuery } from "../../queries/queries";
import { FC, useMemo } from "react";

interface IProps {
  id: string | undefined;
}
const MovieInfoModal: FC<IProps> = ({ id }) => {
  const { data, loading } = useQuery(oneMovieQuery, {
    variables: {
      id,
    },
  });

  const movie = useMemo(() => data?.movie, [data]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2>{movie.name}</h2>
          <small>{movie.genre}</small>
          <hr />
          <div>
            <b>{movie.director.name}</b>
          </div>
        </>
      )}
    </>
  );
};

export default MovieInfoModal;
