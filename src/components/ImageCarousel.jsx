import { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Auto-slide on hover (desktop)
    useEffect(() => {
        if (!isHovered || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 1300); // Slide speed
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    // Swipe navigation (mobile)
    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) setCurrent((prev) => (prev + 1) % images.length);
        if (touchStart - touchEnd < -50) setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image Slider */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Product ${idx}`}
                        className="w-full flex-shrink-0 h-full object-cover"
                    />
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`h-2 w-2 rounded-full transition-all ${current === idx ? "bg-teal-500 w-3" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel
