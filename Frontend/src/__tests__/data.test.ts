import { describe, it, expect } from 'vitest';
import { ALL_TEAM_MEMBERS } from '../data/teamData';
import { SERVICES } from '../data/siteData';
import { DEFAULT_CMS_DATA } from '../context/cmsStore';

describe('Data Integrity & Schemas', () => {
  it('should have valid team members with all required attributes', () => {
    expect(ALL_TEAM_MEMBERS.length).toBeGreaterThanOrEqual(12);

    for (const member of ALL_TEAM_MEMBERS) {
      expect(member.id).toBeTruthy();
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.image).toMatch(/^https?:\/\//);
      expect(member.specialty).toBeTruthy();
    }
  });

  it('should contain flagship member Amara Okafor', () => {
    const amara = ALL_TEAM_MEMBERS.find((m) => m.id === 'amara-okafor');
    expect(amara).toBeDefined();
    expect(amara?.name).toBe('Amara Okafor');
    expect(amara?.role).toBe('Head of Product Strategy');
    expect(amara?.specialty).toContain('Roadmap Execution');
  });

  it('should have valid services configuration', () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(4);
    for (const service of SERVICES) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.tag).toBeTruthy();
    }
  });

  it('should have complete DEFAULT_CMS_DATA structure for all pages', () => {
    expect(DEFAULT_CMS_DATA.hero).toBeDefined();
    expect(DEFAULT_CMS_DATA.hero.headline).toBeTruthy();
    expect(DEFAULT_CMS_DATA.about).toBeDefined();
    expect(DEFAULT_CMS_DATA.services.length).toBeGreaterThan(0);
    expect(DEFAULT_CMS_DATA.team.length).toBeGreaterThan(0);
    expect(DEFAULT_CMS_DATA.testimonials.length).toBeGreaterThan(0);
    expect(DEFAULT_CMS_DATA.contact.email).toBeTruthy();
  });
});
