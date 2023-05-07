import { useQuery, useMutation } from "react-apollo";
import { directorsQuery, createMovieMutation, moviesQuery } from "../../queries/queries";
import {FC, useEffect, useMemo, useRef, useState } from "react";
import { IDirector } from "../../types/types";

interface IProps {
  isModal: (bool: boolean) => void;
}

const CreateMovieModalContent:FC<IProps> = ({isModal}) => {
  const {data} = useQuery(directorsQuery)
  const [addMovie] = useMutation(createMovieMutation, {
    refetchQueries: [
      {query: moviesQuery}
    ]
  })

  const [selectedDirector, setSelectedDirector] = useState<string>()
  const name = useRef<HTMLInputElement>(null)
  const genre = useRef<HTMLInputElement>(null)

  const directors = useMemo(() => {
    return data?.directors
  }, [data])

  useEffect(() => {setSelectedDirector(data?.directors[0]?.id)}, [data])

  const onSelect = (event:React.ChangeEvent<HTMLSelectElement>) =>  {
    setSelectedDirector(event.target.value)
  }

  const onAddMovie = (event:React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    addMovie({
      variables: {
        directorId: selectedDirector,
        name: name.current?.value,
        genre: genre.current?.value
      }
    })
    isModal(false)
  }

  return (
    <form className="form" onSubmit={onAddMovie}>
      <label htmlFor="name">Название</label>
      <input type="text" id="name" required ref={name}/>
      <label htmlFor="genre">Жанр</label>
      <input type="text" id="genre" required pattern="[\S].{1,20}" ref={genre}/>
      <select name="directors" onChange={onSelect}>
        {
          directors?.map((director:IDirector) =>
            <option
              value={director.id}
              key={director.id}
            >{director.name}</option>
          )
        }
      </select>
      <button>Добавить</button>
    </form>
  );
};

export default CreateMovieModalContent;