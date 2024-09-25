import  { useRef, useState, useEffect } from "react";
import './ImageGridStyle.css'
interface ImageProps {
  lqip: string;
  src: string;
  alt: string;
}

const LazyImage: React.FC<ImageProps> = ({lqip, src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const currImageRef = imageRef.current;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.35, 
    });

    if (currImageRef) {
      observer.observe(currImageRef);
    }

    return () => {
      if (currImageRef) {
        observer.unobserve(currImageRef);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={isVisible ? src : lqip}
      alt={alt}
        style={{
          filter: isVisible ? "none" : "blur(10px)",
          transition: "filter 0.5s ease-in-out",
          display: "block",
          cursor: "pointer"
        }}
      />
  );
};

export default LazyImage;
