import { createGlobalStyle } from 'styled-components';

const FontStyles = createGlobalStyle`
  :root {
    --font-heading: 'Cormorant Garamond', serif;
    --font-body: 'Nunito Sans', sans-serif;
    --font-accent: 'Spectral', serif;
  }
`;

export default FontStyles;
