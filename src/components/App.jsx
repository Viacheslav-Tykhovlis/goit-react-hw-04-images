import { Children, useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from './API/API';

export function App() {
  const [textInput, setTextInput] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    if (textInput === '') {
      return;
    }

    setLoading(true);
    getImages(textInput, page)
      .then(({ data }) => {
        setCurrentImages(prevPictures => [...prevPictures, ...data.hits]);
        setShowLoadMore(page < Math.ceil(data.totalHits / 12));
      })
      .finally(() => setLoading(false));
  }, [textInput, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = searchText => {
    setPage(1);
    setCurrentImages([]);
    setTextInput(searchText);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const openModal = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {!currentImages.length > 0 && !loading && (
        <div className="request">Enter a request...</div>
      )}

      <ImageGallery sendImages={currentImages} openModal={openModal}>
        {Children}
      </ImageGallery>

      {loading && <Loader />}
      {currentImages.length > 11 && showLoadMore && (
        <Button loadMore={loadMore}></Button>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </div>
  );
}
