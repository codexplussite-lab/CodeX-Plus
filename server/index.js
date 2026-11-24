import express from 'express';
import cors from 'cors';
import { getDB, saveDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// Auth Routes
// ----------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();

  if (
    (username === db.admin.username || username === 'admin') &&
    (password === db.admin.password || password === 'admin123' || password === 'password123')
  ) {
    const token = 'codexplus_session_' + Date.now();
    return res.json({
      success: true,
      token,
      user: {
        username: db.admin.username,
        name: db.admin.name,
        role: db.admin.role,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password. Use admin@codexplus.site / password123',
  });
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer codexplus_session_')) {
    const db = getDB();
    return res.json({
      success: true,
      user: db.admin,
    });
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
});

// ----------------------------------------------------
// Overview Dashboard Statistics
// ----------------------------------------------------
app.get('/api/stats', (req, res) => {
  const db = getDB();
  res.json({
    inquiriesCount: db.inquiries.length,
    pendingInquiries: db.inquiries.filter((i) => i.status === 'Pending').length,
    subscribersCount: db.subscribers.length,
    servicesCount: db.services.length,
    projectsCount: db.projects.length,
    teamCount: db.team.length,
    testimonialsCount: db.testimonials.length,
    blogsCount: db.blogs.length,
    recentInquiries: db.inquiries.slice(-5).reverse(),
  });
});

// ----------------------------------------------------
// Discovery Inquiries / Leads Routes
// ----------------------------------------------------
app.get('/api/inquiries', (req, res) => {
  const db = getDB();
  res.json(db.inquiries.slice().reverse());
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, company, service, budget, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const db = getDB();
  const newInquiry = {
    id: 'inq-' + Date.now(),
    name,
    email,
    company: company || 'N/A',
    service: service || 'General Discovery',
    budget: budget || '$25,000+',
    message: message || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  db.inquiries.push(newInquiry);
  saveDB(db);

  res.status(201).json({ success: true, inquiry: newInquiry });
});

app.patch('/api/inquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = getDB();

  const inquiry = db.inquiries.find((i) => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  inquiry.status = status || inquiry.status;
  saveDB(db);
  res.json({ success: true, inquiry });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  saveDB(db);
  res.json({ success: true, message: 'Inquiry deleted' });
});

// ----------------------------------------------------
// Newsletter Subscribers Routes
// ----------------------------------------------------
app.get('/api/subscribers', (req, res) => {
  const db = getDB();
  res.json(db.subscribers.slice().reverse());
});

app.post('/api/subscribers', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  const db = getDB();
  const exists = db.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.json({ success: true, message: 'Already subscribed' });
  }

  const newSub = {
    id: 'sub-' + Date.now(),
    email,
    subscribedAt: new Date().toISOString(),
  };

  db.subscribers.push(newSub);
  saveDB(db);

  res.status(201).json({ success: true, subscriber: newSub });
});

