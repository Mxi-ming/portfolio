/* ============================================================
   渲染与交互逻辑（依赖 data.js 中的 profile / projects）
   ============================================================ */

/* ---------- 项目列表渲染 ---------- */
function createProjectElement(project, index) {
  const num = String(index + 1).padStart(2, "0");
  const article = document.createElement("article");
  article.className = `project project--${project.layout} reveal`;
  article.style.transitionDelay = `${(index % 3) * 80}ms`;

  article.innerHTML = `
    <span class="project__ghost" aria-hidden="true">${num}</span>
    <div class="project__media">
      <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async">
    </div>
    <div class="project__body">
      <div class="project__head">
        <p class="project__meta">
          <span class="project__num">${num}</span>
          <time class="project__time">${project.date}</time>
        </p>
        <h3 class="project__name">${project.name}<span class="project__tag">${project.category}</span></h3>
      </div>
      <div class="project__detail">
        <p class="project__intro">${project.intro}</p>
        <ul class="project__stack">
          ${project.stack.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>`;
  return article;
}

function renderProjects() {
  const list = document.getElementById("projectList");
  projects.forEach((project, index) => list.appendChild(createProjectElement(project, index)));

  const count = document.getElementById("projectCount");
  if (count) count.textContent = `(${String(projects.length).padStart(2, "0")})`;
}

/* ---------- 个人信息渲染 ---------- */
function renderProfile() {
  const bio = document.getElementById("aboutBio");
  if (bio) bio.innerHTML = profile.bio.map(p => `<p class="about__text">${p}</p>`).join("");

  const skillList = document.getElementById("skillList");
  if (skillList) {
    skillList.innerHTML = profile.skills.map((skill, i) => `
      <li>
        <span class="skill-num">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <p class="skill-name">${skill.name}</p>
          <p class="skill-detail">${skill.detail}</p>
        </div>
      </li>`).join("");
  }

  const email = document.getElementById("contactEmail");
  if (email) {
    email.textContent = profile.email;
    email.href = `mailto:${profile.email}`;
  }

  const links = document.getElementById("contactLinks");
  if (links) {
    links.innerHTML = profile.links.map(link => link.url
      ? `<li><a href="${link.url}" target="_blank" rel="noopener">${link.label} ↗</a></li>`
      : `<li><span>${link.label}</span></li>`).join("");
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- 深浅色主题切换 ---------- */
const THEME_KEY = "xm-portfolio-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
  }
}

function setupTheme() {
  // 优先读取用户上次的选择，否则跟随系统偏好
  let theme = null;
  try { theme = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式下可能不可用 */ }
  if (theme !== "dark" && theme !== "light") {
    theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark" : "light";
  }
  applyTheme(theme);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* 同上 */ }
  });
}

// 主题需在页面绘制前立刻生效以避免闪烁，故不在 DOMContentLoaded 内调用
setupTheme();

/* ---------- 顶栏：滚动状态 + 移动端菜单 + 区块高亮 ---------- */
function setupHeader() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".site-nav__link").forEach(link => {
    link.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  const navLinks = document.querySelectorAll(".site-nav__link");
  const sections = ["works", "about", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }
}

/* ---------- 进场显现 ---------- */
function setupReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderProfile();
  setupHeader();
  setupReveal();
});
