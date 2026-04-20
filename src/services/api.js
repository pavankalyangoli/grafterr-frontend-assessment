import data from "../data/content.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHeroContent = async () => {
    await delay(1200);
    return data.hero;
};

export const fetchFeaturesContent = async () => {
    await delay(1200);
    return data.features;
};