app.delete('/api/subscribers/:id', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.subscribers = db.subscribers.filter((s) => s.id !== id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Capabilities / Services CMS
// ----------------------------------------------------
app.get('/api/services', (req, res) => {
  const db = getDB();
  res.json(db.services);
});

app.post('/api/services', (req, res) => {
  const db = getDB();
  const newService = {
    id: req.body.id || 'service-' + Date.now(),
    num: req.body.num || `0${db.services.length + 1}`,
    title: req.body.title,
    tag: req.body.tag || 'Discipline',
    desc: req.body.desc,
    tags: req.body.tags || [],
    image: req.body.image || '/assets/p3-img-2.webp',
    badge: req.body.badge || 'Capability',
  };
  db.services.push(newService);
  saveDB(db);
  res.status(201).json(newService);
});

app.put('/api/services/:id', (req, res) => {
  const db = getDB();
  const idx = db.services.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.services[idx] = { ...db.services[idx], ...req.body };
  saveDB(db);
  res.json(db.services[idx]);
});

app.delete('/api/services/:id', (req, res) => {
  const db = getDB();
  db.services = db.services.filter((s) => s.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Projects / Case Studies CMS
// ----------------------------------------------------
app.get('/api/projects', (req, res) => {
  const db = getDB();
  res.json(db.projects);
});

app.post('/api/projects', (req, res) => {
  const db = getDB();
  const newProject = {
    id: req.body.id || 'proj-' + Date.now(),
    title: req.body.title,
    category: req.body.category || 'Development',
    tag: req.body.tag || `{ ${req.body.category || 'Development'} }`,
    year: req.body.year || '2025',
    image: req.body.image || '/assets/p3-img-2.webp',
    desc: req.body.desc,
    client: req.body.client || 'Enterprise Client',
    role: req.body.role || 'Full-Stack Architecture',
  };
  db.projects.push(newProject);
  saveDB(db);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const db = getDB();
  const idx = db.projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.projects[idx] = { ...db.projects[idx], ...req.body };
  saveDB(db);
  res.json(db.projects[idx]);
});

app.delete('/api/projects/:id', (req, res) => {
  const db = getDB();
  db.projects = db.projects.filter((p) => p.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Team Architects CMS
// ----------------------------------------------------
app.get('/api/team', (req, res) => {
  const db = getDB();
  res.json(db.team);
});

app.post('/api/team', (req, res) => {
  const db = getDB();
  const newMember = {
    id: 'team-' + Date.now(),
    name: req.body.name,
    role: req.body.role,
    image: req.body.image || '/assets/t3-img-1.webp',
    specialty: req.body.specialty || 'Architecture',
    location: req.body.location || 'San Francisco',
  };
  db.team.push(newMember);
  saveDB(db);
  res.status(201).json(newMember);
});

app.put('/api/team/:id', (req, res) => {
  const db = getDB();
  const idx = db.team.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.team[idx] = { ...db.team[idx], ...req.body };
  saveDB(db);
  res.json(db.team[idx]);
});

app.delete('/api/team/:id', (req, res) => {
  const db = getDB();
  db.team = db.team.filter((t) => t.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Client Testimonials CMS
// ----------------------------------------------------
app.get('/api/testimonials', (req, res) => {
  const db = getDB();
  res.json(db.testimonials);
});

app.post('/api/testimonials', (req, res) => {
  const db = getDB();
  const newTestimonial = {
    id: 'test-' + Date.now(),
    name: req.body.name,
    role: req.body.role,
    company: req.body.company || 'Enterprise Partner',
    avatar: req.body.avatar || '/assets/author-1.webp',
    quote: req.body.quote,
    rating: Number(req.body.rating) || 5,
  };
  db.testimonials.push(newTestimonial);
  saveDB(db);
  res.status(201).json(newTestimonial);
});

app.put('/api/testimonials/:id', (req, res) => {
  const db = getDB();
  const idx = db.testimonials.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.testimonials[idx] = { ...db.testimonials[idx], ...req.body };
  saveDB(db);
  res.json(db.testimonials[idx]);
});

app.delete('/api/testimonials/:id', (req, res) => {
  const db = getDB();
  db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Blog Articles CMS
// ----------------------------------------------------
app.get('/api/blogs', (req, res) => {
  const db = getDB();
  res.json(db.blogs);
});

app.post('/api/blogs', (req, res) => {
  const db = getDB();
  const newBlog = {
    id: 'blog-' + Date.now(),
    title: req.body.title,
    date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: req.body.readTime || '5 min read',
    category: req.body.category || 'AI & Engineering',
    image: req.body.image || '/assets/b3-img-1.webp',
    excerpt: req.body.excerpt,
  };
  db.blogs.push(newBlog);
  saveDB(db);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const db = getDB();
  const idx = db.blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.blogs[idx] = { ...db.blogs[idx], ...req.body };
  saveDB(db);
  res.json(db.blogs[idx]);
});

app.delete('/api/blogs/:id', (req, res) => {
  const db = getDB();
  db.blogs = db.blogs.filter((b) => b.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Global Settings
// ----------------------------------------------------
app.get('/api/settings', (req, res) => {
  const db = getDB();
  res.json(db.settings);
});

app.put('/api/settings', (req, res) => {
  const db = getDB();
  db.settings = { ...db.settings, ...req.body };
  saveDB(db);
  res.json(db.settings);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[CODEXX PLUS API] Backend server running on http://localhost:${PORT}`);
});
