import { Request, Response } from 'express';

const TEAM_MEMBERS = [
  {
    id: 'arnold-vain',
    name: 'Arnold Vain',
    role: 'Founder & CEO',
    specialty: 'Studio Vision & Creative Strategy',
    location: 'Los Angeles, CA',
  },
  {
    id: 'alexander-reid',
    name: 'Alexander Reid',
    role: 'Founder & Managing Partner',
    specialty: 'Executive Strategy & Partner Relations',
    location: 'Los Angeles / SF',
  },
  {
    id: 'trina-alfard',
    name: 'Trina Alfard',
    role: 'Lead UI/UX Designer',
    specialty: 'Product Systems & Interface Choreography',
    location: 'Los Angeles, CA',
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    role: 'Creative Director',
    specialty: 'Brand Identity & Visual Storytelling',
    location: 'Los Angeles, CA',
  },
  {
    id: 'noah-williams',
    name: 'Noah Williams',
    role: 'Front-end Engineer',
    specialty: 'React, GSAP & Creative Motion Code',
    location: 'Los Angeles, CA',
  },
  {
    id: 'emily-johnson',
    name: 'Emily Johnson',
    role: 'Brand Strategist',
    specialty: 'Market Positioning & Narrative Architecture',
    location: 'Los Angeles, CA',
  },
  {
    id: 'sophia-martinez',
    name: 'Sophia Martinez',
    role: 'Motion Designer',
    specialty: '3D Spatial Shaders & Micro-Animations',
    location: 'Los Angeles, CA',
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Product Designer',
    specialty: 'Design Systems & App Prototyping',
    location: 'Los Angeles, CA',
  },
  {
    id: 'ava-thompson',
    name: 'Ava Thompson',
    role: 'Marketing Lead',
    specialty: 'Omnichannel Growth & Performance Distribution',
    location: 'Los Angeles, CA',
  },
];

export const getTeamMembers = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: TEAM_MEMBERS.length,
    data: TEAM_MEMBERS,
  });
};

export const getTeam = getTeamMembers;

export const getTeamMemberById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const member = TEAM_MEMBERS.find(m => m.id.toLowerCase() === id.toLowerCase());

  if (!member) {
    res.status(404).json({
      success: false,
      message: `Team member '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: member,
  });
};
