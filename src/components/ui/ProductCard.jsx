export default function ProductCard({ title, image }) {
    return (
        <div className="product-card">
            <h3 className="product-title">{title}</h3>
            <div className="product-image-wrapper">
                <img src={image} alt={title} className="product-image" loading="lazy" />
            </div>
        </div>
    );
}