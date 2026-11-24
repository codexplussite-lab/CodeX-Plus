import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CmsMasterEditor from '../admin/CmsMasterEditor';
import { DEFAULT_CMS_DATA } from '../context/CmsContext';

describe('CmsMasterEditor Component', () => {
  it('should render all 10 CMS section sub-tabs', () => {
    render(
      <CmsMasterEditor
        cmsData={DEFAULT_CMS_DATA}
        setCmsData={vi.fn()}
        onPublish={vi.fn()}
        publishing={false}
      />
    );

    expect(screen.getByText('Global Brand & Hubs')).toBeInTheDocument();
    expect(screen.getByText('Hero Main Section')).toBeInTheDocument();
    expect(screen.getByText('About & Philosophy')).toBeInTheDocument();
    expect(screen.getByText('Capabilities & Services')).toBeInTheDocument();
    expect(screen.getByText('Architects & Leads')).toBeInTheDocument();
    expect(screen.getByText('Investment Sprints')).toBeInTheDocument();
    expect(screen.getByText('Flagship Deployments')).toBeInTheDocument();
    expect(screen.getByText('Technical FAQs')).toBeInTheDocument();
    expect(screen.getByText('Client Feedback')).toBeInTheDocument();
    expect(screen.getByText('Compliance & Policies')).toBeInTheDocument();
  });

  it('should switch tabs and show section fields', () => {
    render(
      <CmsMasterEditor
        cmsData={DEFAULT_CMS_DATA}
        setCmsData={vi.fn()}
        onPublish={vi.fn()}
        publishing={false}
      />
    );

    const heroTab = screen.getByText('Hero Main Section');
    fireEvent.click(heroTab);

    expect(screen.getByText('Top Glowing Badge')).toBeInTheDocument();
    expect(screen.getByText('Title Line 1 (White)')).toBeInTheDocument();
  });

  it('should trigger onPublish when Save & Publish button is clicked', () => {
    const onPublish = vi.fn();
    render(
      <CmsMasterEditor
        cmsData={DEFAULT_CMS_DATA}
        setCmsData={vi.fn()}
        onPublish={onPublish}
        publishing={false}
      />
    );

    const publishButtons = screen.getAllByText(/Publish All Changes/i);
    fireEvent.click(publishButtons[0]);

    expect(onPublish).toHaveBeenCalled();
  });
});
