import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Carousel } from "react-bootstrap";

import hopeProm from "../../assets/jerrysPhotos/hopeProm.jpeg";
import jerryProm from "../../assets/jerrysPhotos/jerryProm.jpeg";
import jerryLittle from "../../assets/jerrysPhotos/jerryLittle.jpg";
import family from "../../assets/jerrysPhotos/family.jpg";
import meAndJErry from "../../assets/jerrysPhotos/meAndJErry.JPG";
import krystleJerryMatt from "../../assets/jerrysPhotos/krystleJerryMatt.jpeg";
import "./imageWall.css";

const ImageWall = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = (image, index) => {
    setSelectedImage(image);
    setImageIndex(index);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const images = [
    hopeProm,
    jerryProm,
    jerryLittle,
    family,
    meAndJErry,
    krystleJerryMatt,
  ];

  return (
    <>
      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            onClick={() => handleClick(image, index)}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="modal-body">
          <Carousel
            activeIndex={imageIndex}
            onSelect={(index) => setImageIndex(index)}
          >
            <Carousel.Item>
              <img src={hopeProm} alt="Jerry at prom" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={jerryProm} alt="Prom" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={jerryLittle} alt="Jerry when he was little" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={family} alt="family" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={meAndJErry} alt="Tim and Jerry" />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={krystleJerryMatt}
                alt="Krystle, Matt, and Jerry"
              />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageWall;
