// app/components/Hero/Hero.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Everything You Need. Best Prices. One Place.',
    subtitle: 'Discover thousands of products across electronics, fashion, home & more — all at unbeatable prices with fast delivery.',
    image: '/images/hero-1.jpg',
    cta: { primary: 'Shop Now', secondary: 'Explore Categories' }
  },
  {
    id: 2,
    title: 'New Season, New Styles',
    subtitle: 'Fresh arrivals in fashion & accessories. Upgrade your wardrobe with the latest trends.',
    image: '/images/hero-2.jpg',
    cta: { primary: 'Shop Fashion', secondary: 'View Collections' }
  },
  {
    id: 3,
    title: 'Tech at Your Fingertips',
    subtitle: 'From smartphones to smart homes — find the latest gadgets at amazing prices.',
    image: '/images/hero-3.jpg',
    cta: { primary: 'Shop Electronics', secondary: 'See Deals' }
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured promotions"
    >
      <div className="hero__slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image */}
            <div className="hero__image-wrapper">
                <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                quality={85}
                sizes="100vw"
                className="hero__image"
                />
              <div className="hero__overlay" />
            </div>

            {/* Content */}
            <div className="hero__content container">
              <div className="hero__text">
                {index === 0 ? (
                <h1 className="hero__title">{slide.title}</h1>
                ) : (
                <h2 className="hero__title">{slide.title}</h2>
                )}
                <p className="hero__subtitle">{slide.subtitle}</p>
                <div className="hero__cta">
                  <Link href="/shop" className="hero__btn hero__btn--primary">
                    {slide.cta.primary}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/categories" className="hero__btn hero__btn--secondary">
                    {slide.cta.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className="hero__nav hero__nav--prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button 
        className="hero__nav hero__nav--next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero__dots" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero__dot ${index === currentSlide ? 'hero__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}