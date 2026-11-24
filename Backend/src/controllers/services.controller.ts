import { Request, Response } from 'express';

const SERVICES = [
  {
    id: 'development',
    title: 'Full-Stack & Autonomous AI',
    tag: 'Full-Stack & AI',
    description:
      'Bespoke engineering architectures combining high-throughput cloud infrastructure, proprietary autonomous agent pipelines, and lightning-fast web applications.',
    tier: 'Core Engineering',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design & Visual Identity',
    tag: 'Visual Identity',
    description:
      'Cinematic visual storytelling, authoritative brand guidelines, and dark-luxury design tokens engineered for global enterprise prestige.',
    tier: 'Design & Brand',
  },
  {
    id: 'video-editing',
    title: '3D Motion & WebGL Experiences',
    tag: 'Motion & Post',
    description:
      'World-class post-production, interactive 3D WebGL motion graphics, and high-impact product keynote films crafted for conversion.',
    tier: 'Spatial & Motion',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media & Growth Engine',
    tag: 'Growth Engine',
    description:
      'Omnichannel narrative orchestration, strategic executive positioning, and data-backed distribution driving measurable qualified pipeline.',
    tier: 'Growth Strategy',
  },
  {
    id: 'seo-geo',
    title: 'SEO / GEO (Generative Engine Optimization)',
    tag: 'Search & AI Discovery',
    description:
      'Next-generation search authority optimized for both traditional algorithmic rankings and generative AI engine discovery worldwide.',
    tier: 'Search & AI',
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
  const service = SERVICES.find((s) => s.id === id);
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found' });
    return;
  }
  res.status(200).json({ success: true, data: service });
};
