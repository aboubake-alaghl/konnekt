import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '400px',
      },
      backgroundImage: {
        'hero-image': "url('/heroSectionBackground.webp')",
        'levels-image': "url('/levels.webp')",
        'contactUsFormSection-image': "url('/contactUsFormSection.webp')",
        'teamMemberFrame-image': "url('/teamMemberFrame.webp')",
        'planCard-image': "url('/planCard.webp')",
        'fileCard-image': "url('/fileCard.webp')",
        'AppPageHeroStripe-image': "url('/AppPage/appPageHeroStripe.webp')",
        'cards-hero-image': "url('/cards/heroCover.webp')",
      },
      colors: {
        primary: "#4CC8A6",
        textSecond: "#B3B3B3"
      },
      fontSize: {
        "xxs": '0.50rem'
      }
    },
  },
  plugins: [],
};
export default config;
