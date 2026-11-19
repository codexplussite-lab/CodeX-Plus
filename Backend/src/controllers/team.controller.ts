import { Request, Response } from 'express';

const TEAM_MEMBERS = [
  {
    id: 'aiden-mercer',
    name: 'Aiden Mercer',
    role: 'Creative Director & Founder',
    specialty: 'Brand Architecture & Dark Luxury UI',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    location: 'Zurich Hub',
  },
  {
    id: 'sophia-lindqvist',
    name: 'Sophia Lindqvist',
    role: 'Lead AI Architect',
    specialty: 'Enterprise LLM & Agentic Workflows',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    location: 'San Francisco',
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Principal Product Designer',
    specialty: 'Design Systems & Motion Tokens',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    location: 'London Hub',
  },
  {
    id: 'alexander-reid',
    name: 'Alexander Reid',
    role: 'Founder & Managing Partner',
    specialty: 'Executive Strategy & Capital Advisory',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    location: 'San Francisco',
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Head of Engineering',
    specialty: 'Full-Stack Edge Infrastructure',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
    location: 'Zurich Hub',
  },
  {
    id: 'zara-al-mansoor',
    name: 'Zara Al-Mansoor',
    role: 'Motion & 3D Lead',
    specialty: 'WebGL Shaders & Spatial Interfaces',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80',
    location: 'Dubai Hub',
  },
  {
    id: 'kai-takahashi',
    name: 'Kai Takahashi',
    role: 'Lead Cloud Architect',
    specialty: 'Distributed Infrastructure & SOC2',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    location: 'San Francisco',
  },
  {
    id: 'liam-chen',
    name: 'Liam Chen',
    role: 'Systems Security Lead',
    specialty: 'Deterministic Security & Threat Modeling',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    location: 'London Hub',
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    role: 'Head of Brand Strategy',
    specialty: 'Narrative Positioning & Omnichannel Growth',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    location: 'San Francisco',
  },
  {
    id: 'david-keller',
    name: 'David Keller',
    role: 'Principal AI Systems Engineer',
    specialty: 'Fine-Tuning & Vector Retrieval',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    location: 'Zurich Hub',
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Head of Product Strategy',
    specialty: 'Roadmap Execution & KPI Architecture',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80',
    location: 'London Hub',
  },
  {
    id: 'lucas-silva',
    name: 'Lucas Silva',
    role: 'Senior WebGL & 3D Engineer',
    specialty: 'Three.js, OGL & Performance Shaders',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
    location: 'San Francisco',
  },
];

export const getTeamMembers = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: TEAM_MEMBERS.length,
    data: TEAM_MEMBERS,
  });
};

export const getTeamMemberById = (req: Request, res: Response): void => {
  const member = TEAM_MEMBERS.find((m) => m.id === req.params.id);
  if (!member) {
    res.status(404).json({
      success: false,
      message: `Team member with ID '${req.params.id}' not found`,
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: member,
  });
};
