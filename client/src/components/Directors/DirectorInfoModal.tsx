import { FC, useMemo } from "react";
import { useQuery } from "react-apollo";
import { oneDirectorQuery } from "../../queries/queries";

interface IProps {
  id: string | undefined;
}

const DirectorInfoModal: FC<IProps> = ({ id }) => {
  const { data, loading } = useQuery(oneDirectorQuery, {
    variables: { id },
  });

  const director = useMemo(() => data?.director, [data]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="director-info-modal">
      <label htmlFor="name">Имя:</label>
      <span id="name">{director.name}</span>
      <label htmlFor="age">Возраст:</label>
      <span id="age">{director.age}</span>
    </div>
  );
};

export default DirectorInfoModal;
