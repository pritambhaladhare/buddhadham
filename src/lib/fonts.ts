import { createGlobalStyle } from 'styled-components';

const FontStyles = createGlobalStyle`
  :root {
    --font-heading: 'Noto Serif', serif;
    --font-body: 'Proza Libre', sans-serif;
    --font-accent: 'Spectral', serif;
  }
`;

export default FontStyles;
