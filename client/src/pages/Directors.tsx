import { useMutation, useQuery } from "react-apollo";
import { deleteDirectorMutation, directorsQuery } from "../queries/queries";
import { FC, useMemo } from "react";
import { IDirector, IPageProps } from "../types/types";
import DirectorInfoModal from "../components/Directors/DirectorInfoModal";


const Directors:FC<IPageProps> = ({openModal, setModalContent}) => {
  const {data, loading} = useQuery(directorsQuery)
  const [deleteDirector] = useMutation(deleteDirectorMutation, {
    refetchQueries: [
      {query: directorsQuery}
    ]
  })

  const directors = useMemo(() => data?.directors, [data])

  const onShow = (id:string) => {
    openModal(true)
    setModalContent(<DirectorInfoModal id={id}/>)
  }

  const onDelete = (event:React.MouseEvent<HTMLSpanElement>, id:string) => {
    event.stopPropagation()
    deleteDirector({
      variables: {id}
    })
  }

  return loading
   ? <h3>Loading...</h3>
   : (
    <ul>
      {
        directors?.map((director:IDirector) =>
        
        <li
          key={director.id}
          className="director-item"
          onClick={() => onShow(director.id)}
        >
          <span>{director.name}</span>
          <span onClick={event => onDelete(event, director.id)}>&#10006;</span>
        </li>)
      }
    </ul>
  );
};

export default Directors;