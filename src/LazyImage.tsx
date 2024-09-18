import  { useRef, useState, useEffect } from "react";

interface ImageProps {
  lqip: string;
  src: string;
  alt: string;
  href: string;
}

const LazyImage: React.FC<ImageProps> = ({ lqip, src, alt, href }) => {
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
      threshold: 0.1, // Trigger when 10% of the image is visible
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block" }}
      title="Instagram!"
    >
      <img
        ref={imageRef}
        src={isVisible ? src : lqip}
        alt={alt}
        style={{
          filter: isVisible ? "none" : "blur(10px)",
          transition: "filter 0.5s ease-in-out",
          display: "block",
        }}
      />
    </a>
  );
};

export default LazyImage;
