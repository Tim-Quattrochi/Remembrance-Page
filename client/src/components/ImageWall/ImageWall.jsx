import { Modal } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  family,
  meAndJerry,
  hopeProm,
  jerryLittle,
  jerryProm,
  krystleJerryMatt,
} from "../../assets";

import "./imageWall.css";

const ImageWall = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const photoRef = useRef(null);

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
    meAndJerry,
    krystleJerryMatt,
  ];

  return (
    <>
      <div className="image-grid">
        {images.map((image, index) => (
          <LazyLoadImage
            effect="blur"
            ref={photoRef}
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="image-item"
            onClick={() => handleClick(image, index)}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="modal-body">
          <Carousel
            interval={null}
            activeIndex={imageIndex}
            onSelect={(index) => setImageIndex(index)}
            className="carousel-container"
          >
            <Carousel.Item>
              <img
                className="image-item"
                src={hopeProm}
                alt="Jerry at prom"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="image-item"
                src={jerryProm}
                alt="Prom"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="image-item"
                src={jerryLittle}
                alt="Jerry when he was little"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img className="image-item" src={family} alt="family" />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="image-item"
                src={meAndJerry}
                alt="Tim and Jerry"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="image-item"
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
