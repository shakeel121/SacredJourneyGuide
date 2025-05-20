import { useState, useEffect, useCallback, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  height?: string;
  overlay?: boolean;
  overlayContent?: ReactNode;
}

export function ImageSlider({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className,
  height = "h-80",
  overlay = false,
  overlayContent,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  useEffect(() => {
    if (autoPlay && !isHovering) {
      const slideInterval = setInterval(() => {
        nextSlide();
      }, interval);

      return () => clearInterval(slideInterval);
    }
  }, [autoPlay, interval, nextSlide, isHovering]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", height, className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-full relative flex-shrink-0"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="text-sm md:text-base">{image.caption}</p>
              </div>
            )}
            {overlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/20 flex items-center justify-center">
                {overlayContent}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 dark:bg-black/40 dark:hover:bg-black/60 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6 text-white drop-shadow-md" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 dark:bg-black/40 dark:hover:bg-black/60 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6 text-white drop-shadow-md" />
          </Button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}