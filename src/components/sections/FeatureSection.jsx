import { useRef, useState } from "react";
import { useCarousel } from "../../hooks/useCarousel";
import { useContent } from "../../hooks/useContent";
import { fetchFeaturesContent } from "../../services/api";
import Carousel from "../ui/Carousel";
import FloatingShape from "../ui/FloatingShape";
import Skeleton from "../ui/Skeleton";

export default function FeaturesSection() {
    const { data, loading, error, retry } = useContent(fetchFeaturesContent);
    const { index, next, prev, itemsPerView, maxIndex, swipeHandlers } = useCarousel(data ? data.products.length : 0);
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;
            if (maxScrollLeft > 0) {
                setScrollProgress(scrollLeft / maxScrollLeft);
            }
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeftPos(scrollRef.current.scrollLeft);
        scrollRef.current.style.cursor = 'grabbing';
        scrollRef.current.style.scrollSnapType = 'none';
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
            scrollRef.current.style.scrollSnapType = 'x mandatory';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeftPos - walk;
    };
    if (loading) return (
        <section className="features">
            <Skeleton type="skeleton-title" />
            <div className="carousel-skeleton-wrapper">
                <Skeleton type="skeleton-card" />
                <Skeleton type="skeleton-card" />
                <Skeleton type="skeleton-card" />
            </div>
        </section>
    );
    if (error) return (
        <div className="error-container">
            <div className="error-card">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <h3 className="error-title">Oops! Something went wrong.</h3>
                <p className="error-text">We couldn't load the features at this moment. Please check your connection and try again.</p>
                <button className="gradient-btn retry-btn" onClick={retry}>
                    Try Again
                </button>
            </div>
        </div>
    );
    return (
        <section className="features">
            <div className="features-header-container">
                <FloatingShape type="teal-circle" style={{ top: '20px', left: '15%' }} />
                <FloatingShape type="coral-square" style={{ top: '40px', right: '15%' }} />

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                    className="text-carousel-container"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: isDragging ? 'auto' : 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        cursor: 'grab',
                        userSelect: 'none'
                    }}
                >
                    {data.textSlides && data.textSlides.map((slide, i) => (
                        <div
                            key={i}
                            className="text-slide"
                            style={{
                                flex: '0 0 100%',
                                minWidth: '100%',
                                scrollSnapAlign: 'center',
                                boxSizing: 'border-box',
                                padding: '0 20px',
                                pointerEvents: 'none'
                            }}
                        >
                            <h2 className="features-title">
                                {slide.title} <span className="features-accent">{slide.titleAccent}</span> {slide.titleSuffix}
                            </h2>
                            <p className="features-subtitle">{slide.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="divider-track">
                <div
                    className="divider-indicator"
                    style={{
                        left: `${scrollProgress * 80}%`,
                        transition: isDragging ? 'none' : 'left 0.1s ease-out'
                    }}
                ></div>
            </div>

            <div className="carousel-container">
                <Carousel
                    products={data.products}
                    index={index}
                    itemsPerView={itemsPerView}
                    swipeHandlers={swipeHandlers}
                />
            </div>

            <div className="carousel-controls">
                <button
                    className={`nav-btn ${index === 0 ? 'disabled' : ''}`}
                    onClick={prev}
                    disabled={index === 0}>←</button>
                <button
                    className={`nav-btn ${index >= maxIndex ? 'disabled' : ''}`}
                    onClick={next}
                    disabled={index >= maxIndex}>→</button>
            </div>
        </section>
    );
}