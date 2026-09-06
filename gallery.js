"use strict";

const TEMPLATES = [
  { id: "code-terminal", name: "Code Terminal", role: "Software Developer", blurb: "Dark terminal-inspired full portfolio with hero portrait.", group: "dev", path: "code-terminal/" },
  { id: "web-craft", name: "Web Craft", role: "Web Developer", blurb: "Bold dark craft aesthetic for site builders.", group: "dev", path: "web-craft/" },
  { id: "front-signal", name: "Front Signal", role: "Frontend Engineer", blurb: "Expressive light UI for interface engineers.", group: "dev", path: "front-signal/" },
  { id: "api-forge", name: "API Forge", role: "Backend Engineer", blurb: "Industrial steel look for API and server work.", group: "dev", path: "api-forge/" },
  { id: "py-atelier", name: "Py Atelier", role: "Python Developer", blurb: "Calm light atelier for Python builders.", group: "dev", path: "py-atelier/" },
  { id: "mobile-pulse", name: "Mobile Pulse", role: "Mobile Developer", blurb: "App-focused layout with phone-frame hero.", group: "dev", path: "mobile-pulse/" },
  { id: "cloud-harbor", name: "Cloud Harbor", role: "DevOps / Cloud / SRE", blurb: "Navy sky theme for cloud and reliability work.", group: "ops", path: "cloud-harbor/" },
  { id: "sys-admin", name: "Sys Admin", role: "Linux / SysAdmin", blurb: "Terminal-green toolkit for system admins.", group: "ops", path: "sys-admin/" },
  { id: "net-lattice", name: "Net Lattice", role: "Network Engineer", blurb: "Blueprint topology vibe for network pros.", group: "ops", path: "net-lattice/" },
  { id: "cyber-sentinel", name: "Cyber Sentinel", role: "Cybersecurity", blurb: "Amber-on-charcoal security engineer portfolio.", group: "ops", path: "cyber-sentinel/" },
  { id: "sec-ops", name: "Sec Ops", role: "SOC Analyst", blurb: "Operations-focused SOC monitoring aesthetic.", group: "ops", path: "sec-ops/" },
  { id: "pentest-lab", name: "Pentest Lab", role: "Ethical Hacking", blurb: "Professional red-team / pentest presentation.", group: "ops", path: "pentest-lab/" },
  { id: "qa-forge", name: "QA Forge", role: "QA / Test Automation", blurb: "Amber forge theme for quality engineers.", group: "ops", path: "qa-forge/" },
  { id: "db-core", name: "DB Core", role: "Database Engineer", blurb: "Emerald steel look for DBA and data platforms.", group: "data", path: "db-core/" },
  { id: "data-prism", name: "Data Prism", role: "Data Science", blurb: "Light teal analytics portfolio.", group: "data", path: "data-prism/" },
  { id: "ml-atelier", name: "ML Atelier", role: "ML / AI Engineer", blurb: "Lime-accent dark studio for model work.", group: "data", path: "ml-atelier/" },
  { id: "iot-signal", name: "IoT Signal", role: "Embedded / IoT", blurb: "Orange-cyan signal theme for device builders.", group: "dev", path: "iot-signal/" },
  { id: "support-desk", name: "Support Desk", role: "IT Support", blurb: "Clean light helpdesk and support portfolio.", group: "ops", path: "support-desk/" },
  { id: "biz-analyst", name: "Biz Analyst", role: "Business Analyst", blurb: "Slate teal layout for analysis case work.", group: "design", path: "biz-analyst/" },
  { id: "ux-atelier", name: "UX Atelier", role: "UI / UX Designer", blurb: "Forest-lime expressive design portfolio.", group: "design", path: "ux-atelier/" },
  { id: "product-craft", name: "Product Craft", role: "Product Manager", blurb: "Indigo craft theme for technical PMs.", group: "design", path: "product-craft/" },
  { id: "resume-lite", name: "Resume Lite", role: "Universal one-pager", blurb: "Minimal resume-style page for any role.", group: "special", path: "resume-lite/" },
  { id: "rtl-studio", name: "RTL Studio", role: "Bilingual FA / EN", blurb: "RTL-first bilingual portfolio with language toggle.", group: "special", path: "rtl-studio/" },
  { id: "case-vault", name: "Case Vault", role: "Case-study heavy", blurb: "Deep problem → solution → result storytelling.", group: "special", path: "case-vault/" }
];

const grid = document.getElementById("templateGrid");
const yearEl = document.getElementById("year");
const filters = document.querySelectorAll(".filter");

function render(list) {
  if (!grid) return;

  grid.innerHTML = list.map((item) => `
    <article class="card" data-group="${item.group}">
      <div class="card-top">
        <span class="card-badge">${item.id}</span>
        <span class="card-tag">${item.group}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.blurb}</p>
      <span class="card-path">${item.role}</span>
      <a class="card-link" href="${item.path}index.html">Open template →</a>
    </article>
  `).join("");
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const key = btn.dataset.filter;
    const list = key === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.group === key);

    render(list);
  });
});

render(TEMPLATES);

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

window.addEventListener("scroll", () => {
  document.querySelector(".site-header")?.classList.toggle(
    "is-scrolled",
    window.scrollY > 12
  );
}, { passive: true });
