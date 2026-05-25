import http from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imageDir = path.join(root, 'client', 'public', 'images');
const port = Number(process.env.PORT || 4173);

const json = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(body));
};

const projects = [
  {
    title: 'Monolithic Ash Residence',
    description: 'Continuous floors, fireplace massing, and lime-washed microconcrete walls.',
    category: 'residential'
  },
  {
    title: 'Charcoal Retail Gallery',
    description: 'High-traffic matte surfaces and sculptural display furniture.',
    category: 'commercial'
  },
  {
    title: 'Muted Brass Counter',
    description: 'Custom counter and tables with reinforced thin-profile casting.',
    category: 'furniture'
  },
  {
    title: 'Textured Feature Wall',
    description: 'Vertical microconcrete wall surface with subtle mineral movement and warm brass reveals.',
    category: 'wall'
  },
  {
    title: 'Continuous Ceiling Plane',
    description: 'Soft ash microconcrete ceiling treatment for a monolithic architectural envelope.',
    category: 'ceiling'
  },
  {
    title: 'Open-Air Terrace Lounge',
    description: 'Weather-aware terrace surfaces with durable sealed microconcrete and warm exterior tones.',
    category: 'terrace'
  },
  {
    title: 'Private Bar Counter',
    description: 'Charcoal microconcrete bar counter with tactile matte finish and muted brass edge detail.',
    category: 'bar'
  }
];

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Atelier Microcrete | Local Preview</title>
  <style>
    :root { color-scheme: light; scroll-behavior: smooth; --charcoal:#171717; --ink:#111214; --concrete:#d5ccbd; --brass:#b08a54; --sienna:#a65f36; --ash:#c8c4bd; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:var(--concrete); color:var(--ink); }
    a { color:inherit; text-decoration:none; }
    img { display:block; max-width:100%; }
    header { position:fixed; z-index:20; inset:0 0 auto; background:rgba(23,23,23,.72); color:white; border-bottom:1px solid rgba(255,255,255,.1); backdrop-filter:blur(18px); }
    nav { max-width:1200px; margin:auto; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
    nav strong { text-transform:uppercase; letter-spacing:.28em; font-size:13px; }
    nav div { display:flex; gap:24px; color:rgba(255,255,255,.72); font-size:14px; }
    .hero { min-height:94vh; position:relative; display:flex; align-items:end; overflow:hidden; background:#171717; color:white; }
    .hero img { position:absolute; inset:0; width:100%; height:112%; object-fit:cover; animation:float 12s ease-in-out infinite alternate; }
    .hero:after { content:""; position:absolute; inset:0; background:linear-gradient(to top, #171717 0%, rgba(23,23,23,.68) 48%, rgba(23,23,23,.12)); }
    .hero-content { position:relative; z-index:1; max-width:1200px; margin:0 auto; padding:160px 24px 92px; width:100%; }
    .eyebrow { color:var(--sienna); text-transform:uppercase; letter-spacing:.26em; font-weight:800; font-size:12px; margin:0 0 14px; }
    .hero .eyebrow { color:var(--brass); }
    h1 { font-size:clamp(48px, 9vw, 108px); line-height:.96; letter-spacing:0; margin:0; max-width:980px; }
    h2 { font-size:clamp(36px, 6vw, 76px); line-height:1; margin:0; max-width:920px; }
    h3 { font-size:26px; margin:0; }
    p { line-height:1.75; }
    .hero-row { margin-top:30px; display:flex; gap:28px; align-items:center; max-width:760px; flex-wrap:wrap; }
    .button { display:inline-flex; align-items:center; justify-content:center; min-height:52px; border-radius:999px; padding:14px 20px; border:0; background:var(--brass); color:#111214; font-weight:900; cursor:pointer; transition:.18s ease; }
    .button:hover { transform:translateY(-2px); background:#c19a62; }
    section { padding:96px 24px; }
    .wrap { max-width:1200px; margin:0 auto; }
    .split { display:grid; grid-template-columns:1fr .9fr; gap:48px; align-items:center; }
    .about-list article { border-top:1px solid rgba(23,23,23,.15); padding:24px 0; color:rgba(23,23,23,.76); font-size:20px; }
    .media { min-height:420px; width:100%; object-fit:cover; border-radius:8px; box-shadow:0 24px 70px rgba(17,18,20,.22); }
    .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:42px; }
    .card { min-height:310px; border:1px solid rgba(23,23,23,.14); border-radius:8px; padding:30px; background:rgba(255,255,255,.27); transition:.18s ease; }
    .card:hover { transform:translateY(-4px); border-color:rgba(176,138,84,.72); box-shadow:0 20px 55px rgba(17,18,20,.16); }
    .icon { width:48px; height:48px; border-radius:999px; display:grid; place-items:center; background:#171717; color:var(--brass); margin-bottom:30px; }
    .card li { margin:12px 0; color:rgba(23,23,23,.68); }
    .filters { display:flex; flex-wrap:wrap; gap:12px; margin:36px 0 22px; }
    .filter { border:1px solid rgba(23,23,23,.18); border-radius:999px; background:transparent; padding:11px 16px; cursor:pointer; }
    .filter.active { background:#171717; color:#f7f1e7; }
    .gallery { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:250px; grid-auto-flow:dense; gap:16px; }
    .tile { position:relative; overflow:hidden; border:0; border-radius:8px; padding:0; cursor:pointer; background:#171717; text-align:left; }
    .tile.tall { grid-row:span 2; }
    .tile img { width:100%; height:100%; object-fit:cover; transition:.5s ease; }
    .tile:hover img { transform:scale(1.04); opacity:.82; }
    .caption { position:absolute; inset:auto 0 0; color:white; padding:72px 16px 16px; background:linear-gradient(transparent, rgba(17,18,20,.9)); display:block; }
    .caption small { display:block; color:rgba(255,255,255,.66); margin-top:4px; }
    .contact { background:#171717; color:white; }
    .contact-grid { display:grid; grid-template-columns:.78fr 1fr; gap:48px; align-items:center; }
    form { border:1px solid rgba(255,255,255,.18); border-radius:8px; background:rgba(255,255,255,.08); padding:clamp(20px, 4vw, 34px); display:grid; gap:18px; box-shadow:0 24px 80px rgba(0,0,0,.32); backdrop-filter:blur(18px); }
    .fields { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    label { display:grid; gap:7px; color:rgba(255,255,255,.84); font-weight:800; font-size:14px; }
    input, select, textarea { min-height:50px; border:1px solid rgba(255,255,255,.2); border-radius:6px; background:rgba(17,18,20,.38); color:white; padding:12px; font:inherit; }
    textarea { resize:vertical; }
    .message { display:none; border:1px solid rgba(176,138,84,.45); background:rgba(176,138,84,.15); border-radius:8px; padding:14px; }
    footer { background:#171717; color:white; padding:40px 24px; }
    footer .wrap { border-top:1px solid rgba(255,255,255,.1); padding-top:28px; display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; }
    .lightbox { position:fixed; z-index:80; inset:0; display:none; place-items:center; background:rgba(17,18,20,.88); padding:18px; }
    .lightbox.open { display:grid; }
    .lightbox-inner { max-width:1000px; width:100%; background:#171717; border-radius:8px; padding:16px; color:white; }
    .lightbox img { max-height:76vh; width:100%; object-fit:contain; border-radius:8px; }
    .close { float:right; border:1px solid rgba(255,255,255,.2); border-radius:999px; color:white; background:transparent; padding:9px 12px; cursor:pointer; }
    @keyframes float { from { transform:translateY(0) scale(1); } to { transform:translateY(-36px) scale(1.02); } }
    @media (prefers-reduced-motion: reduce) { :root { scroll-behavior:auto; } *,*:before,*:after { animation:none !important; transition:none !important; } }
    @media (max-width: 820px) { nav div { display:none; } .split,.cards,.contact-grid,.fields,.gallery { grid-template-columns:1fr; } .gallery { grid-auto-rows:270px; } .tile.tall { grid-row:auto; } section { padding:72px 20px; } }
  </style>
</head>
<body>
  <header><nav><strong>Atelier Microcrete</strong><div><a href="#about">Material</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#contact">Consultation</a></div></nav></header>
  <main>
    <section class="hero" id="hero">
      <img src="/images/hero-concrete.webp" alt="Luxury microconcrete interior with warm side light and textured monolithic walls">
      <div class="hero-content"><p class="eyebrow">Architectural microconcrete interiors</p><h1>Monolithic surfaces shaped with quiet precision.</h1><div class="hero-row"><p>Bespoke floors, walls, bathrooms, counters, and furniture finished by hand for luxury residential and commercial spaces.</p><a class="button" href="#contact">Book Consultation</a></div></div>
    </section>
    <section id="about"><div class="wrap split"><div><p class="eyebrow">Material science</p><h2>Microconcrete with the restraint of stone and the adaptability of craft.</h2><div class="about-list"><article>A thin mineral coating that bonds to existing substrates for seamless architectural surfaces.</article><article>High abrasion resistance, waterproof sealing options, and low-profile application for renovations.</article><article>Lower demolition waste, long life cycles, and refined tactile depth across floors, walls, and joinery.</article></div></div><img class="media" src="/images/material-process.webp" alt="Close view of hand-troweled microconcrete texture in warm grey"></div></section>
    <section id="services"><div class="wrap"><p class="eyebrow">Applications</p><h2>Systems for surfaces that need to work hard and look resolved.</h2><div class="cards"><article class="card"><div class="icon">H</div><h3>Residential</h3><ul><li>Floors</li><li>Bathrooms</li><li>Kitchens</li><li>Walls</li></ul></article><article class="card"><div class="icon">B</div><h3>Commercial</h3><ul><li>Retail spaces</li><li>Offices</li><li>Hospitality interiors</li></ul></article><article class="card"><div class="icon">S</div><h3>Custom Furniture</h3><ul><li>Tables</li><li>Countertops</li><li>Decorative installations</li></ul></article></div></div></section>
    <section id="gallery"><div class="wrap"><p class="eyebrow">Portfolio</p><h2>Texture-rich spaces, filtered by surface, room, and use.</h2><div class="filters"><button class="filter active" data-filter="All">All</button><button class="filter" data-filter="Residential">Residential</button><button class="filter" data-filter="Commercial">Commercial</button><button class="filter" data-filter="Furniture">Furniture</button><button class="filter" data-filter="Wall">Wall</button><button class="filter" data-filter="Ceiling">Ceiling</button><button class="filter" data-filter="Terrace">Terrace</button><button class="filter" data-filter="Bar">Bar</button></div><div class="gallery" id="galleryGrid"></div></div></section>
    <section class="contact" id="contact"><div class="wrap contact-grid"><div><p class="eyebrow">Lead studio review</p><h2>Bring a surface brief worth slowing down for.</h2><p>Each inquiry is scored by budget, urgency, and scope so the studio can prioritize high-fit residential, commercial, and furniture commissions.</p></div><form id="leadForm"><p class="eyebrow">Private consultation</p><h3>Start with scope, timing, and surface ambition.</h3><div class="fields"><label>Name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Phone Number<input name="phone" required placeholder="+14155550123"></label><label>Project Scope<select name="projectScope" required><option value="">Select</option><option>Residential</option><option>Commercial</option><option>Furniture</option></select></label><label>Timeline<select name="timeline" required><option value="">Select</option><option>Immediately</option><option>0-3 months</option><option>3-6 months</option><option>6+ months</option></select></label><label>Budget Range<select name="budgetRange" required><option value="">Select</option><option>$10k-$25k</option><option>$25k-$50k</option><option>$50k-$100k</option><option>$100k+</option></select></label></div><label>Notes<textarea name="message" rows="4" placeholder="Rooms, surfaces, site constraints, preferred finish..."></textarea></label><p class="message" id="formMessage">Consultation request received. Local preview score calculated.</p><button class="button" type="submit">Submit Request</button></form></div></section>
  </main>
  <footer><div class="wrap"><strong>Atelier Microcrete</strong><span>Luxury microconcrete surfaces for residences, hospitality, retail, offices, and collectible furniture.</span></div></footer>
  <div class="lightbox" id="lightbox"><div class="lightbox-inner"><button class="close" aria-label="Close image">Close</button><img alt=""><h3></h3><p></p></div></div>
  <script>
    const items = [
      ["Monolithic Ash Residence","Residential","https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=82","Continuous floors, fireplace massing, and lime-washed microconcrete walls."],
      ["Charcoal Retail Gallery","Commercial","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82","High-traffic matte surfaces and sculptural display furniture."],
      ["Raw Sienna Kitchen","Residential","https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=82","Seamless island, backsplash, and pantry cladding with satin sealer."],
      ["Muted Brass Counter","Furniture","https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1600&q=82","Custom counter and tables with reinforced thin-profile casting."],
      ["Hospitality Bath Suite","Commercial","https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=82","Waterproof shower envelope, vanity, and floor system."],
      ["Floating Concrete Table","Furniture","https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1600&q=82","Lightweight core table with hand-troweled microcement finish."],
      ["Textured Feature Wall","Wall","https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=82","Vertical microconcrete wall surface with subtle mineral movement and warm brass reveals."],
      ["Continuous Ceiling Plane","Ceiling","https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=82","Soft ash microconcrete ceiling treatment designed for a monolithic architectural envelope."],
      ["Open-Air Terrace Lounge","Terrace","https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=82","Weather-aware terrace surfaces with durable sealed microconcrete and warm exterior tones."],
      ["Private Bar Counter","Bar","https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=82","Charcoal microconcrete bar counter with tactile matte finish and muted brass edge detail."]
    ];
    const grid = document.getElementById("galleryGrid");
    const lightbox = document.getElementById("lightbox");
    function render(filter = "All") {
      grid.innerHTML = "";
      items.filter(item => filter === "All" || item[1] === filter).forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "tile" + (index % 3 === 0 ? " tall" : "");
        button.innerHTML = '<img src="' + item[2] + '" alt="' + item[0] + '"><span class="caption"><strong>' + item[0] + '</strong><small>' + item[1] + '</small></span>';
        button.onclick = () => {
          lightbox.classList.add("open");
          lightbox.querySelector("img").src = item[2];
          lightbox.querySelector("img").alt = item[0];
          lightbox.querySelector("h3").textContent = item[0];
          lightbox.querySelector("p").textContent = item[3];
        };
        grid.appendChild(button);
      });
    }
    render();
    document.querySelectorAll(".filter").forEach(button => button.onclick = () => {
      document.querySelectorAll(".filter").forEach(active => active.classList.remove("active"));
      button.classList.add("active");
      render(button.dataset.filter);
    });
    lightbox.onclick = event => { if (event.target === lightbox || event.target.className === "close") lightbox.classList.remove("open"); };
    document.getElementById("leadForm").onsubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const body = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/leads", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(body) });
      const result = await response.json();
      document.getElementById("formMessage").textContent = result.message + " Lead score: " + result.data.leadScore + ".";
      document.getElementById("formMessage").style.display = "block";
      form.reset();
    };
  </script>
</body>
</html>`;

const scoreLead = (lead) => {
  const budget = { '$10k-$25k': 12, '$25k-$50k': 24, '$50k-$100k': 36, '$100k+': 48 }[lead.budgetRange] || 0;
  const timeline = { Immediately: 26, '0-3 months': 22, '3-6 months': 14, '6+ months': 8 }[lead.timeline] || 0;
  const category = { Residential: 14, Commercial: 24, Furniture: 10 }[lead.projectScope] || 0;
  return Math.min(100, 10 + budget + timeline + category);
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (req.method === 'GET' && url.pathname === '/api/projects') {
    const accept = req.headers.accept || '';
    if (accept.includes('text/html') && !accept.includes('application/json')) {
      res.writeHead(302, { Location: '/' });
      return res.end();
    }

    const category = url.searchParams.get('category');
    return json(res, 200, {
      success: true,
      message: 'Projects retrieved successfully',
      data: projects.filter((project) => !category || project.category === category)
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/leads') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 20_000) req.destroy();
    });
    req.on('end', () => {
      const lead = JSON.parse(body || '{}');
      return json(res, 201, {
        success: true,
        message: 'Lead submitted successfully',
        data: { leadScore: scoreLead(lead), submittedAt: new Date().toISOString() }
      });
    });
    return;
  }

  if (req.method === 'GET' && url.pathname.startsWith('/images/')) {
    const requested = path.normalize(url.pathname.replace('/images/', ''));
    const filePath = path.join(imageDir, requested);
    if (!filePath.startsWith(imageDir) || !existsSync(filePath)) {
      return json(res, 404, { success: false, errors: [{ field: 'image', message: 'Image not found' }] });
    }
    res.writeHead(200, { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=3600' });
    return createReadStream(filePath).pipe(res);
  }

  if (req.method === 'GET' && url.pathname === '/README.md') {
    const readme = await readFile(path.join(root, 'README.md'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/markdown; charset=utf-8' });
    return res.end(readme);
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page);
});

server.listen(port, () => {
  console.log(`Microconcrete preview running at http://localhost:${port}`);
});
