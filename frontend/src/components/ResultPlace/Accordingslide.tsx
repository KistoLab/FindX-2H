"use client";

import React, { useState, useEffect } from "react";

interface CarSpec {
  label: string;
  value: string;
}

interface CarData {
  id: number;
  bg: string;
  brand: string;
  name: string;
  subtitle: string;
  specs: CarSpec[];
  badges: string[];
}

const carData: CarData[] = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    brand: "BMW M3",
    name: "BMW M3 Competition",
    subtitle: "Twin-Turbo Inline-6 Performance",
    specs: [
      { label: "Engine", value: "3.0L Twin-Turbo Inline-6" },
      { label: "Power", value: "503 HP @ 6,250 RPM" },
      { label: "Torque", value: "650 Nm @ 2,750 RPM" },
      { label: "Transmission", value: "8-Speed Automatic" }
    ],
    badges: ["0-100: 3.9s", "Top Speed: 290 km/h", "Price: $73,400"]
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    brand: "Lamborghini Huracán",
    name: "Lamborghini Huracán",
    subtitle: "Naturally Aspirated V10 Excellence",
    specs: [
      { label: "Engine", value: "5.2L V10 Naturally Aspirated" },
      { label: "Power", value: "610 HP @ 8,250 RPM" },
      { label: "Torque", value: "560 Nm @ 6,500 RPM" },
      { label: "Transmission", value: "7-Speed Dual-Clutch" }
    ],
    badges: ["0-100: 3.2s", "Top Speed: 325 km/h", "Price: $248,295"]
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    brand: "Ferrari SF90",
    name: "Ferrari SF90 Stradale",
    subtitle: "Plug-in Hybrid Revolution",
    specs: [
      { label: "Engine", value: "4.0L V8 Twin-Turbo + Electric" },
      { label: "Power", value: "1000 HP Combined" },
      { label: "Torque", value: "800 Nm @ 6,000 RPM" },
      { label: "Transmission", value: "8-Speed F1 DCT" }
    ],
    badges: ["0-100: 2.5s", "Top Speed: 340 km/h", "Price: $625,000"]
  },
  {
    id: 4,
    bg: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    brand: "Porsche 911",
    name: "Porsche 911 Turbo S",
    subtitle: "Twin-Turbo Flat-Six Perfection",
    specs: [
      { label: "Engine", value: "3.8L Twin-Turbo Flat-6" },
      { label: "Power", value: "640 HP @ 6,750 RPM" },
      { label: "Torque", value: "800 Nm @ 2,500 RPM" },
      { label: "Transmission", value: "8-Speed PDK" }
    ],
    badges: ["0-100: 2.7s", "Top Speed: 330 km/h", "Price: $207,000"]
  }
];

