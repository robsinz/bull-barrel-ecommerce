import { useState, useRef } from 'react';
import { ProductImage } from '../../shared/product.types';
import './ProductGallery.css';

interface PrdocutGalleryProps {
  images: ProductImage[];
}

function ProductGallery({ images }: PrdocutGalleryProps) {
  // State to track which image is currently selected
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.isDefault) || images[0]
  );

  // State for zoom functionality
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Reference to the main image container
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Handle thumbnail click
  const handleThubnailClick = (image: ProductImage) => {
    setSelectedImage(image);
  };

  // Handle mouse enter/leave for zoom
  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  // Handle mouse move for zoom positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();

      // Calculate relative position of the mouse in the container (0 to 1)
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Update moust psotion state
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="product-gallery">
      <div
        className={`main-image ${isZooming ? 'zooming' : ''}`}
        ref={imageContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          style={{
            transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
            transform: isZooming ? 'scale(1.5)' : 'scale(1)',
          }}
        />
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
