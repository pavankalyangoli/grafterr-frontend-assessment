export default function GradientButton({ children, onClick }) {
    return <button className="gradient-btn" onClick={onClick}>{children}</button>;
}