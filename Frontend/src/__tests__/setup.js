import '@testing-library/jest-dom';

// Polyfill window.scrollTo if not in JSDOM
if (typeof window !== 'undefined' && !window.scrollTo) {
  window.scrollTo = () => {};
}
