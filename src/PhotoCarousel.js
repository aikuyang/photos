import React, { useEffect, useState, useRef } from "react";
import { MdEmail } from "react-icons/md";
import "./PhotoCarousel.scss";

// 自動載入所有 WebP 圖片
const importAll = (r) => r.keys().map(r);
const images = importAll(
    require.context("./assets/images", false, /\.webp$/)
);

export default function PhotoCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeTransition, setFadeTransition] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const autoPlayRef = useRef();
    const thumbnailRefs = useRef([]);

    const nextImage = () => {
        triggerFade(() => setActiveIndex((prev) => (prev + 1) % images.length));
    };

    const prevImage = () => {
        triggerFade(() =>
            setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        );
    };

    const triggerFade = (callback) => {
        callback();                // 先換圖
        setTimeout(() => {
            setFadeTransition(true);
        }, 300);
    };

    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        autoPlayRef.current = setInterval(nextImage, 10000);
        return () => clearInterval(autoPlayRef.current);
    }, []);

    useEffect(() => {
        const currentThumb = thumbnailRefs.current[activeIndex];
        if (currentThumb) {
            currentThumb.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [activeIndex]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipeGesture();
    };

    const handleSwipeGesture = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (Math.abs(distance) > 50) {
            distance > 0 ? nextImage() : prevImage();
        }
    };
    const mouseDownX = useRef(null);
    const mouseUpX = useRef(null);

    const handleMouseDown = (e) => {
        mouseDownX.current = e.clientX;
    };

    const handleMouseUp = (e) => {
        mouseUpX.current = e.clientX;
        handleMouseSwipe();
    };

    const handleMouseSwipe = () => {
        if (mouseDownX.current == null || mouseUpX.current == null) return;
        const distance = mouseDownX.current - mouseUpX.current;
        if (Math.abs(distance) > 50) {
            distance > 0 ? nextImage() : prevImage();
        }
    };
    return (
        <div
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="carousel-background">
                <img
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt="main"
                />
                <div className="overlay" />
            </div>

            <div className="social-panel">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();

                        const pieces = ["YWl", "rdX", "lhbm", "dAZ2", "1haWw", "uY29t"];
                        const encoded = pieces.join("");
                        const email = atob(encoded);
                        window.location.href = "mailto:" + email;
                    }}
                >
                    <MdEmail /> CONTACT
                </a>
            </div>

            <div className="thumbnail-container">
                {images.map((img, index) => (
                    <img
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        src={img}
                        alt={`thumb-${index}`}
                        className={`thumbnail ${activeIndex === index ? "active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}