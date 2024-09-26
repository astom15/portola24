import LazyImage from "./LazyImage";
import './ImageGridStyle.css'
import { images } from "./stickerData.js";
import React from "react";


const generateRandomRotation = () => `${Math.random() * 70 - 35}deg`;
const generatePeachesRotation = () => `${Math.random() * 10 - 12}deg`;
const generateDaranyRotation = () => `${Math.random() * 12 + 8}deg`

const handleImageClick = (imageName: string) => {
  const gtag = (window as any).gtag as (...args: any[]) => void;
  gtag('event', 'click', {
    event_category: 'Image',
    event_label: imageName,
    value: 1
  })
}


const StickerGrid: React.FC = () => {
    const [shuffledImgs, setShuffledImgs] = React.useState(images);

    const shuffle = (imgs: typeof images) => {
        const shuffled = [...imgs];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }
    React.useEffect(() => {
        setShuffledImgs(shuffle(images))
    }, []);

    return (
      <div className="image-grid">
        {shuffledImgs.map((img) => {
          const rotation = generateRandomRotation();
          return (
            <a
              key={img.id}
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }}
              title="Instagram!"
              onClick={() => handleImageClick(img.name)}
            >
              <div
                className="image-wrapper"
                style={{
                  transform: img.name == "peaches" ? `rotate(${generatePeachesRotation()})`
                    : img.name == "darany" ? `rotate(${generateDaranyRotation()})`
                    : `rotate(${rotation})`,
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