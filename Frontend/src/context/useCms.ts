import { useContext } from 'react';
import { CmsContext, type CmsContextValue } from './cmsStore';

export const useCms = (): CmsContextValue => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};

export default useCms;
