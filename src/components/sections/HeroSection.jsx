import { useContent } from "../../hooks/useContent";
import { fetchHeroContent } from "../../services/api";
import FloatingShape from "../ui/FloatingShape";
import GradientButton from "../ui/GradientButton";
import GradientText from "../ui/GradientText";
import Skeleton from "../ui/Skeleton";

export default function HeroSection() {
    const { data, loading, error, retry } = useContent(fetchHeroContent);

    if (loading) return (
        <section className="hero">
            <Skeleton type="skeleton-title" />
            <Skeleton type="skeleton-text" />
            <Skeleton type="skeleton-btn" />
        </section>
    );
    if (error) return <div className="error-state"><p>Error loading hero content.</p><button onClick={retry}>Retry</button></div>;

    return (
        <section className="hero">
            {data.shapes.map((shape, i) => (
                <FloatingShape key={i} type={shape.type} style={{ top: shape.top, left: shape.left, right: shape.right }} />
            ))}
            <h1 className="hero-headline">
                {data.headlinePrefix} <br />
                <GradientText>{data.headlineGradient}</GradientText>
            </h1>
            <p className="hero-subheadline">
                {data.subheadlineStart}
                <span className="bold-black">{data.subheadlineHighlight}</span>
                {data.subheadlineEnd}
            </p>
            <GradientButton>{data.cta}</GradientButton>
        </section>
    );
}