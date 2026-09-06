# Developer Portfolio Templates

A collection of **30 ready-to-use**, self-contained portfolio templates for developers and adjacent tech roles.

Each template is a standalone static site: `index.html` + `style.css` + `script.js` + `assets/`.

Open the root [`index.html`](./index.html) for a browsable catalog.

---

## Quick start

1. Pick a template folder (or browse the [gallery](./index.html)).
2. Replace `assets/avatar.jpg` with your portrait.
3. Edit placeholders in `index.html` (name, role, projects, links, email).
4. Deploy the folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages…).

### Avatar guidelines

| Spec | Recommendation |
|------|----------------|
| File | `assets/avatar.jpg` (JPG or WebP also fine if you update the `src`) |
| Aspect | **3:4** portrait |
| Size | about **800×1000** px |
| Framing | face centered, soft/plain background |
| Fallback | If the image is missing, brand initials show automatically |

A sample portrait is included in each template’s `assets/avatar.jpg` (copied from [`assets/avatar-sample.jpg`](./assets/avatar-sample.jpg)) so previews look complete out of the box. Replace it with your own photo before publishing.

---

## Template catalog

### Development

| Folder | Role |
|--------|------|
| [`code-terminal`](./code-terminal/) | Software Developer |
| [`web-craft`](./web-craft/) | Web Developer |
| [`front-signal`](./front-signal/) | Frontend Engineer |
| [`api-forge`](./api-forge/) | Backend Engineer |
| [`py-atelier`](./py-atelier/) | Python Developer |
| [`mobile-pulse`](./mobile-pulse/) | Mobile Developer |
| [`iot-signal`](./iot-signal/) | Embedded / IoT |

### Ops & Security

| Folder | Role |
|--------|------|
| [`cloud-harbor`](./cloud-harbor/) | DevOps / Cloud / SRE |
| [`sys-admin`](./sys-admin/) | Linux / System Admin |
| [`net-lattice`](./net-lattice/) | Network Engineer |
| [`cyber-sentinel`](./cyber-sentinel/) | Cybersecurity |
| [`sec-ops`](./sec-ops/) | SOC Analyst |
| [`pentest-lab`](./pentest-lab/) | Ethical Hacking / Pentest |
| [`qa-forge`](./qa-forge/) | QA / Test Automation |
| [`support-desk`](./support-desk/) | IT Support / Helpdesk |

### Data & AI

| Folder | Role |
|--------|------|
| [`db-core`](./db-core/) | Database Engineer |
| [`data-prism`](./data-prism/) | Data Science / Analytics |
| [`ml-atelier`](./ml-atelier/) | Machine Learning / AI |

### Design & Product

| Folder | Role |
|--------|------|
| [`ux-atelier`](./ux-atelier/) | UI / UX Designer |
| [`product-craft`](./product-craft/) | Technical Product Manager |
| [`biz-analyst`](./biz-analyst/) | Business / Systems Analyst |

### Special layouts

| Folder | Role |
|--------|------|
| [`resume-lite`](./resume-lite/) | Minimal one-page resume |
| [`rtl-studio`](./rtl-studio/) | Bilingual FA / EN with RTL |
| [`case-vault`](./case-vault/) | Case-study heavy storytelling |

### Style variants

Same roles as the originals, with a different visual system:

| Folder | Based on | Look |
|--------|----------|------|
| [`code-terminal-aurora`](./code-terminal-aurora/) | `code-terminal` | Light sky / mint aurora |
| [`front-signal-noir`](./front-signal-noir/) | `front-signal` | Cinema noir + crimson |
| [`api-forge-sand`](./api-forge-sand/) | `api-forge` | Warm sandstone backend |
| [`cyber-sentinel-ice`](./cyber-sentinel-ice/) | `cyber-sentinel` | Ice-blue security glass |
| [`py-atelier-night`](./py-atelier-night/) | `py-atelier` | Dark night-ink Python |
| [`net-lattice-light`](./net-lattice-light/) | `net-lattice` | Light blueprint paper |

---

## Customize checklist

Use this when adapting a template for yourself:

- [ ] `assets/avatar.jpg` — your photo
- [ ] Name, title, location, availability
- [ ] About copy (2 short paragraphs max)
- [ ] Skills / stack list
- [ ] 3 featured projects with real links
- [ ] Experience timeline
- [ ] Email + social links
- [ ] Page `<title>` and meta description
- [ ] Remove unused sections if they do not fit your story

**Tip:** Keep the first viewport simple — brand, one headline, one sentence, CTAs, and your photo.

---

## Structure

```text
developer-portfolio/
├── index.html          # Catalog gallery
├── gallery.css
├── gallery.js
├── README.md
├── LICENSE
└── <template-name>/
    ├── index.html
    ├── style.css
    ├── script.js
    └── assets/
        ├── avatar.jpg
        └── README.md
```

---

## Tech notes

- Vanilla **HTML / CSS / JS** only (no build step)
- Responsive layouts with mobile navigation
- Contact forms validate client-side (wire to Formspree, Netlify Forms, or your API as needed)
- Respects `prefers-reduced-motion` where implemented

---

## License

See [`LICENSE`](./LICENSE) in the repository root.
