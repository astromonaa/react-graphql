interface IDirector2 {
  name: string;
}

export interface IMovie {
  id: string;
  name: string;
  genre: string;
  director: IDirector2;
}

export interface IDirector {
  id: string;
  name: string
}

export interface IPageProps {
  openModal: (bool: boolean) => void;
  setModalContent: (component:React.ReactChild | null) => void;
}