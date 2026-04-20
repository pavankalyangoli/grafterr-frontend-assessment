import { useEffect, useState } from "react";

export const useCarousel = (length) => {
    const [index, setIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) setItemsPerView(1);
            else if (window.innerWidth <= 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, length - itemsPerView);

    const next = () => {
        if (index < maxIndex) setIndex(index + 1);
    };

    const prev = () => {
        if (index > 0) setIndex(index - 1);
    };

    const minSwipeDistance = 50;
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) next();
        if (isRightSwipe) prev();
    };

    return { index, next, prev, itemsPerView, maxIndex, swipeHandlers: { onTouchStart, onTouchMove, onTouchEnd } };
};