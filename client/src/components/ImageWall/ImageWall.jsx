import { useState } from "react";
import { Carousel } from "react-bootstrap";

import {
  family,
  meAndJerry,
  hopeProm,
  jerryLittle,
  jerryProm,
  krystleJerryMatt,
  jerryCowboy,
} from "../../assets";

import "./imageWall.css";

const ImageWall = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    hopeProm,
    jerryProm,
    jerryLittle,
    family,
    meAndJerry,
    krystleJerryMatt,
    jerryCowboy,
  ];

  return (
    <section className="image-wall-container">
      <Carousel
        activeIndex={imageIndex}
        onSelect={(index) => setImageIndex(index)}
        className="carousel-container"
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div id="aspect-ratio-16-9">
              <img
                src={image}
                alt={`family ${index + 1}`}
                className="d-block w-100"
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default ImageWall;
