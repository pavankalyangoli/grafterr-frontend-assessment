
import ProductCard from "./ProductCard";

export default function Carousel({ products, index, itemsPerView, swipeHandlers }) {
    const trackWidth = (products.length / itemsPerView) * 100;

    const translateAmount = index * (100 / products.length);

    return (
        <div className="carousel-wrapper" {...swipeHandlers} style={{ overflow: 'hidden', touchAction: 'pan-y' }}>
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(-${translateAmount}%)`,
                    width: `${trackWidth}%`,
                    display: 'flex',
                    transition: 'transform 0.3s ease-in-out', 
                    willChange: 'transform'
                }}
            >
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-slide"
                        style={{
                            width: `${100 / products.length}%`, 
                            boxSizing: 'border-box',
                            padding: '0 15px'
                        }}
                    >
                        <ProductCard title={item.title} image={item.image} />
                    </div>
                ))}
            </div>
        </div>
    );
}