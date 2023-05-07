import { FC, useRef } from "react";
import { useMutation } from "react-apollo";
import { createDirectorMutation, directorsQuery } from "../../queries/queries";

interface IProps {
  isModal: (bool: boolean) => void;
}

const CreateDirectorModalContent:FC<IProps> = ({isModal}) => {
  const name = useRef<HTMLInputElement>(null)
  const age = useRef<HTMLInputElement>(null)

  const [createDirector] = useMutation(createDirectorMutation, {
    refetchQueries: [
      {query: directorsQuery}
    ]
  })

  const onCreate = () => {
    createDirector({
      variables: {
        name: name?.current?.value,
        age: Number(age?.current?.value)
      }
    })
    isModal(false)
  }
  return (
    <div className="director-info-modal">
      <label htmlFor="name">Имя</label>
      <input type="text" id="name" ref={name}/>
      <label htmlFor="age">Возраст</label>
      <input type="number" id="age" ref={age} />
      <button onClick={onCreate}>Добавить</button>
    </div>
  );
};

export default CreateDirectorModalContent;