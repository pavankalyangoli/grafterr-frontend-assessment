
import FeaturesSection from "./components/sections/FeatureSection";
import HeroSection from "./components/sections/HeroSection";
import "./styles/global.css";
import "./styles/variables.css";

function App() {
  return (
    <main className="app-container">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}

export default App;