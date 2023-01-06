import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ openModal, sendImages }) {
  const getURL = url => {
    openModal(url);
  };

  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem
        sendImages={sendImages}
        openModal={getURL}
      ></ImageGalleryItem>
    </ul>
  );
}
