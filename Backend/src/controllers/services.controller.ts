import { Request, Response } from 'express';

const SERVICES = [
  {
    id: 'development',
    title: 'Full-Stack Web Development & Apps',
    tag: 'React / Next.js',
    description:
      'Fast, accessible sites and web apps built in React and modern CMS stacks, designed and engineered by the same team.',
    tier: 'Engineering & Code',
    tags: ['React / Next.js', 'CMS', 'Performance'],
  },
  {
    id: 'branding-identity',
    title: 'Branding & Visual Identity',
    tag: 'Visual Identity',
    description:
      'We define who you are and how you are seen: logos, colour, type and the guidelines that keep every touchpoint consistent.',
    tier: 'Brand Strategy',
    tags: ['Logo design', 'Visual identity', 'Motion design'],
  },
  {
    id: 'application-design',
    title: 'Application Design & Prototyping',
    tag: 'Product UX',
    description:
      'Product design for mobile and desktop apps: flows, prototypes and design systems that developers can build from.',
    tier: 'Product Architecture',
    tags: ['Prototyping', 'Design systems', 'Mobile'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Research & Usability',
    tag: 'User Research',
    description:
      'Research-led interfaces that make complicated things feel obvious. We test early and ship what people actually use.',
    tier: 'Experience Design',
    tags: ['User research', 'Wireframes', 'Usability testing'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth Engine',
    tag: 'Omnichannel Growth',
    description:
      'Data-backed distribution, creative storytelling, and strategic executive positioning driving qualified reach.',
    tier: 'Growth Strategy',
    tags: ['Executive Positioning', 'Search & SEO', 'Analytics'],
  },
];

export const getServices = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: SERVICES.length,
    data: SERVICES,
  });
};

export const getServiceById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const service = SERVICES.find(s => s.id.toLowerCase() === id.toLowerCase());

  if (!service) {
    res.status(404).json({
      success: false,
      message: `Discipline '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: service,
  });
};
