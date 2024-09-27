import LazyImage from "./LazyImage";
import './ImageGridStyle.css'
import { images } from "./imageData.js";
import React, { useRef } from "react";
import {handleImageClick} from './gtag'


const generateRandomRotation = () => Math.random() * 70 - 35;
const generatePeachesRotation = () => Math.random() * 10 - 12;
const generateDaranyRotation = () => Math.random() * 12 + 8;
const adjustRotation = (baseRotation: number) => {
  let minRotation: number;
  let maxRotation: number;
  if (baseRotation < 0) {
    minRotation = Math.max(-35, baseRotation + 20);
    maxRotation = 35;
  } else {
    minRotation = -35;
    maxRotation = Math.min(35, baseRotation - 20);
  }
  if (minRotation >= maxRotation) {
    minRotation = Math.max(-35, baseRotation - 70); 
    maxRotation = Math.min(35, baseRotation + 70); 
  }
  return Math.random() * (maxRotation - minRotation) + minRotation;
} 
const generateRotationByRow = (lastRotation: number, index: number) => {
  return (index == 0) ? generateRandomRotation() : adjustRotation(lastRotation);
}


// for images that are too askew or cover up other images in a certain range.
const switchRotation = (imgName: string, defaultRotation: number) => {
  switch (imgName) {
    case "peaches":
      return generatePeachesRotation();
    case "darany":
      return generateDaranyRotation();
    default:
      return defaultRotation;
  }
};

const StickerGrid: React.FC = () => {
  const [shuffledImgs, setShuffledImgs] = React.useState(images);
  const lastRotation = useRef(0);

  const shuffle = (imgs: typeof images) => {
    const shuffled = [...imgs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  React.useEffect(() => {
    setShuffledImgs(shuffle(images));
  }, []);

  const setRotation = (idx: number): number => {
    let modIdx = idx % 3;
    const rotation = generateRotationByRow(lastRotation.current, modIdx);
    if (modIdx == 0 || modIdx == 1) {
      lastRotation.current = rotation;
    }
    return rotation;
  };

  return (
    <div className="image-grid">
      {shuffledImgs.map((img, idx) => {
        const rotation = setRotation(idx)
        return (
          <a
            key={img.id}
            href={img.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block" }}
            title="Instagram!"
            onClick={(e) => {
              e.preventDefault();
              handleImageClick(img.name, img.href)
            }}
          >
            <div
              className="image-wrapper"
              style={{
                transform: `rotate(${switchRotation(img.name, rotation)}deg)`
              }}
            >
              <LazyImage lqip={img.lqip} src={img.src} alt={img.alt} />
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default StickerGrid;