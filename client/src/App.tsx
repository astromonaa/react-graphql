import Modal from "./components/Modal/Modal";
import { useState } from "react";
import Movies from "./pages/Movies";
import CreateMovieModalContent from "./components/Movies/CreateMovieModalContent";
import CreateDirectorModalContent from "./components/Directors/CreateDirectorModalContent";
import Directors from "./pages/Directors";

function App() {
  const [isModal, setIsModal] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | undefined>()
  const [list, setList] = useState('movies')


  const openModal = () => {
    const modal = list === 'movies'
      ? <CreateMovieModalContent isModal={setIsModal}/>
      : <CreateDirectorModalContent isModal={setIsModal}/>
    setModalContent(modal)
    setIsModal(true)
  }

  return (
    <>
      <div className="switcher">
        <span onClick={() => setList('movies')}>Movies</span>
        <span onClick={() => setList('directors')}>Directors</span>
      </div>
      {
        list === 'movies'
          ? <Movies
            openModal={setIsModal}
            setModalContent={setModalContent}
          />
          : <Directors
            openModal={setIsModal}
            setModalContent={setModalContent}
          />
      }
      {
        isModal
        ? <Modal
            openModal={setIsModal}
            setModalContent={setModalContent}
          >
            {modalContent}
          </Modal>
        : ''
      }
      <div className="plus" onClick={openModal}>+</div>
    </>
  );
}

export default App;