export default function AccordionSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const setActiveSlide = (index: number) => {
    if (currentIndex === index) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % carData.length;
    setActiveSlide(nextIndex);
  };

  const previousSlide = () => {
    const prevIndex = currentIndex === -1 ? carData.length - 1 : (currentIndex - 1 + carData.length) % carData.length;
    setActiveSlide(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #000;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .slider-container {
          width: 25vw;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          overflow: hidden;
        }

        .now-showing {
          position: absolute;
          top: 20px;
          left: 20px;
          color: #9fff6b;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        .now-showing::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #9fff6b;
          border-radius: 50%;
        }

        .accordion-slider {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
        }

        .slide {
          flex: 1;
          position: relative;
          cursor: pointer;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          filter: grayscale(1);
        }

        .slide:hover {
          filter: grayscale(0);
        }

        .slide.active {
          flex: 3;
          filter: grayscale(0);
        }

        .slide::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 80%);
        }

        .slide-content {
          position: absolute;
          bottom: 15px;
          left: 15px;
          right: 15px;
          color: white;
          z-index: 2;
        }

        .slide.active .slide-content {
          bottom: 40px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .slide-number {
          font-size: 32px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1;
          position: absolute;
          bottom: 15px;
          left: 15px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active .slide-number {
          bottom: auto;
          top: -30px;
          font-size: 24px;
          left: 0;
        }

        .car-brand {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 5px;
          transform: rotate(-90deg);
          transform-origin: left bottom;
          position: absolute;
          bottom: 80px;
          left: 15px;
          white-space: nowrap;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active .car-brand {
          transform: rotate(0deg);
          position: static;
          transform-origin: unset;
          font-size: 12px;
        }

        .car-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0s;
        }

        .slide.active .car-name {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }

        .car-subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 15px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0s;
        }

        .slide.active .car-subtitle {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        .car-specs {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0s;
        }

        .slide.active .car-specs {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 11px;
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active .spec-row {
          opacity: 1;
          transform: translateX(0);
        }

        .slide.active .spec-row:nth-child(1) {
          transition-delay: 0.6s;
        }
        .slide.active .spec-row:nth-child(2) {
          transition-delay: 0.65s;
        }
        .slide.active .spec-row:nth-child(3) {
          transition-delay: 0.7s;
        }
        .slide.active .spec-row:nth-child(4) {
          transition-delay: 0.75s;
        }

        .spec-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .spec-value {
          color: white;
          font-weight: 600;
        }

        .performance-badges {
          display: flex;
          gap: 12px;
          margin-top: 15px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0s;
        }

        .slide.active .performance-badges {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.8s;
        }

        .badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active .badge {
          opacity: 1;
          transform: scale(1);
        }

        .slide.active .badge:nth-child(1) {
          transition-delay: 0.85s;
        }
        .slide.active .badge:nth-child(2) {
          transition-delay: 0.9s;
        }
        .slide.active .badge:nth-child(3) {
          transition-delay: 0.95s;
        }

        .badge-icon {
          width: 8px;
          height: 8px;
          background: #9fff6b;
          border-radius: 50%;
        }

        .add-button {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 24px;
          height: 24px;
          background: transparent;
          border: 2px solid #9fff6b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          z-index: 3;
        }

        .add-button::before,
        .add-button::after {
          content: "";
          position: absolute;
          background: #9fff6b;
          transition: all 0.4s ease;
        }

        .add-button::before {
          width: 8px;
          height: 2px;
        }

        .add-button::after {
          width: 2px;
          height: 8px;
          transform: rotate(0deg);
        }

        .slide.active .add-button::before {
          transform: rotate(0deg);
        }

        .slide.active .add-button::after {
          opacity: 0;
          transform: scale(0);
        }

        .navigation-arrows {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 4;
          backdrop-filter: blur(10px);
        }

        .nav-prev {
          top: 20px;
        }

        .nav-next {
          bottom: 20px;
        }

        .navigation-arrows:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .accordion-slider {
            flex-direction: column;
          }

          .slide {
            flex: 1;
            min-height: 80px;
          }

          .slide.active {
            flex: 2;
          }

          .slide-number {
            font-size: 32px;
          }

          .car-brand {
            transform: none;
            position: static;
          }
        }
      `}</style>

      <div className="slider-container">
        <div className="now-showing">Now in Showroom</div>

        <div className="accordion-slider">
          {carData.map((car, index) => (
            <div
              key={car.id}
              className={`slide ${currentIndex === index ? "active" : ""}`}
              style={{ backgroundImage: `url(${car.bg})` }}
              onClick={() => setActiveSlide(index)}
            >
              <div className="slide-content">
                <div className="slide-number">{String(car.id).padStart(2, "0")}</div>
                <div className="car-brand">{car.brand}</div>
                <div className="car-name">{car.name}</div>
                <div className="car-subtitle">{car.subtitle}</div>
                <div className="car-specs">
                  {car.specs.map((spec, idx) => (
                    <div key={idx} className="spec-row">
                      <span className="spec-label">{spec.label}:</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="performance-badges">
                  {car.badges.map((badge, idx) => (
                    <div key={idx} className="badge">
                      <div className="badge-icon"></div>
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="add-button"></div>
            </div>
          ))}
        </div>

        <button className="navigation-arrows nav-prev" onClick={previousSlide}>
          ‹
        </button>
        <button className="navigation-arrows nav-next" onClick={nextSlide}>
          ›
        </button>
      </div>
    </>
  );
}