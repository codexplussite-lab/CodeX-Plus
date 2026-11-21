import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock HTMLCanvasElement.getContext for 2D and WebGL rendering in JSDOM
HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(function (
  this: HTMLCanvasElement,
  contextId: string
) {
  if (contextId === '2d') {
    return {
      canvas: this,
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
    };
  }
  if (contextId === 'webgl' || contextId === 'experimental-webgl' || contextId === 'webgl2') {
    return {
      canvas: this,
      viewport: vi.fn(),
      clearColor: vi.fn(),
      clear: vi.fn(),
      enable: vi.fn(),
      disable: vi.fn(),
      blendFunc: vi.fn(),
      createBuffer: vi.fn(() => ({})),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      createShader: vi.fn(() => ({})),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn(() => true),
      createProgram: vi.fn(() => ({})),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      createVertexArray: vi.fn(() => ({})),
      bindVertexArray: vi.fn(),
      deleteVertexArray: vi.fn(),
      getActiveUniform: vi.fn(() => ({ name: 'uTime', size: 1, type: 35665 })),
      getActiveAttrib: vi.fn(() => ({ name: 'position', size: 1, type: 35665 })),
      getProgramParameter: vi.fn((_prog, param) => {
        // Return 0 for ACTIVE_UNIFORMS (0x8B86 = 35718) and ACTIVE_ATTRIBUTES (0x8B89 = 35721)
        if (param === 35718 || param === 35721) return 0;
        return true;
      }),
      useProgram: vi.fn(),
      getAttribLocation: vi.fn(() => 0),
      bindAttribLocation: vi.fn(),
      enableVertexAttribArray: vi.fn(),
      disableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      getShaderInfoLog: vi.fn(() => ''),
      getProgramInfoLog: vi.fn(() => ''),
      getUniformLocation: vi.fn(() => ({})),
      uniform1f: vi.fn(),
      uniform2f: vi.fn(),
      uniform3f: vi.fn(),
      uniform4f: vi.fn(),
      uniform1i: vi.fn(),
      drawArrays: vi.fn(),
      drawElements: vi.fn(),
      getParameter: vi.fn(() => 0),
      getExtension: vi.fn(() => null),
      pixelStorei: vi.fn(),
      createFramebuffer: vi.fn(() => ({})),
      bindFramebuffer: vi.fn(),
      framebufferTexture2D: vi.fn(),
      checkFramebufferStatus: vi.fn(() => 36053),
      deleteFramebuffer: vi.fn(),
      createRenderbuffer: vi.fn(() => ({})),
      bindRenderbuffer: vi.fn(),
      renderbufferStorage: vi.fn(),
      framebufferRenderbuffer: vi.fn(),
      deleteRenderbuffer: vi.fn(),
      createTexture: vi.fn(() => ({})),
      bindTexture: vi.fn(),
      texParameteri: vi.fn(),
      texImage2D: vi.fn(),
      generateMipmap: vi.fn(),
      deleteTexture: vi.fn(),
      deleteBuffer: vi.fn(),
      deleteShader: vi.fn(),
      deleteProgram: vi.fn(),
      activeTexture: vi.fn(),
      cullFace: vi.fn(),
      depthFunc: vi.fn(),
      depthMask: vi.fn(),
    };
  }
  return null;
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Clean localStorage before each test
beforeEach(() => {
  localStorage.clear();
});
