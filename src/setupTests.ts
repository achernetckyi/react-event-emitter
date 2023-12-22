// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => ("fde2b853-4cf7-4b78-b240-59c229cdab45" + Math.random())
  }
});
