import { useState } from 'react';
import { ProductImage } from '../../shared/product.types';
import './ProductGallery.css';

interface PrdocutGalleryProps {
  images: ProductImage[];
}

function ProductGallery({ images }: PrdocutGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.isDefault) || images[0]
  );

  const handleThubnailClick = (image: ProductImage) => {
    setSelectedImage(image);
  };
  return (
    <div className="product-gallery">
      <div className="main-image">
        <img src={selectedImage.src} alt={selectedImage.alt} />
      </div>

      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((image) => (
            <div
              key={image.id}
              className={`thumbnail ${selectedImage.id === image.id ? 'active' : ''}`}
              onClick={() => handleThubnailClick(image)}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
