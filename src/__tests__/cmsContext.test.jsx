import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { CmsProvider, useCms } from '../context/CmsContext.jsx';

describe('CmsContext', () => {
  it('should provide default Avista brand and copy data', () => {
    const wrapper = ({ children }) => <CmsProvider>{children}</CmsProvider>;
    const { result } = renderHook(() => useCms(), { wrapper });

    expect(result.current.content.brand.name).toBe('CODEXX PLUS');
    expect(result.current.content.about.founder.name).toBe('Alexander Reid');
    expect(Array.isArray(result.current.content.services)).toBe(true);
    expect(Array.isArray(result.current.content.projects)).toBe(true);
  });
});
